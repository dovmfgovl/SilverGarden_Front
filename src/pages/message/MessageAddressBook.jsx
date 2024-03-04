import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { getDeptData } from '../../services/api/approvalApi';
import DeptView from '../approval/approvalwrite/DeptView';

const MessageAddressBook = (props) => {
  const[deptData, setDeptData] = useState([]);
  const [empData, setEmpData] = useState({
    e_no: "",
    e_name: "",
    e_rank: "",
  });

  const requestDeptData = async () =>{
    const response = await getDeptData();
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
    size=""
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        주소록
      </Modal.Title>
    </Modal.Header>
    <Modal.Body style={{height:"600px"}}>
      <DeptView deptData={deptData} empData={empData} handleEmpData={handleEmpData} handleDeptData={handleDeptData}/>
      {/* approval의 deptView에서 가져와 재활용함 */}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={()=>{
        props.addReceiverList(empData)
        props.onHide();  
      }}>추가</Button>
      <Button onClick={props.onHide}>닫기</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default MessageAddressBook