import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import styles from './notice.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { noticeUpdate } from '../../services/api/noticeApi';
import QuillEditor from '../../components/Quill/QuillEditor';

const NoticeUpdate = ({noticeList, noticeNo, handlePage, fileList}) => {
  const detail = [...noticeList.filter((detail)=>detail.N_NO === noticeNo)][0]//공지리스트에서 공지번호로 글정보를 가져옴
  const [noticeDetail, setNoticeDetail] = useState(//페이지에 진입했을 때 초기값을 세팅
    {
      n_no: detail.N_NO,
      n_title: detail.N_TITLE,
      n_content: detail.N_CONTENT,
      e_no: detail.REG_ID
    });

    ////quillEditor/////////////////////////
    const  quillRef = useRef()
    const [images, setImages] = useState([])
  
    const handleContent = useCallback((value) => {
      setNoticeDetail({...noticeDetail, n_content: value})
    },[])
  
    useEffect(() => {
      for(let i=0;i<images.length;i++){//files는 배열이다 files.length=3
        if(!noticeDetail.n_content.match(images[i])){// 사진이 있으면
          console.log(images)
          setImages(images.filter(image=>image!==images[i]))
        }
      }
    },[noticeDetail, images])

  const handleUpdate = async () =>{//서브밋이 요청되었을 때 일하는 함수
    const response = await noticeUpdate(noticeDetail);
    alert("수정이 완료되었습니다.")
    handlePage('공지상세', noticeNo);
  }

  const handleCancel = async () =>{//취소버튼을 눌렀을 때 상세페이지로 이동
    handlePage("공지상세", noticeNo);
  }



  return (
  <div className={styles.noticeWriteLayout}>
      <div className={styles.noticeWriteHeader}>
      <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" >작성자</InputGroup.Text>
            <Form.Control
              placeholder="제목"
              readOnly
              value="관리자"
            />
          </InputGroup>   
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">제목</InputGroup.Text>
            <Form.Control
              placeholder="제목"
              value={noticeDetail.n_title}
              onChange={(e)=>{
                setNoticeDetail({...noticeDetail, n_title: e.target.value})//값이 바뀔 때마다 state를 업데이트 해줌
              }}
            />
          </InputGroup>
          <Button  variant="primary" onClick={handleUpdate}>
            수정완료
          </Button>
          <Button className="ms-2"variant="danger" onClick={handleCancel}>
            취소
          </Button>
      </div>
      <div className={styles.noticeWriteContent}>
        <QuillEditor isReadOnly={false} value={noticeDetail.n_content} handleContent={handleContent} quillRef={quillRef} images={images} />
      </div>
      <div className={styles.noticeWriteAttachment}>
      <FontAwesomeIcon icon={faPaperclip} />첨부파일:
        {fileList.map(file =>
          <div key={file.N_FILE_NO}>{file.N_FILENAME}</div>
        )}
      </div>
  </div>
  )
}

export default NoticeUpdate