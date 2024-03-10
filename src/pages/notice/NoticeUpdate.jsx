import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import styles from './notice.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { getNoticeDetail, noticeUpdate } from '../../services/api/noticeApi';
import QuillEditor from '../../components/Quill/QuillEditor';

const NoticeUpdate = ({ noticeNo, handlePage, fileList}) => {
  //const detail = [...noticeList.filter((detail)=>detail.N_NO === noticeNo)][0]//공지리스트에서 공지번호로 글정보를 가져옴
  // const [noticeDetail, setNoticeDetail] = useState(//페이지에 진입했을 때 초기값을 세팅
  //   {
      // n_no: detail.N_NO,
      // n_title: detail.N_TITLE,
      // n_content: detail.N_CONTENT,
      // e_no: detail.REG_ID
  //   });

    const [noticeDetail, setNoticeDetail] = useState({});

    const getDetail = async () => {//해당 문서와 첨부파일 정보를 가져오는 함수 선언
      const response =  await getNoticeDetail(noticeNo);
      const detailList = response.data;
      setNoticeDetail({
        n_no: detailList[0].N_NO,
        n_title: detailList[0].N_TITLE,
        n_content: detailList[0].N_CONTENT,
        e_no: detailList[0].REG_ID
      });//받아온 값중 공지글에 대한 정보만 detail에 담음
      
      let tempList = [];//임시배열생성
      detailList.forEach(file => {//DB에서 받아온 파일명을 임시배열에 담아줌
        if(file.N_FILENAME){//첨부파일이 있는 경우만 
          tempList =[...tempList,{N_FILENAME: file.N_FILENAME, N_FILE_NO: file.N_FILE_NO}];
        }
      })
      }
  
    useEffect(()=>{
      getDetail();
    },[])

    ////quillEditor/////////////////////////
    const  quillRef = useRef()
    const [images, setImages] = useState([])
  
    const handleContent = (value) => {
      setNoticeDetail({...noticeDetail, n_content: value})
    }

    console.log(noticeDetail);
  
    useEffect(() => {
      for(let i=0;i<images.length;i++){//files는 배열이다 files.length=3
        if(!noticeDetail.n_content.match(images[i])){// 사진이 있으면
          console.log(images)
          setImages(images.filter(image=>image!==images[i]))
        }
      }
    },[noticeDetail, images])

  const handleUpdate = async () =>{//서브밋이 요청되었을 때 일하는 함수
    console.log("서브밋");
    console.log(noticeDetail);
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