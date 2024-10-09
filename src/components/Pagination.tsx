import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';


interface PaginationProps {
 currentPage: number;
 totalPages: number;
 onPageChange: (page: number) => void;
}


const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
 const handlePrevClick = () => {
   if (currentPage > 1) {
     onPageChange(currentPage - 1);
   }
 };


 const handleNextClick = () => {
   if (currentPage < totalPages) {
     onPageChange(currentPage + 1);
   }
 };
 return (
   <BootstrapPagination>
     <BootstrapPagination.Prev onClick={handlePrevClick} disabled={currentPage === 1} />
     {[...Array(totalPages)].map((_, idx) => (
       <BootstrapPagination.Item
         key={idx}
         active={idx + 1 === currentPage}
         onClick={() => onPageChange(idx + 1)}
       >
         {idx + 1}
       </BootstrapPagination.Item>
     ))}
     <BootstrapPagination.Next onClick={handleNextClick} disabled={currentPage === totalPages} />
   </BootstrapPagination>
 );
};


export default Pagination;
