import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './notice.module.css'
import { Button, Form, InputGroup } from 'react-bootstrap'
import NoticeFileUpload from './NoticeFileUpload'
import { noticeInsert } from '../../services/api/noticeApi'
import QuillEditor from '../../components/Quill/QuillEditor'

const NoticeWrite = ({handlePage, empData}) => {
  const [fileList, setFileList] = useState([])//파일리스트를 관리할 state

  const handleFile = (list) =>{//파일리스트를 업데이트할 함수선언
    setFileList([...list])
  }

   const titleRef = useRef(null);//input값을 참조할 ref 선언


  const handleSubmit = async () =>{//서브밋이 요청되었을 때 일하는 함수
    const title = titleRef.current.value;

    if("" !== title && "" !== quillContent){
      const formDataToSend = new FormData();
      formDataToSend.append('n_title', title)
      formDataToSend.append('n_content', quillContent)
      formDataToSend.append('e_no', empData.e_no)
  
      for(let i = 0; i < fileList.length; i++){
        formDataToSend.append('files', fileList[i]);
      }
      await noticeInsert(formDataToSend);
        alert("공지등록 성공")
        handlePage("전체공지")
    }else{
      alert("제목과 내용을 작성해주세요")
    }
  }

  //////////////////quill/////////////////////////////////
  const  quillRef = useRef()
  const [quillContent, setQuillContent] = useState('');//공지내용이 담김
  const [images, setImages] = useState([])
  let temp = [];//함수가 새로 생성(재렌더링)되더라도 처음에 대입된 이미지를 계속 기억해야함
  const memoTemp = useMemo(() => {
    return temp;
  },[])

  const handleImages = useCallback((value)=>{
    setImages([...images, value]);
  },[]);

  const handleContent = useCallback((value) => {
    console.log(value)
    setQuillContent(value)
  },[])

  return (
  <div className={styles.noticeWriteLayout}>
      <div className={styles.noticeWriteHeader}>
      <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" >작성자</InputGroup.Text>
            <Form.Control
              placeholder="작성자"
              readOnly
              value={empData.e_name}
            />
          </InputGroup>   
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
      <div className={styles.noticeWriteContent}>
        <QuillEditor memoTemp={memoTemp} isReadOnly={false} value={quillContent} handleContent={handleContent} quillRef={quillRef} handleImages={handleImages} />
      </div>
      <div className={styles.noticeWriteAttachment}>
        <NoticeFileUpload handleFile={handleFile} fileList={fileList}/>
      </div>
  </div>
  )
}

export default NoticeWrite