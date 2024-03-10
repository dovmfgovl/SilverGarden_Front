import React, {useEffect, useState } from 'react'
import styles from './notice.module.css';
import NoticeSearchBar from './NoticeSearchBar';
import NoticeTable from './NoticeTable';
import NoticePagination from './NoticePagination';
import { getNoticeList, noticeTotalCount } from '../../services/api/noticeApi';

const NoticeList = ({handlePage}) => {
  const [noticeList, setNoticeList] = useState([]);
  const[currentPage, setCurrentPage] = useState(1);
  const[totalPosts, setTotalPosts] = useState(0);

  const postPerPage = 10;

  // const getTotalPost = async (params) =>{
  //   const response = await noticeTotalCount(params);
  //   setTotalPosts(response.data.total_count);
  // }

  const getList = async (params) => {
    //DB에서 리스트를 불러오는 함수
    const response = await getNoticeList(params);
    setNoticeList(response.data);
    const count = await noticeTotalCount(params);
    setTotalPosts(count.data.total_count)
  };

  useEffect(()=>{
    getList({offset:(currentPage-1)*10+1, limit:postPerPage});
  },[currentPage])
  
 //const totalPosts = noticeList.length
  // 시작 인덱스와 끝 인덱스 계산
  // const indexOfLastPost = currentPage * postPerPage;
  // const indexOfFirstPost = indexOfLastPost - postPerPage;

  // const selectedlist = [...noticeList.slice(indexOfFirstPost, indexOfLastPost)]
  // console.log(selectedlist);

  const handleSetCurentPage = (pageNo) => {
    setCurrentPage(pageNo)
  }
  console.log("렌더링");
  return (
    <>
    <div className={styles.noticeListLayout}>
      <div className={styles.noticeHeader}><NoticeSearchBar getList={getList} currentPage={currentPage} postPerPage={postPerPage}></NoticeSearchBar></div>
      <div className={styles.noticeContent}><NoticeTable noticeList={noticeList} handlePage={handlePage}></NoticeTable></div>
      <div className={styles.noticePagination}>
        <NoticePagination currentPage={currentPage} totalPosts={totalPosts} postPerPage={postPerPage} handleSetCurentPage={handleSetCurentPage}></NoticePagination>
      </div>
    </div>
    </>
  )
}

export default NoticeList