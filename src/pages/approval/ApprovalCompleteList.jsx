import React, { useEffect, useState } from 'react'
import styles from './approval.module.css'
import ApprovalTable from './ApprovalTable';
import PaginationCommon from '../../components/pagination/PaginationCommon';
import ApprovalListHeader from './ApprovalListHeader';
import { approvalCompleteList} from '../../services/api/approvalApi';

const ApprovalCompleteList = ({handleMenu, empData}) => {
  const [completeList, setCompleteList] = useState([]);

  const getList = async () =>{
    const response = await approvalCompleteList({e_no: empData.e_no})
    console.log(response.data);
    setCompleteList(response.data);
  }
  useEffect(()=>{
    getList();
  },[])

    //pagination start//
    const[currentPage, setCurrentPage] = useState(1);
  
    const postPerPage = 10;
    const totalPosts = completeList.length
    // 시작 인덱스와 끝 인덱스 계산
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
  
    const selectedlist = [...completeList.slice(indexOfFirstPost, indexOfLastPost)]
  
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

export default ApprovalCompleteList