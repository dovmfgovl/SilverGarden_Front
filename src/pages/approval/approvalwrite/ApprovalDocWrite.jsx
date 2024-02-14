import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './approvalWrite.module.css'
import ApprovalWriteTable from './ApprovalWriteTable'
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'
import QuillEditor from '../../../components/Quill/QuillEditor'
import ApprovalWriteLine from './ApprovalWriteLine'
import ApprovalFileUpload from './ApprovalFileUpload'
import ApprovalLineModal from '../ApprovalLineModal'

const ApprovalDocWrite = ({empData}) => {
  const[docType, setDocType] = useState("품의서");//문서 종류를 관리할 state
  const [modalShow, setModalShow] = useState(false);//모달의 상태를 관리할 state
  const [lineData, setLineData] = useState({
    approvalLine: [],
    agreement: []
  });//결재라인 정보를 담을 state
  //approvalLine : [{e_no:empData.e_no, e_name:empData.e_name, ap_category:"결재", e_rank:empData.e_rank}...]
  //agreement : [{e_no:empData.e_no, e_name:empData.e_name, ap_category:"결재", e_rank:empData.e_rank}...]


  const handleLineData = (data) =>{
    setLineData(data)
  }

  ///////파일 업로드를 위해 선언한 state와 함수
  const [fileList, setFileList] = useState([])//파일리스트를 관리할 state

  const handleFile = (list) =>{//파일리스트를 업데이트할 함수선언
    setFileList([...list])
  }
    //////////////////quill 관련 state /////////////////////////////////
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
    /////////////////////////////////quill end////////////////////////


    ////modal 조작 함수////////////
    const onHide = (btnLabel) =>{
      setModalShow(false)
      if("닫기" === btnLabel){
        setLineData({
          approvalLine: [],
          agreement: []
        });
      }
    }

  return (
    <div className={styles.approvalWriteWrap}>
      <div className={styles.approvalWriteBtnGroup}>
        <InputGroup size='sm'>
          <DropdownButton
            variant="secondary"
            title="문서선택"
            id="input-group-dropdown-1"
          >
            <Dropdown.Item onClick={(e)=>{setDocType(e.target.innerText)}}>품의서</Dropdown.Item>
            <Dropdown.Item onClick={(e)=>{setDocType(e.target.innerText)}}>지출결의서</Dropdown.Item>
            <Dropdown.Item onClick={(e)=>{setDocType(e.target.innerText)}}>휴가신청서</Dropdown.Item>
          </DropdownButton>
          <Form.Control value={docType} aria-label="Text input with dropdown button"/>
        </InputGroup>
        <Button className="mx-2" variant="secondary" onClick={() => setModalShow(true)}>결재선관리</Button>
        <Button className="mx-2" variant="secondary">상신</Button>
        <Button className="mx-2" variant="secondary">임시저장</Button>
        <Button className="mx-2" variant="danger">종료</Button>
        <ApprovalLineModal show={modalShow} lineData={lineData} handleLineData={handleLineData} onHide={onHide}/>
      </div>
      <div className={styles.approvalWriteHeader}>
        <div>{docType}</div>
      </div>
      <div className={styles.approvalWriteLine}><ApprovalWriteLine lineData={lineData}/></div>
      <div className={styles.approvalWriteTable}><ApprovalWriteTable empData={empData}/></div>
      <div className={styles.approvalWriteContent}><QuillEditor isReadOnly={false} value={quillContent} handleContent={handleContent} quillRef={quillRef} handleImages={handleImages}/></div>
      <div className={styles.approvalWriteFileUpload}>
        <ApprovalFileUpload handleFile={handleFile} fileList={fileList} />
      </div>
    </div>
  )
}

export default ApprovalDocWrite