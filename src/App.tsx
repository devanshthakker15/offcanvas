import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ModalForm from './components/ModalForm';
import OffcanvasForm from './components/OffcanvasForm';
import FormDetailsCard from './components/FormDetailsCard';
import { FormData } from './types/formData'; 

const App: React.FC = () => {
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

  
  const handleModalDelete = (index: number) => {
    const updatedData = modalFormData.filter((_, i) => i !== index);
    setModalFormData(updatedData);
    localStorage.setItem("modalFormData", JSON.stringify(updatedData));
  };

  const handleOffcanvasDelete = (index: number) => {
    const updatedData = offcanvasFormData.filter((_, i) => i !== index);
    setOffcanvasFormData(updatedData);
    localStorage.setItem("offcanvasFormData", JSON.stringify(updatedData));
  };

  
  const handleModalEdit = (index: number) => {
    setEditIndex(index);
    setShowModal(true);
  };

  const handleOffcanvasEdit = (index: number) => {
    setEditIndex(index);
    setShowOffcanvas(true);
  };

 
  const handleModalFormSubmit = (newData: FormData) => {
    let updatedData = [...modalFormData];
    if (editIndex !== null) {
      updatedData[editIndex] = newData;
      setEditIndex(null);
    } else {
      updatedData.push(newData);
    }
    setModalFormData(updatedData);
    localStorage.setItem("modalFormData", JSON.stringify(updatedData));
    setShowModal(false);
  };

  
  const handleOffcanvasFormSubmit = (newData: FormData) => {
    let updatedData = [...offcanvasFormData];
    if (editIndex !== null) {
      updatedData[editIndex] = newData;
      setEditIndex(null);
    } else {
      updatedData.push(newData);
    }
    setOffcanvasFormData(updatedData);
    localStorage.setItem("offcanvasFormData", JSON.stringify(updatedData));
    setShowOffcanvas(false);
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
        handleDelete={handleModalDelete}
        handleEdit={handleModalEdit}
      />

      <FormDetailsCard
        title="Offcanvas Form Data"
        formData={offcanvasFormData}
        handleDelete={handleOffcanvasDelete}
        handleEdit={handleOffcanvasEdit}
      />

{showModal && (
  <ModalForm
  title='ModalForm'
    show={showModal} 
    onFormSubmit={handleModalFormSubmit}
    editData={editIndex !== null ? modalFormData[editIndex] : null}
    onClose={() => setShowModal(false)} 
    handleClose={() => setShowModal(false)} 
  />
)}

{showOffcanvas && (
  <OffcanvasForm
  title='OffcanvasForm'
    show={showOffcanvas} 
    onFormSubmit={handleOffcanvasFormSubmit}
    editData={editIndex !== null ? offcanvasFormData[editIndex] : null}
    onClose={() => setShowOffcanvas(false)} 
    handleClose={() => setShowOffcanvas(false)} 
  />
)}

    </div>
  );
};

export default App;
