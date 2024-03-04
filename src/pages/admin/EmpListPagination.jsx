import React from 'react'
import { Pagination } from 'react-bootstrap';
import styled from 'styled-components';

const PaginationStyled = styled(Pagination)`
  .page-link {
    color: #000; 
    background-color: #fff;
    border: 1px solid #ccc; 
  }

  .page-item.active .page-link {
    z-index: 1;
    color: #555;
    font-weight: bold;
    background-color: #f1f1f1;
    border-color: #ccc;
  }

  .page-link:focus, .page-link:hover {
    color: #000;
    background-color: #fafafa; 
    border-color: #ccc;
  }
`;

const EmpListPagination = ({currentPage, totalPosts, postPerPage, handleSetCurrentPage}) => {
  
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postPerPage);
  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(startPage + 4, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePrev = () =>{
    if(currentPage > 1){
      handleSetCurrentPage(currentPage-1);
    }
  }

  const handleNext = () =>{
    if(currentPage < totalPages){
      handleSetCurrentPage(currentPage+1);
    }
  }

  return (
    <PaginationStyled className="mb-0">
      <Pagination.First onClick={() => handleSetCurrentPage(1)} />
      <Pagination.Prev onClick={handlePrev}/>
      {pageNumbers.map(number => (
        <Pagination.Item active={number === currentPage} onClick={() => handleSetCurrentPage(number)} key={number}>
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={handleNext} />
      <Pagination.Last onClick={() => handleSetCurrentPage(totalPages)} />
    </PaginationStyled>
  )
}

export default EmpListPagination;