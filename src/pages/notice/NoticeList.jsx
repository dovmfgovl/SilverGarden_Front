import React, { useEffect, useState } from 'react'
import styles from './notice.module.css';
import NoticeSearchBar from './NoticeSearchBar';
import NoticeTable from './NoticeTable';
import NoticePagination from './NoticePagination';

const NoticeList = ({noticeList, handlePage, getList}) => {
  const[currentPage, setCurrentPage] = useState(1);

  const postPerPage = 10;
  const totalPosts = noticeList.length
  // 시작 인덱스와 끝 인덱스 계산
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const selectedlist = [...noticeList.slice(indexOfFirstPost, indexOfLastPost)]

  const handleSetCurentPage = (pageNo) => {
    setCurrentPage(pageNo)
  }

  return (
    <>
    <div className={styles.noticeListLayout}>
      <div className={styles.noticeHeader}><NoticeSearchBar getList={getList}></NoticeSearchBar></div>
      <div className={styles.noticeContent}><NoticeTable noticeList={selectedlist} handlePage={handlePage}></NoticeTable></div>
      <div className={styles.noticePagination}>
        <NoticePagination currentPage={currentPage} totalPosts={totalPosts} postPerPage={postPerPage} handleSetCurentPage={handleSetCurentPage}></NoticePagination>
      </div>
    </div>
    </>
  )
}

export default NoticeList