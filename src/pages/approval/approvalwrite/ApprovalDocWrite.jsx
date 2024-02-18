import React, { useCallback, useMemo, useRef, useState } from 'react'
import styles from './approvalWrite.module.css'
import ApprovalWriteTable from './ApprovalWriteTable'
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'
import QuillEditor from '../../../components/Quill/QuillEditor'
import ApprovalWriteLine from './ApprovalWriteLine'
import ApprovalFileUpload from './ApprovalFileUpload'
import ApprovalLineModal from './ApprovalLineModal'
import { approvalInsert } from '../../../services/api/approvalApi'

const ApprovalDocWrite = ({empData, handleMenu}) => {
  const[docType, setDocType] = useState("품의서");//문서 종류를 관리할 state
  const [lineData, setLineData] = useState({
    approvalLine: [],
    agreement: []
  });//결재라인 정보를 담을 state
  //approvalLine : [{e_no:empData.e_no, e_name:empData.e_name, ap_category:"결재", e_rank:empData.e_rank}...]
  //agreement : [{e_no:empData.e_no, e_name:empData.e_name, ap_category:"힙의", e_rank:empData.e_rank}...]


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
    const titleRef = useRef()
    const handleSubmit = async (e) =>{//서브밋이 요청되었을 때 일하는 함수
      const title = titleRef.current.value;
  
      if("" !== title && "" !== quillContent){//제목과 내용이 있어야 서버에 요청 가능하도록 필터링
        const formDataToSend = new FormData();
        formDataToSend.append('d_title', title)
        formDataToSend.append('d_content', quillContent)
        formDataToSend.append('e_no', "202402_00000027")
        formDataToSend.append('d_category', docType)
        formDataToSend.append('d_status', e.target.innerText)//버튼

        let line = []//결재, 합의 라인을 담아줄 배열생성
        lineData.approvalLine.map((approval, index)=>(//결재단계에 따라 순서를 담아줌
          line.push({...approval, ap_lev: index+1})//결재순서 입력
        ));
        lineData.agreement.map((agreement, index)=>(//합의순서 입력
          line.push({...agreement, ap_lev: index+1})
        ));
        formDataToSend.append('line', JSON.stringify(line))
        console.log(line);
    
        for(let i = 0; i < fileList.length; i++){
          formDataToSend.append('files', fileList[i]);
        }
        const response  = await approvalInsert(formDataToSend);
        console.log(response.data);
        if(response.data === 'ok'){
          alert(`문서가 ${e.target.innerText}되었습니다.`)//상신, 혹은 임시저장
          handleMenu('결재요청함');
        }
      }else{
        alert("제목과 내용을 작성해주세요")
      }
    }

    ////modal 조작 함수////////////
    const [modalShow, setModalShow] = useState(false);//모달의 상태를 관리할 state
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
        <Button className="mx-2" variant="secondary" onClick={(e) => {handleSubmit(e)}}>상신</Button>
        <Button className="mx-2" variant="secondary" onClick={(e) => {handleSubmit(e)}}>임시저장</Button>
        <Button className="mx-2" variant="danger" onClick={()=>handleMenu("결재대기함")}>종료</Button>
        <ApprovalLineModal show={modalShow} lineData={lineData} handleLineData={handleLineData} onHide={onHide}/>
      </div>
      <div className={styles.approvalWriteHeader}>
        <div>{docType}</div>
      </div>
      <div className={styles.approvalWriteLine}><ApprovalWriteLine lineData={lineData}/></div>
      <div className={styles.approvalWriteTable}><ApprovalWriteTable empData={empData} titleRef={titleRef}/></div>
      <div className={styles.approvalWriteContent}><QuillEditor isReadOnly={false} value={quillContent} handleContent={handleContent} quillRef={quillRef} handleImages={handleImages}/></div>
      <div className={styles.approvalWriteFileUpload}>
        <ApprovalFileUpload handleFile={handleFile} fileList={fileList} />
      </div>
    </div>
  )
}

export default ApprovalDocWrite