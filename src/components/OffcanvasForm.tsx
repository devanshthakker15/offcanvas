import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Offcanvas, Button } from 'react-bootstrap'; // Bootstrap Offcanvas
import { basicSchema } from "../schema/basicSchema";

interface OffcanvasFormProps {
  onFormSubmit: (newData: any) => void;
  editData: any;
  onClose: () => void; // Function to close the offcanvas
}

const OffcanvasForm: React.FC<OffcanvasFormProps> = ({ onFormSubmit, editData, onClose }) => {
  return (
    <Offcanvas show onHide={onClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{editData ? 'Edit Entry' : 'Add New Entry'}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
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
                <Field name="categoryName" placeholder="Cashew Category Name" className="form-control" />
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
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasForm;
