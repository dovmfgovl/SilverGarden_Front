import React, { useRef, useState } from 'react'
import styles from './notice.module.css'
import { Button, Form, InputGroup } from 'react-bootstrap'
import NoticeFileUpload from './NoticeFileUpload'
import axios from 'axios'
import { noticeInsert } from '../../services/api/noticeApi'

const NoticeWrite = ({handlePage}) => {
  const [fileList, setFileList] = useState([])//파일리스트를 관리할 state

  const handleFile = (list) =>{//파일리스트를 업데이트할 함수선언
    setFileList([...list])
  }

   const usernameRef = useRef(null);//input값을 참조할 ref 선언
   const titleRef = useRef(null);
   const contentRef = useRef(null);


  const handleSubmit = async () =>{//서브밋이 요청되었을 때 일하는 함수
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    const formDataToSend = new FormData();
    formDataToSend.append('n_title', title)
    formDataToSend.append('n_content', content)
    formDataToSend.append('emp_id', "s1604010")

    for(let i = 0; i < fileList.length; i++){
      formDataToSend.append('files', fileList[i]);
    }
    await noticeInsert(formDataToSend);
      alert("공지등록 성공")
      handlePage("전체공지")
  }
  

  return (
  <div className={styles.noticeWriteLayout}>
      <div className={styles.noticeWriteHeader}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">제목</InputGroup.Text>
            <Form.Control
              placeholder="제목"
              ref={titleRef}
            />
          </InputGroup>
          <Button variant="primary" onClick={handleSubmit}>
            작성완료
          </Button>
      </div>
      <div className={styles.noticeWriteAttachment}>
        <NoticeFileUpload handleFile={handleFile} fileList={fileList}/>
      </div>
      <div className={styles.noticeWriteContent}>
        <InputGroup>
          <InputGroup.Text>내용</InputGroup.Text>
          <Form.Control 
          as="textarea" 
          ref={contentRef} />
        </InputGroup>
      </div>
  </div>
  )
}

export default NoticeWrite