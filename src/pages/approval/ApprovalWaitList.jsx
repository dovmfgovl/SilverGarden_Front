import React, { useEffect, useState } from 'react'
import styles from './approval.module.css'
import PaginationCommon from '../../components/pagination/PaginationCommon';
import ApprovalTable from './ApprovalTable';
import ApprovalListHeader from './ApprovalListHeader';
import { approvalWaitList } from '../../services/api/approvalApi';

const ApprovalWaitList = ({handleMenu, empData}) => {
  const[waitList, setWaitList] = useState([]);
  
  const getList = async () =>{
    const response = await approvalWaitList({e_no: empData.e_no})
    console.log(response.data);
    setWaitList(response.data);
  }
  useEffect(()=>{
    getList();
  },[])

  //pagination start//
  const[currentPage, setCurrentPage] = useState(1);

  const postPerPage = 10;
  const totalPosts = waitList.length
  // 시작 인덱스와 끝 인덱스 계산
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const selectedlist = [...waitList.slice(indexOfFirstPost, indexOfLastPost)]

  const handleSetCurentPage = (pageNo) => {
    setCurrentPage(pageNo)
  }
  //pagination end//


  return (
    <div className={styles.approvalListWrap}>
    <div className={styles.approvalListHeader}><ApprovalListHeader handleMenu={handleMenu} empData={empData}/></div>
    <div className={styles.approvalListContent}><ApprovalTable appList={selectedlist} handleMenu={handleMenu}/></div>
    <div className={styles.approvalListPagination}>
      <PaginationCommon currentPage={currentPage} totalPosts={totalPosts} postPerPage={postPerPage} handleSetCurentPage={handleSetCurentPage}></PaginationCommon>
    </div>
  </div>
  )
}

export default ApprovalWaitList