import React, { useEffect, useState } from 'react'
import ApprovalTable from './ApprovalTable';
import PaginationCommon from '../../components/pagination/PaginationCommon';
import styles from './approval.module.css'
import ApprovalListHeader from './ApprovalListHeader';
import { approvalDenyList } from '../../services/api/approvalApi';

const ApprovalDenyList = ({handleMenu, empData}) => {
    const[denyList, setDenyList] = useState([]);

    const getList = async () =>{
      const response = await approvalDenyList({e_no: empData.e_no})
      console.log(response.data);
      setDenyList(response.data);
    }
    useEffect(()=>{
      getList();
    },[])


    //pagination start//
    const[currentPage, setCurrentPage] = useState(1);
  
    const postPerPage = 10;
    const totalPosts = denyList.length
    // 시작 인덱스와 끝 인덱스 계산
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
  
    const selectedlist = [...denyList.slice(indexOfFirstPost, indexOfLastPost)]
  
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

export default ApprovalDenyList