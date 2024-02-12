import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './approval.module.css'
import ApprovalWriteTable from './ApprovalWriteTable'
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'
import QuillEditor from '../../components/Quill/QuillEditor'
import ApprovalWriteLine from './ApprovalWriteLine'
import ApprovalFileUpload from './ApprovalFileUpload'
import ApprovalLineModal from './ApprovalLineModal'

const ApprovalDocWrite = () => {
  const[docType, setDocType] = useState("품의서");
  

  const [modalShow, setModalShow] = useState(false);

  ///////파일 업로드를 위해 선언한 state와 함수
  const [fileList, setFileList] = useState([])//파일리스트를 관리할 state

  const handleFile = (list) =>{//파일리스트를 업데이트할 함수선언
    setFileList([...list])
  }
    //////////////////quill 관련 state /////////////////////////////////
  const  quillRef = useRef()
  const [quillContent, setQuillContent] = useState('');//공지내용이 담김
  const [files, setFiles] = useState([])

  const handleContent = useCallback((value) => {
    console.log(value)
    setQuillContent(value)
  },[])

  useEffect(() => {
    for(let i=0;i<files.length;i++){//files는 배열이다 files.length=3
      if(!quillContent.match(files[i])){// 사진이 있으면
        console.log(files)
        setFiles(files.filter(file=>file!==files[i]))
      }
    }
  },[quillContent, files])

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
        <ApprovalLineModal show={modalShow} onHide={() => setModalShow(false)}/>
      </div>
      <div className={styles.approvalWriteHeader}>
        <div>{docType}</div>
      </div>
      <div className={styles.approvalWriteLine}><ApprovalWriteLine/></div>
      <div className={styles.approvalWriteTable}><ApprovalWriteTable/></div>
      <div className={styles.approvalWriteContent}><QuillEditor isReadOnly={false} value={quillContent} handleContent={handleContent} quillRef={quillRef} files={files}/></div>
      <div className={styles.approvalWriteFileUpload}>
        <ApprovalFileUpload handleFile={handleFile} fileList={fileList} />
      </div>
    </div>
  )
}

export default ApprovalDocWrite