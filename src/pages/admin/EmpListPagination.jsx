import React from 'react'
import { Pagination } from 'react-bootstrap';
import styles from "./empInfo.module.css";

const EmpListPagination = ({currentPage, totalPosts, postPerPage, handleSetCurrentPage}) => {
  
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
      handleSetCurrentPage(currentPage-1);
    }
  }

  const handleNext = () =>{
    if(currentPage < totalPages){
      handleSetCurrentPage(currentPage+1);
    }
  }
  return (
      <Pagination className={styles.empListPagination}>
      <Pagination.First onClick={() => handleSetCurrentPage(1)} />
        <Pagination.Prev onClick={handlePrev}/>
        {pageNumbers.map(number => (
          <Pagination.Item active={number === currentPage} onClick={() => handleSetCurrentPage(number)} key={number}>
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={handleNext} />
        <Pagination.Last onClick={() => handleSetCurrentPage(totalPages)} />
      </Pagination>
  )
}

export default EmpListPagination