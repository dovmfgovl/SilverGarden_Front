import React, { useEffect, useState } from 'react'
import styles from './notice.module.css';
import NoticeSearchBar from './NoticeSearchBar';
import NoticePagenation from './NoticePagenation';
import NoticeTable from './NoticeTable';

const NoticeList = ({noticeList, handlePage, getList}) => {

  return (
    <>
    <div className={styles.noticeListLayout}>
      <div className={styles.noticeHeader}><NoticeSearchBar getList={getList}></NoticeSearchBar></div>
      <div className={styles.noticeContent}><NoticeTable noticeList={noticeList} handlePage={handlePage}></NoticeTable></div>
      <div className={styles.noticePagenation}><NoticePagenation></NoticePagenation></div>
    </div>
    </>
  )
}

export default NoticeList