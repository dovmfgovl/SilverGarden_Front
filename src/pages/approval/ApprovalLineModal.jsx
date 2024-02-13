import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import styles from './approval.module.css'
import LineSelectBar from './LineSelectBar'
import SelectedAgreementLine from './SelectedAgreementLine'
import SelectedApprovalLine from './SelectedApprovalLine'
import { getDeptData } from '../../services/api/approvalApi'
import DeptView from './DeptView'

const ApprovalLineModal = (props) => {
  const[deptData, setDeptData] = useState([]);
  const [empData, setEmpData] = useState({
    e_no: "",
    e_name: "",
    e_rank: "",
  });

  const requestDeptData = async () =>{
    const response = await getDeptData();
    console.log(response.data);
    setDeptData(response.data);
  } 
  useEffect(()=>{
    requestDeptData();
  },[])

  const handleDeptData = (data) =>{
    setDeptData(data)
  }

  const handleEmpData = (data) => {
    setEmpData(data)
  }

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        결재선 관리
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className={styles.lineSelectorWrap}>
        <div className={styles.deptView}><DeptView deptData={deptData} empData={empData} handleEmpData={handleEmpData} handleDeptData={handleDeptData}/></div>
        <div className={styles.selectBar}><LineSelectBar handleLineData={props.handleLineData} empData={empData} lineData={props.lineData}/></div>
        <div className={styles.selectedApprovalLine}><SelectedApprovalLine lineData={props.lineData} handleLineData={props.handleLineData}/></div>
        <div className={styles.selectedAgreeLine}><SelectedAgreementLine lineData={props.lineData} handleLineData={props.handleLineData}/></div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button >완료</Button>
      <Button onClick={props.onHide}>닫기</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ApprovalLineModal