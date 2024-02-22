import React, { useEffect, useState } from 'react'
import styles from './approval.module.css'
import PaginationCommon from '../../components/pagination/PaginationCommon';
import ApprovalTable from './ApprovalTable';
import ApprovalListHeader from './ApprovalListHeader';
import { getAllApprovalList } from '../../services/api/approvalApi';

const ApprovalUpList = ({handleMenu, empData, approvalPage}) => {
    const[appList, setAppList] = useState([]);
    const getList = async () =>{
      const response = await getAllApprovalList({e_no: empData.e_no})
      console.log(response.data);
      setAppList(response.data);
    }
    useEffect(()=>{
      getList();
    },[])

    //pagination start//
    const[currentPage, setCurrentPage] = useState(1);
  
    const postPerPage = 10;
    const totalPosts = appList.length
    // 시작 인덱스와 끝 인덱스 계산
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
  
    const selectedlist = [...appList.slice(indexOfFirstPost, indexOfLastPost)]
  
    const handleSetCurentPage = (pageNo) => {
      setCurrentPage(pageNo)
    }
    //pagination end//


  return (
  <div className={styles.approvalListWrap}>
    <div className={styles.approvalListHeader}><ApprovalListHeader handleMenu={handleMenu} empData={empData}/></div>
    <div className={styles.approvalListContent}><ApprovalTable appList={selectedlist} handleMenu={handleMenu} approvalPage={approvalPage}/></div>
    <div className={styles.approvalListPagination}>
      <PaginationCommon currentPage={currentPage} totalPosts={totalPosts} postPerPage={postPerPage} handleSetCurentPage={handleSetCurentPage}></PaginationCommon>
    </div>
  </div>
  )
}

export default ApprovalUpList