import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from '../approvalwrite/approvalWrite.module.css'
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'
import ApprovalDetailLine from '../approvaldetail/ApprovalDetailLine'
import QuillEditor from '../../../components/Quill/QuillEditor'
import { approvalInsert, getApprovalDetail } from '../../../services/api/approvalApi'
import ApprovalLineModal from '../approvalwrite/ApprovalLineModal'
import ApprovalWriteTable from '../approvalwrite/ApprovalWriteTable'
import ApprovalFileUpload from '../approvalwrite/ApprovalFileUpload'
import VacationRequestForm from '../approvalwrite/VacationRequestForm'
import ExpenseReportForm from '../approvalwrite/ExpenseReportForm'

const ApprovalDocUpdate = ({handleMenu, docNo, empData}) => {
  const[docType, setDocType] = useState(null);//문서 종류를 관리할 state
  const [docDetail, setDocDetail] = useState([]);
  const [lineData, setLineData] = useState({
    approvalLine: [],
    agreement: []
  });//결재라인 정보를 담을 state
  const handleLineData = (data) =>{
    setLineData(data)
  }

  const getApprovalDoc = async() => {
    const response = await getApprovalDetail({d_no: docNo})
    setDocDetail(response.data[0])
    setContent(response.data[0].d_content)
    const approval = response.data[0].line.filter((element)=> element.ap_category === '결재')
    const agreement = response.data[0].line.filter((element)=> element.ap_category === '합의')
    const files = response.data[0].file
    setLineData({...lineData, approvalLine: approval, agreement: agreement})
    setFileList(files);
    setDocType(response.data[0].d_category)
    titleRef.current.textContent = response.data[0].d_title
  }

  const [fileList, setFileList] = useState([])//파일리스트를 관리할 state
  const handleFile = (list) =>{//파일리스트를 업데이트할 함수선언
    setFileList([...list])
  }

  useEffect(()=>{
    getApprovalDoc();
  },[])

    //////////////////quill 관련 state /////////////////////////////////
    const  quillRef = useRef()
    const [content, setContent] = useState('');//공지내용이 담김
    const [images, setImages] = useState([])
    let temp = [];//함수가 새로 생성(재렌더링)되더라도 처음에 대입된 이미지를 계속 기억해야함
    const memoTemp = useMemo(() => {
      return temp;
    },[])
  
    const handleImages = useCallback((value)=>{
      setImages([...images, value]);
    },[]);
  
    const handleContent = useCallback((value) => {
      setContent(value)
    },[])
    /////////////////////////////////quill end////////////////////////
    const titleRef = useRef()
    const handleSubmit = async (e) =>{//서브밋이 요청되었을 때 일하는 함수
      const title = titleRef.current.value;
      const d_status = e.target.innerText;
  
      if("" !== title && "" !== content){//제목과 내용이 있어야 서버에 요청 가능하도록 필터링
        const formDataToSend = new FormData();
        formDataToSend.append('d_title', title)
        formDataToSend.append('d_content', content)
        formDataToSend.append('e_no', docDetail.e_no)
        formDataToSend.append('d_category', docType)
        formDataToSend.append('d_status', d_status)

        if(d_status === '임시저장'){//임시저장의 경우 
          const response  = await approvalInsert(formDataToSend);
          if(response.data === 'ok'){
            alert(`문서가 ${d_status}되었습니다.`)//상신, 혹은 임시저장
            handleMenu('결재대기함');
            return;
          }
        }

        let line = []//결재, 합의 라인을 담아줄 배열생성
        lineData.approvalLine.map((approval, index)=>(//결재단계에 따라 순서를 담아줌
          line.push({...approval, ap_lev: index+1})//결재순서 입력
        ));
        lineData.agreement.map((agreement, index)=>(//합의순서 입력
          line.push({...agreement, ap_lev: index+1})
        ));
        for(let i = 0; i < fileList.length; i++){//파일이 있는 경우 추가해줌
          formDataToSend.append('files', fileList[i]);
        }

        if(line.length!==0){// 합의나 결재가 있는경우에만 결재라인을 넣어줌
          formDataToSend.append('line', JSON.stringify(line))
          const response  = await approvalInsert(formDataToSend);
          if(response.data === 'ok'){
            alert(`문서가 ${d_status}되었습니다.`)//상신, 혹은 임시저장
            handleMenu('결재요청함');
          }
        }else{
          alert("결재라인이 지정되지 않았습니다.")
          return;
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
    ///////modal end/////////////////////////////////////////////////

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
        <Button className="mx-2" variant="secondary" onClick={()=>handleMenu("임시보관함")}>목록</Button>
        <Button className="mx-2" variant="secondary" onClick={() => setModalShow(true)}>결재선관리</Button>
        <Button className="mx-2" variant="danger" onClick={()=>handleMenu("결재문서상세", docNo)}>수정취소</Button>
        <Button className="mx-2" variant="primary" onClick={(e) => {handleSubmit(e)}}>상신</Button>
        <ApprovalLineModal show={modalShow} lineData={lineData} handleLineData={handleLineData} onHide={onHide}/>
      </div>
      <div className={styles.approvalWriteHeader}>
        <div>{docType}</div>
      </div>
      <div className={styles.approvalWriteLine}><ApprovalDetailLine lineData={lineData} /></div>
      <div className={styles.approvalWriteTable}><ApprovalWriteTable empData={empData} titleRef={titleRef}/></div>
      <div className={styles.approvalWriteContent}>
        {docType === '품의서' && <QuillEditor isReadOnly={false} value={content} handleContent={handleContent} quillRef={quillRef} handleImages={handleImages}/>}
        {docType === '휴가신청서' && <VacationRequestForm handleContent={handleContent} formContent={content}/>}
        {docType === '지출결의서' && <ExpenseReportForm handleContent={handleContent} formContent={content}/>}
        </div>
      <div className={styles.approvalWriteFileUpload}>
        <ApprovalFileUpload handleFile={handleFile} fileList={fileList} />
      </div>
    </div>
  )
}

export default ApprovalDocUpdate