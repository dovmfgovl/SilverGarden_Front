import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { approvalDelete, approvalFileDownload, approvalWithdrawal, getApprovalDetail } from '../../../services/api/approvalApi';
import { Button} from 'react-bootstrap';
import styles from './approvalDetail.module.css'
import QuillEditor from '../../../components/Quill/QuillEditor';
import ApprovalDetailLine from './ApprovalDetailLine';
import ApprovalDetailTable from './ApprovalDetailTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { noticeFileDownload } from '../../../services/api/noticeApi';
import CommentModal from './CommentModal';
import ExpenseReportDetail from './ExpenseReportDetail';
import VacationRequestDetail from './VacationRequestDetail';

const ApprovalDocDetail = ({empData, handleMenu, docNo}) => {
  console.log("상세문서 페이지");
  const [docDetail, setDocDetail] = useState([]);
  const [lineData, setLineData] = useState({
    approvalLine: [],
    agreement: []
  });//결재라인 정보를 담을 state
  const [fileList, setFileList] = useState([]);

  const getApprovalDoc = async() => {
    const response = await getApprovalDetail({d_no: docNo})
    setDocDetail(response.data[0])
    setContent(response.data[0].d_content)
    const approval = response.data[0].line.filter((element)=> element.ap_category === '결재')
    const agreement = response.data[0].line.filter((element)=> element.ap_category === '합의')
    const files = response.data[0].file
    setLineData({...lineData, approvalLine: approval, agreement: agreement})
    setFileList(files);
  }

  console.log(docDetail);

  const handleFileDownload = (filename) =>{
    const response = approvalFileDownload(filename);
    console.log(response);
}

  useEffect(()=>{
    getApprovalDoc();
  },[])

  const handleDelete = async ()=>{//임시저장된 문서를 삭제할 때 사용하는 함수
    const response = await approvalDelete({d_no: docNo})
    if(response.data === "ok"){
      alert("성공적으로 삭제되었습니다.")
      handleMenu("결재대기함")
    }
  }

  const handleWithdrawal = async () =>{//내 문서를 철회할 때 사용하는 함수
    const response = await approvalWithdrawal({d_no: docNo})
    console.log(response.data);
    if(response.data === "ok"){
      handleMenu("결재요청함")
    }
  }

  const handleApprovalClick = () =>{
    const myLev = lineData.approvalLine.filter((approval)=> approval.ap_id === empData.e_no)[0].ap_lev
    const levelCheck = lineData.approvalLine.filter((approval) => approval.ap_category === "결재" && approval.ap_lev < myLev && approval.ap_result === "대기중").length
    console.log(myLev);
    console.log(levelCheck);
    if(levelCheck === 0 ){
      setModalShow(true)
    }else{
      alert("이전 결재단계가 진행중입니다.")
    }
  }
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
    console.log(value)
    setContent(value)
  },[])
  /////////////////////////////////quill end////////////////////////

  ///////modal start///////////////////////////////////////////////
  const [modalShow, setModalShow] = useState(false);//모달의 상태를 관리할 state
  const onHide=()=>{
    setModalShow(false);
  }
  ///////modal end/////////////////////////////////////////////////

  return (
    <div className={styles.approvalDetailWrap}>
      <div className={styles.approvalDetailBtnGroup}>
        <Button className="mx-2" variant="secondary" onClick={()=>handleMenu("결재대기함", docNo)}>목록</Button>
        {docDetail.e_no === empData.e_no && docDetail.d_status === '상신' &&  /*현재 상세문서가 내가 작성한 문서일 때*/
            <Button className="mx-2" variant="primary" onClick={handleWithdrawal}>문서회수</Button>
        }
        {docDetail.e_no === empData.e_no && docDetail.d_status === '임시저장' &&  /*현재 상세문서가 내가 작성한 문서일 때*/
            <>
              <Button className="mx-2" variant="primary" onClick={()=>handleMenu("결재문서수정")}>문서수정</Button>
              <Button className="mx-2" variant="danger" onClick={handleDelete}>임시문서삭제</Button>
            </>
        }
       {lineData.approvalLine && docDetail.d_status !== '반려' && lineData.approvalLine.map(/* 내가 결재자이면서 문서가 반려되지 않은 경우 */
        (approval)=> approval.ap_id === empData.e_no && approval.ap_result === '대기중' && 
        <>
        <Button className="mx-2" variant="primary" onClick={handleApprovalClick}>결재</Button>
        <Button className="mx-2" variant="primary" onClick={handleApprovalClick}>전결</Button>
        </>
        )}
       {lineData.agreement && lineData.agreement.map(/* 내가 합의자인 경우 */
        (agreement)=> agreement.ap_id === empData.e_no && agreement.ap_result === '대기중' && <Button className="mx-2" variant="primary" onClick={()=>setModalShow(true)}>합의</Button>)}
        <CommentModal show={modalShow} onHide={onHide} docNo={docNo} lineData={lineData} empData={empData} handleMenu={handleMenu}/>
      </div>
      <div className={styles.approvalDetailHeader}>
        <div>{docDetail && docDetail.d_category}</div>
      </div>
      <div className={styles.approvalDetailLine}><ApprovalDetailLine lineData={lineData} /></div>
      <div className={styles.approvalDetailTable}><ApprovalDetailTable docDetail={docDetail}/></div>
      <div className={styles.approvalDetailContent}>
        {docDetail && docDetail.d_category === "품의서" && <QuillEditor isReadOnly={true} value={content} handleContent={handleContent} quillRef={quillRef} handleImages={handleImages}/>}
        {docDetail && docDetail.d_category === "휴가신청서" && <VacationRequestDetail value={content}/>}
        {docDetail && docDetail.d_category === "지출결의서" && <ExpenseReportDetail value={content}/>}
      </div>
      <div className={styles.fileDownload}>
        {docDetail && docDetail.d_category === "품의서" &&
        <>
          <FontAwesomeIcon icon={faPaperclip} />첨부파일
          {fileList && fileList.length > 0 && fileList.map(file =>
            <div key={file.ap_file_no}>
              {file.ap_filename}
              <button onClick={()=>handleFileDownload(file.ap_filename)}>
                <FontAwesomeIcon icon={faDownload} />
              </button>
            </div>
          )}
        </>
        }
      </div>
    </div>
  )
}

export default ApprovalDocDetail