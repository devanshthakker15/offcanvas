// src/components/Form.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import { basicSchema } from '../schema/basicSchema';
import { FormData } from '../types/formData';

interface FormProps {
  onFormSubmit: (newData: FormData) => void;
  editData?: FormData; 
  onClose: () => void; 
}

const CustomForm: React.FC<FormProps> = ({ onFormSubmit, editData, onClose }) => {
  return (
    <Formik
      initialValues={{
        categoryName: editData?.categoryName || '',
        categoryCode: editData?.categoryCode || '',
        categoryDescription: editData?.categoryDescription || '',
        price: editData?.price || '',
      }}
      enableReinitialize={true}
      validationSchema={basicSchema}
      onSubmit={(values) => {
        onFormSubmit(values);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Field name="categoryName" placeholder="Almonds Category Name" className="form-control" />
            <ErrorMessage name="categoryName" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <Field name="categoryCode" placeholder="Category Code" className="form-control" />
            <ErrorMessage name="categoryCode" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <Field name="categoryDescription" placeholder="Category Description" className="form-control" />
            <ErrorMessage name="categoryDescription" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <Field name="price" placeholder="Price" className="form-control" />
            <ErrorMessage name="price" component="div" className="text-danger" />
          </div>

          <Button type="submit" className="me-2">
            {editData ? 'Update' : 'Submit'}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CustomForm;
