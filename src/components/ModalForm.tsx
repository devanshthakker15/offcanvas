import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomForm from './CustomForm';
import { FormData } from '../types/formData';

interface ModalFormProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  onFormSubmit: (newData: FormData) => void;
  editData?: FormData;
  onClose: () => void; 
}

const ModalForm: React.FC<ModalFormProps> = ({ show, handleClose, title, onFormSubmit, editData, onClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomForm onFormSubmit={onFormSubmit} editData={editData} onClose={onClose} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
