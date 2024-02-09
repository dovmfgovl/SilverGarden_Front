import React, { useEffect, useState } from 'react'
import styles from './notice.module.css'
import NoticeDetailHeader from './NoticeDetailHeader'
import { getNoticeDetail, noticeFileDownload } from '../../services/api/noticeApi'
import { Button } from 'react-bootstrap'
import {faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NoticeDetail = ({noticeNo , handlePage , handleFileList, fileList}) => {

  const [noticeDetail, setNoticeDetail] = useState({});

  const getDetail = async () => {//해당 문서와 첨부파일 정보를 가져오는 함수 선언
    const response =  await getNoticeDetail(noticeNo);
    const detailList = response.data;
    console.log(detailList);
    setNoticeDetail({...detailList[0]});//받아온 값을 noticeDetail에 저장
    
    let tempList = [];//임시배열생성
    detailList.forEach(file => {//DB에서 받아온 파일명을 임시배열에 담아줌
      tempList =[...tempList,{N_FILENAME: file.N_FILENAME, N_FILE_NO: file.N_FILE_NO}];
    })
      handleFileList(tempList);
      //setFileList(tempList);//파일명 배열을 state에 저장
  }

  useEffect(()=>{
    getDetail();
  },[])

  const handleFileDownload = (e) =>{
      const response = noticeFileDownload(e.target.innerText);
      console.log(response);
  }

  return (
    <>

    <div className={styles.noticeDetailLayout}>
      <div className={styles.noticeReturnBtn}>
        <Button variant="secondary" className='ms-3 mb-2' onClick={()=>{
        console.log("클릭");
        handlePage("전체공지")
      }}>목록</Button>{' '}
      </div>
      <div className={styles.noticeDetailHeader}><NoticeDetailHeader noticeDetail={noticeDetail} fileList={fileList} handlePage={handlePage}/></div>
      <div className={styles.noticeDatailContent}>
        {noticeDetail.N_CONTENT}
      </div>
      <div className={styles.noticeDetailAttachment}>
      <FontAwesomeIcon icon={faPaperclip} />첨부파일:
        {fileList.map(file =>
        <div key={file.N_FILE_NO} onClick={handleFileDownload}>
           {file.N_FILENAME}
        </div>
        )}
      </div>
    </div>
    </>
  )
}

export default NoticeDetail