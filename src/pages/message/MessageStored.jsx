import React, { useEffect, useState } from 'react'
import styles from './message.module.css'
import PaginationCommon from '../../components/pagination/PaginationCommon';
import MessageListHeader from './MessageListHeader';
import MessageListTable from './MessageListTable';
import { messageStoredList } from '../../services/api/messageApi';

const MessageStored = ({empData, handleMenu}) => {
  const[storedList, setStoredList] = useState([]);

  const getList = async () =>{
    const response = await messageStoredList({e_no: empData.e_no})
    setStoredList(response.data);
    console.log(response.data);
  }
  useEffect(()=>{
    getList();
  },[])

  const handleList = (filteredList) =>{
    setStoredList(filteredList)
  }

  //pagination start//
  const[currentPage, setCurrentPage] = useState(1);

  const postPerPage = 10;
  const totalPosts = storedList.length
  // 시작 인덱스와 끝 인덱스 계산
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const selectedlist = [...storedList.slice(indexOfFirstPost, indexOfLastPost)]

  const handleSetCurentPage = (pageNo) => {
    setCurrentPage(pageNo)
  }
  //pagination end//
  return (
    <div className={styles.messageListWrap}>
      <div className={styles.messageListHeader}><MessageListHeader messagePage={"쪽지보관함"} handleList={handleList} empData={empData}/></div>
      <div className={styles.messageListContent}><MessageListTable messagePage={"쪽지보관함"} messageList={selectedlist} handleMenu={handleMenu}/></div>
      <div className={styles.messageListPagination}>
        <PaginationCommon currentPage={currentPage} totalPosts={totalPosts} postPerPage={postPerPage} handleSetCurentPage={handleSetCurentPage}></PaginationCommon>
      </div>
  </div>
  )
}

export default MessageStored