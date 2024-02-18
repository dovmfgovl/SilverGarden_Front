import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getApprovalDetail } from '../../../services/api/approvalApi';
import { Button} from 'react-bootstrap';
import styles from './approvalDetail.module.css'
import QuillEditor from '../../../components/Quill/QuillEditor';
import ApprovalDetailLine from './ApprovalDetailLine';
import ApprovalDetailTable from './ApprovalDetailTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { noticeFileDownload } from '../../../services/api/noticeApi';
import { useSelector } from 'react-redux';
import CommentModal from './CommentModal';

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
    setQuillContent(response.data[0].d_content)
    const approval = response.data[0].line.filter((element)=> element.ap_category === '결재')
    const agreement = response.data[0].line.filter((element)=> element.ap_category === '합의')
    const files = response.data[0].file
    setLineData({...lineData, approvalLine: approval, agreement: agreement})
    setFileList(files);
  }

  console.log(docDetail);

  const handleFileDownload = (filename) =>{
    const response = noticeFileDownload(filename);
    console.log(response);
}

  useEffect(()=>{
    getApprovalDoc();
  },[])

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

  ///////modal start///////////////////////////////////////////////
  const [modalShow, setModalShow] = useState(false);//모달의 상태를 관리할 state
  const onHide=()=>{
    setModalShow(false);
  }
  ///////modal end/////////////////////////////////////////////////

  return (
    <div className={styles.approvalDetailWrap}>
      <div className={styles.approvalDetailBtnGroup}>
        <Button className="mx-2" variant="secondary">목록</Button>
        {docDetail.e_no === empData.e_no &&  /*현재 상세문서가 내가 작성한 문서일 때*/
          <>
            <Button className="mx-2" variant="primary">문서수정</Button>
            <Button className="mx-2" variant="secondary">문서회수</Button>
          </>
       }
       {lineData.approvalLine && lineData.approvalLine.map(/* 내가 결재자인 경우 */
        (approval)=> approval.ap_name === empData.e_name && <Button className="mx-2" variant="primary">결재</Button>)}
       {lineData.agreement && lineData.agreement.map(/* 내가 합의자인 경우 */
        (agreement)=> agreement.ap_name === empData.e_name && <Button className="mx-2" variant="primary" onClick={()=>setModalShow(true)}>합의</Button>)}
        <CommentModal show={modalShow} onHide={onHide} docNo={docNo} lineData={lineData} empData={empData}/>
      </div>
      <div className={styles.approvalDetailHeader}>
        <div>품의서</div>
      </div>
      <div className={styles.approvalDetailLine}><ApprovalDetailLine lineData={lineData} /></div>
      <div className={styles.approvalDetailTable}><ApprovalDetailTable docDetail={docDetail}/></div>
      <div className={styles.approvalDetailContent}><QuillEditor isReadOnly={true} value={quillContent} handleContent={handleContent} quillRef={quillRef} handleImages={handleImages}/></div>
      <div className={styles.fileDownload}>
      <FontAwesomeIcon icon={faPaperclip} />첨부파일
      {fileList && fileList.length > 0 && fileList.map(file =>
        <div key={file.ap_file_no}>
          {file.ap_filename}
          <button onClick={()=>handleFileDownload(file.ap_filename)}>
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>
      )}
      </div>
    </div>
  )
}

export default ApprovalDocDetail