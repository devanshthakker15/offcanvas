import React, { useState } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import Pagination from './Pagination'; // Import the Pagination component
import "../App.css";


interface FormDetailsCardProps {
 title: string;
 formData: any[];
 handleDelete: (index: number) => void;
 handleEdit: (index: number) => void;
}


const ITEMS_PER_PAGE = 2;


const FormDetailsCard: React.FC<FormDetailsCardProps> = ({ title, formData, handleDelete, handleEdit }) => {
 const [currentPage, setCurrentPage] = useState(1);


 const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
 const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
 const currentItems = formData.slice(indexOfFirstItem, indexOfLastItem);


 const totalPages = Math.ceil(formData.length / ITEMS_PER_PAGE);


 return (
   <Card className="mb-3">
     <Card.Header>{title}</Card.Header>
     <Card.Body>
       {formData.length > 0 ? (
         <>
           <Table striped bordered hover responsive>
             <thead>
               <tr>
                 <th>Sr. no</th>
                 <th>Category Name</th>
                 <th>Category Code</th>
                 <th>Category Description</th>
                 <th>Price</th>
                 <th>Actions</th>
               </tr>
             </thead>
             <tbody>
               {currentItems.map((data, index) => (
                 <tr key={indexOfFirstItem + index}>
                   <td>{indexOfFirstItem + index + 1}</td>
                   <td>{data.categoryName}</td>
                   <td>{data.categoryCode}</td>
                   <td>{data.categoryDescription}</td>
                   <td>{data.price}</td>
                   <td>
                     <Button
                       variant="warning"
                       className="me-2"
                       onClick={() => handleEdit(indexOfFirstItem + index)}
                     >
                       Edit
                     </Button>
                     <Button
                       variant="danger"
                       onClick={() => handleDelete(indexOfFirstItem + index)}
                     >
                       Delete
                     </Button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </Table>
           <div className='d-flex justify-content-center'>
           <Pagination
             currentPage={currentPage}
             totalPages={totalPages}
             onPageChange={(page) => setCurrentPage(page)}
           />
           </div>
         </>
       ) : (
         <p>No data available</p>
       )}
     </Card.Body>
   </Card>
 );
};


export default FormDetailsCard;