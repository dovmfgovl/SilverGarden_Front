import React, { useEffect, useState } from 'react'
import { messageTempList } from '../../services/api/messageApi';
import styles from './message.module.css'
import PaginationCommon from '../../components/pagination/PaginationCommon';
import MessageListHeader from './MessageListHeader';
import MessageListTable from './MessageListTable';

const MessageTemp = ({empData, handleMenu}) => {
  const[tempList, setReceiveList] = useState([]);

  const getList = async () =>{
    const response = await messageTempList({e_no: empData.e_no})
    setReceiveList(response.data);
  }
  useEffect(()=>{
    //getList();
  },[])

  //pagination start//
  const[currentPage, setCurrentPage] = useState(1);

  const postPerPage = 10;
  const totalPosts = tempList.length
  // 시작 인덱스와 끝 인덱스 계산
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const selectedlist = [...tempList.slice(indexOfFirstPost, indexOfLastPost)]

  const handleSetCurentPage = (pageNo) => {
    setCurrentPage(pageNo)
  }
  //pagination end//
  return (
    <div className={styles.messageListWrap}>
      <div className={styles.messageListHeader}><MessageListHeader/></div>
      <div className={styles.messageListContent}><MessageListTable messagePage={"쪽지보관함"}/></div>
      <div className={styles.messageListPagination}>
        <PaginationCommon currentPage={currentPage} totalPosts={totalPosts} postPerPage={postPerPage} handleSetCurentPage={handleSetCurentPage}></PaginationCommon>
      </div>
  </div>
  )
}

export default MessageTemp