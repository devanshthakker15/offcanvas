import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ModalForm from './components/ModalForm'
import OffcanvasForm from './components/OffcanvasForm'; 
import FormDetailsCard from './components/FormDetailsCard'; 

const App: React.FC = () => {
  const [modalFormData, setModalFormData] = useState<any[]>([]);
  const [offcanvasFormData, setOffcanvasFormData] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedModalData = localStorage.getItem("modalFormData");
    const storedOffcanvasData = localStorage.getItem("offcanvasFormData");

    // Parse the stored data and update state
    if (storedModalData) {
      setModalFormData(JSON.parse(storedModalData));
    }

    if (storedOffcanvasData) {
      setOffcanvasFormData(JSON.parse(storedOffcanvasData));
    }
  }, []);

  // Delete functionality
  const handleModalDelete = (index: number) => {
    const updatedData = modalFormData.filter((_, i) => i !== index);
    setModalFormData(updatedData);
    localStorage.setItem("modalFormData", JSON.stringify(updatedData)); // Update local storage
  };

  const handleOffcanvasDelete = (index: number) => {
    const updatedData = offcanvasFormData.filter((_, i) => i !== index);
    setOffcanvasFormData(updatedData);
    localStorage.setItem("offcanvasFormData", JSON.stringify(updatedData)); // Update local storage
  };

  // Edit functionality
  const handleModalEdit = (index: number) => {
    setEditIndex(index); // Set the index of the item being edited
    setShowModal(true); 
  };

  const handleOffcanvasEdit = (index: number) => {
    setEditIndex(index); // Set the index of the item being edited
    setShowOffcanvas(true); 
  };

  // Handle form submission for Modal
  const handleModalFormSubmit = (newData: any) => {
    let updatedData = [...modalFormData];
    if (editIndex !== null) {
      updatedData[editIndex] = newData; // Update the existing entry
      setEditIndex(null); // Reset edit state
    } else {
      updatedData.push(newData); // Add a new entry
    }
    setModalFormData(updatedData);
    localStorage.setItem("modalFormData", JSON.stringify(updatedData)); // Update local storage
    setShowModal(false); // Close modal after submission
  };

  // Handle form submission for Offcanvas
  const handleOffcanvasFormSubmit = (newData: any) => {
    let updatedData = [...offcanvasFormData];
    if (editIndex !== null) {
      updatedData[editIndex] = newData; // Update the existing entry
      setEditIndex(null); // Reset edit state
    } else {
      updatedData.push(newData); // Add a new entry
    }
    setOffcanvasFormData(updatedData);
    localStorage.setItem("offcanvasFormData", JSON.stringify(updatedData)); // Update local storage
    setShowOffcanvas(false); // Close offcanvas after submission
  };

  return (
    <div className="container">
      <div className="mt-3 mb-3 d-flex justify-content-around">
        {/* Button to open the offcanvas form */}
        <Button variant="primary" onClick={() => {
          setEditIndex(null); // Reset editIndex for new entry
          setShowOffcanvas(true);
        }}>
          Add New Entry (Offcanvas)
        </Button>

        {/* Button to open the modal form */}
        <Button variant="primary" onClick={() => {
          setEditIndex(null); // Reset editIndex for new entry
          setShowModal(true);
        }}>
          Add New Entry (Modal)
        </Button>
      </div>

      {/* Display Form Details Card for both modal and offcanvas data */}
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

      {/* Render Modal and Offcanvas forms */}
      {showModal && (
        <ModalForm
          onFormSubmit={handleModalFormSubmit}
          editData={editIndex !== null ? modalFormData[editIndex] : null}
          onClose={() => setShowModal(false)}
        />
      )}

      {showOffcanvas && (
        <OffcanvasForm
          onFormSubmit={handleOffcanvasFormSubmit}
          editData={editIndex !== null ? offcanvasFormData[editIndex] : null}
          onClose={() => setShowOffcanvas(false)}
        />
      )}
    </div>
  );
};

export default App;
