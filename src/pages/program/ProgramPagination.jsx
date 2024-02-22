import React from 'react'
import { Pagination } from 'react-bootstrap';

const ProgramPagination = ({currentPage, totalPosts, postPerPage, handleSetCurentPage}) => {
  
  const pageNumbers = [];
  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalPosts / postPerPage);

  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(startPage + 4, totalPages);

  // 페이지 번호 배열 생성
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  const handlePrev = () =>{
    if(currentPage > 1){
      handleSetCurentPage(currentPage-1);
    }
  }

  const handleNext = () =>{
    if(currentPage < totalPages){
      handleSetCurentPage(currentPage+1);
    }
  }
  return (
    <Pagination className="mb-0">
    <Pagination.First onClick={() => handleSetCurentPage(1)} />
      <Pagination.Prev onClick={handlePrev}/>
      {pageNumbers.map(number => (
        <Pagination.Item active={number === currentPage} onClick={() => handleSetCurentPage(number)} key={number}>
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={handleNext} />
      <Pagination.Last onClick={() => handleSetCurentPage(totalPages)} />
    </Pagination>
  )
}

export default ProgramPagination