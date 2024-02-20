import React, { useEffect, useState } from 'react'
import PaginationCommon from '../../components/pagination/PaginationCommon';
import styles from './message.module.css'
import { messageDeletedList } from '../../services/api/messageApi';
import MessageListHeader from './MessageListHeader';

const MessageDeleted = ({empData, handleMenu}) => {
  const[deletedList, setReceiveList] = useState([]);

  const getList = async () =>{
    const response = await messageDeletedList({e_no: empData.e_no})
    setReceiveList(response.data);
  }
  useEffect(()=>{
    //getList();
  },[])

  //pagination start//
  const[currentPage, setCurrentPage] = useState(1);

  const postPerPage = 10;
  const totalPosts = deletedList.length
  // 시작 인덱스와 끝 인덱스 계산
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const selectedlist = [...deletedList.slice(indexOfFirstPost, indexOfLastPost)]

  const handleSetCurentPage = (pageNo) => {
    setCurrentPage(pageNo)
  }
  //pagination end//
  return (
    <div className={styles.messageListWrap}>
      <div className={styles.messageListHeader}><MessageListHeader/></div>
      <div className={styles.messageListContent}>컨텐츠</div>
      <div className={styles.messageListPagination}>
        <PaginationCommon currentPage={currentPage} totalPosts={totalPosts} postPerPage={postPerPage} handleSetCurentPage={handleSetCurentPage}></PaginationCommon>
      </div>
  </div>
  )
}

export default MessageDeleted