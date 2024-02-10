import React, { useEffect, useState } from 'react'
import styles from './notice.module.css';
import NoticeSearchBar from './NoticeSearchBar';
import NoticePagenation from './NoticePagenation';
import NoticeTable from './NoticeTable';

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
      <div className={styles.noticePagenation}>
        <NoticePagenation currentPage={currentPage} totalPosts={totalPosts} postPerPage={postPerPage} handleSetCurentPage={handleSetCurentPage}></NoticePagenation>
      </div>
    </div>
    </>
  )
}

export default NoticeList