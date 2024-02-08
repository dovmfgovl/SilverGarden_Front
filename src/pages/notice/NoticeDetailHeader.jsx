import React from 'react'
import { Button } from 'react-bootstrap';
import styles from './notice.module.css'

const NoticeDetailHeader = ({noticeDetail, handlePage}) => {
  console.log(noticeDetail);
  const detail = {...noticeDetail}

  const handleUpdate = () =>{
    
  }

  const handleDelete = () =>{

  }

  return (
    <>
      <div className={styles.noticeDetailTitle}>{detail.N_TITLE}</div>
      <div className={styles.noticeDetailOthers}>
        <div>작성자:{detail.N_NO}</div>
        <div>등록일:{detail.REG_DATE}</div>
        <div>조회수:{detail.N_HIT}</div>
      </div>
      <div className={styles.noticeDetailHeadetBtn}>
        <Button variant="primary" onClick={handleUpdate}>수정</Button>{' '}
        <Button variant="danger" onClick={handleDelete}>삭제</Button>{' '}
      </div>
    </>
  )
}

export default NoticeDetailHeader