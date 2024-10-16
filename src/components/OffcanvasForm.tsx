import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import CustomForm from './CustomForm';
import { FormData } from '../types/formData';

interface OffcanvasFormProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  onFormSubmit: (newData: FormData) => void;
  editData?: FormData;
  onClose: () => void; 
}

const OffcanvasForm: React.FC<OffcanvasFormProps> = ({ show, handleClose, title, onFormSubmit, editData, onClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <CustomForm onFormSubmit={onFormSubmit} editData={editData} onClose={onClose} />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasForm;
