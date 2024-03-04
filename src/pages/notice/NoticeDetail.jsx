import React, { useEffect, useState } from 'react'
import styles from './notice.module.css'
import NoticeDetailHeader from './NoticeDetailHeader'
import { getNoticeDetail, noticeFileDownload } from '../../services/api/noticeApi'
import { Button } from 'react-bootstrap'
import {faDownload, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import QuillEditor from '../../components/Quill/QuillEditor'

const NoticeDetail = ({noticeNo , handlePage , handleFileList, fileList, empData}) => {

  const [noticeDetail, setNoticeDetail] = useState({});

  const getDetail = async () => {//해당 문서와 첨부파일 정보를 가져오는 함수 선언
    const response =  await getNoticeDetail(noticeNo);
    const detailList = response.data;
    setNoticeDetail({...detailList[0]});//받아온 값중 공지글에 대한 정보만 detail에 담음
    
    let tempList = [];//임시배열생성
    detailList.forEach(file => {//DB에서 받아온 파일명을 임시배열에 담아줌
      if(file.N_FILENAME){//첨부파일이 있는 경우만 
        tempList =[...tempList,{N_FILENAME: file.N_FILENAME, N_FILE_NO: file.N_FILE_NO}];
      }
    })
      handleFileList(tempList);
      //setFileList(tempList);//파일명 배열을 state에 저장
    }

  useEffect(()=>{
    getDetail();
  },[])

  const handleFileDownload = (filename) =>{
      const response = noticeFileDownload(filename);
  }

  return (
    <>

    <div className={styles.noticeDetailLayout}>
      <div className={styles.noticeReturnBtn}>
        <Button variant="secondary" className='ms-3 mb-2' onClick={()=>{
        handlePage("전체공지")
      }}>목록</Button>{' '}
      </div>
      <div className={styles.noticeDetailHeader}><NoticeDetailHeader noticeDetail={noticeDetail} fileList={fileList} handlePage={handlePage} empData={empData}/></div>
      <div className={styles.noticeDatailContent}>
        <QuillEditor isReadOnly={true} value={noticeDetail.N_CONTENT}/>
        {/* {noticeDetail.N_CONTENT} */}
      </div>
      <div className={styles.noticeDetailAttachment}>
      <FontAwesomeIcon icon={faPaperclip} />첨부파일
      {fileList && fileList.length > 0 && fileList.map(file =>
        <div key={file.N_FILE_NO}>
          {file.N_FILENAME}
          <button onClick={()=>handleFileDownload(file.N_FILENAME)}>
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>
      )}
      </div>
    </div>
    </>
  )
}

export default NoticeDetail