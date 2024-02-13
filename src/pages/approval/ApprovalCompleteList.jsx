import React, { useState } from 'react'
import styles from './approval.module.css'
import ApprovalTable from './ApprovalTable';
import PaginationCommon from '../../components/pagination/PaginationCommon';
import ApprovalListHeader from './ApprovalListHeader';

const ApprovalCompleteList = ({handleMenu}) => {
    //pagination start//
    const[currentPage, setCurrentPage] = useState(1);
    const completeList = [];
  
    const postPerPage = 10;
    const totalPosts = completeList.length
    // 시작 인덱스와 끝 인덱스 계산
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
  
    //const selectedlist = [...noticeList.slice(indexOfFirstPost, indexOfLastPost)]
  
    const handleSetCurentPage = (pageNo) => {
      setCurrentPage(pageNo)
    }
    //pagination end//

  return (
    <div className={styles.approvalListWrap}>
    <div className={styles.approvalListHeader}><ApprovalListHeader handleMenu={handleMenu}/></div>
    <div className={styles.approvalListContent}><ApprovalTable/></div>
    <div className={styles.approvalListPagination}>
      <PaginationCommon currentPage={currentPage} totalPosts={totalPosts} postPerPage={postPerPage} handleSetCurentPage={handleSetCurentPage}></PaginationCommon>
    </div>
  </div>
  )
}

export default ApprovalCompleteList