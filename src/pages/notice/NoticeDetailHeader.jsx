import React from 'react'
import { Button } from 'react-bootstrap';
import styles from './notice.module.css'
import { noticeDelete } from '../../services/api/noticeApi';
import { useNavigate } from 'react-router-dom';

const NoticeDetailHeader = ({noticeDetail, handlePage}) => {
  const detail = {...noticeDetail}
  const navigation = useNavigate();

  const handleUpdate = () =>{
    handlePage("공지수정", noticeDetail.N_NO)//Notice로 현재 공지글의 번호를 넘겨줌
  }

  const handleDelete = async () =>{
    if(window.confirm("정말 삭제하시겠습니까?")){
      const response =  await noticeDelete(noticeDetail.N_NO);
      console.log(response.data);
      alert("삭제가 되었습니다");
      handlePage("전체공지")
    }
  }

  return (
    <>
      <div className={styles.noticeDetailTitle}>{noticeDetail.N_TITLE}</div>
      <div className={styles.noticeDetailOthers}>
        <div>작성자:{noticeDetail.N_NO}</div>
        <div>등록일:{noticeDetail.REG_DATE}</div>
        <div>조회수:{noticeDetail.N_HIT}</div>
      </div>
      <div className={styles.noticeDetailHeadetBtn}>
        <Button variant="primary" onClick={handleUpdate}>수정</Button>{' '}
        <Button variant="danger" onClick={handleDelete}>삭제</Button>{' '}
      </div>
    </>
  )
}

export default NoticeDetailHeader