import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ModalForm from '../components/ModalForm';
import OffcanvasForm from '../components/OffcanvasForm';
import FormDetailsCard from '../components/FormDetailsCard';
import { FormData } from '../types/formData';

const FormPage: React.FC = () => {
  const [modalFormData, setModalFormData] = useState<FormData[]>([]);
  const [offcanvasFormData, setOffcanvasFormData] = useState<FormData[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedModalData = localStorage.getItem("modalFormData");
    const storedOffcanvasData = localStorage.getItem("offcanvasFormData");

    if (storedModalData) {
      setModalFormData(JSON.parse(storedModalData));
    }

    if (storedOffcanvasData) {
      setOffcanvasFormData(JSON.parse(storedOffcanvasData));
    }
  }, []);

  const handleDelete = (formType: 'modal' | 'offcanvas', index: number) => {
    if (formType === 'modal') {
      const updatedData = modalFormData.filter((_, i) => i !== index);
      setModalFormData(updatedData);
      localStorage.setItem("modalFormData", JSON.stringify(updatedData));
    } else if (formType === 'offcanvas') {
      const updatedData = offcanvasFormData.filter((_, i) => i !== index);
      setOffcanvasFormData(updatedData);
      localStorage.setItem("offcanvasFormData", JSON.stringify(updatedData));
    }
  };

  const handleEdit = (formType: 'modal' | 'offcanvas', index: number) => {
    setEditIndex(index);
    if (formType === 'modal') {
      setShowModal(true);
    } else if (formType === 'offcanvas') {
      setShowOffcanvas(true);
    }
  };

  const handleFormSubmit = (formType: 'modal' | 'offcanvas', newData: FormData) => {
    let updatedData = formType === 'modal' ? [...modalFormData] : [...offcanvasFormData];
    
    if (editIndex !== null) {
      updatedData[editIndex] = newData;
      setEditIndex(null);
    } else {
      updatedData.push(newData);
    }

    if (formType === 'modal') {
      setModalFormData(updatedData);
      localStorage.setItem("modalFormData", JSON.stringify(updatedData));
      setShowModal(false);
    } else {
      setOffcanvasFormData(updatedData);
      localStorage.setItem("offcanvasFormData", JSON.stringify(updatedData));
      setShowOffcanvas(false);
    }
  };

  return (
    <div className="container">
      <div className="mt-3 mb-3 d-flex justify-content-around">
        <Button variant="primary" onClick={() => {
          setEditIndex(null);
          setShowOffcanvas(true);
        }}>
          Add New Entry (Offcanvas)
        </Button>
        <Button variant="primary" onClick={() => {
          setEditIndex(null);
          setShowModal(true);
        }}>
          Add New Entry (Modal)
        </Button>
      </div>

      <FormDetailsCard
        title="Modal Form Data"
        formData={modalFormData}
        handleDelete={(index) => handleDelete('modal', index)}
        handleEdit={(index) => handleEdit('modal', index)}
      />

      <FormDetailsCard
        title="Offcanvas Form Data"
        formData={offcanvasFormData}
        handleDelete={(index) => handleDelete('offcanvas', index)}
        handleEdit={(index) => handleEdit('offcanvas', index)}
      />

      {showModal && (
        <ModalForm
          title='ModalForm'
          show={showModal}
          onFormSubmit={(newData) => handleFormSubmit('modal', newData)}
          editData={editIndex !== null ? modalFormData[editIndex] : null}
          onClose={() => setShowModal(false)} 
          handleClose={() => setShowModal(false)}
        />
      )}

      {showOffcanvas && (
        <OffcanvasForm
          title='OffcanvasForm'
          show={showOffcanvas}
          onFormSubmit={(newData) => handleFormSubmit('offcanvas', newData)}
          editData={editIndex !== null ? offcanvasFormData[editIndex] : null}
          onClose={() => setShowOffcanvas(false)} 
          handleClose={() => setShowOffcanvas}
        />
      )}
    </div>
  );
};

export default FormPage; 
