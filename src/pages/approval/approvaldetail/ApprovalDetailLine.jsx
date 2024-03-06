import React, { useState } from 'react'
import styles from '../approvalwrite/approvalWrite.module.css'
import { Button, Table } from 'react-bootstrap'
import approvalImg from '../../../assets/images/결재.png'
import agreementImg from '../../../assets/images/합의.png'
import denyImg from '../../../assets/images/반려.png'
import ResultCommentModal from './ResultCommentModal'

const ApprovalDetailLine = ({lineData}) => {
  const [modalShow, setModalShow] = useState(false);//모달의 상태를 관리할 state
  const [result, setResult] = useState("");
  const onHide=()=>{
    setModalShow(false);
  }

  const handleBtn = (result) =>{
    setResult(result)
    setModalShow(true)
  }

  return (
    <div className={styles.approvalLineWrap}>
    <div className={styles.approvalTableHeader}>결재</div>
    <div className={styles.agreeTableHeader}>합의</div>
    <div className={styles.approvalTable}>
      <Table className='mb-0 mt-0' striped bordered size="sm">
      <thead>
        <tr style={{height:'30px'}}>
        <th style={{width:"33%"}}>{lineData.approvalLine[0] ? lineData.approvalLine[0].ap_name+" "+lineData.approvalLine[0].ap_rank : ""}</th>
        <th style={{width:"33%"}}>{lineData.approvalLine[1] ? lineData.approvalLine[1].ap_name+" "+lineData.approvalLine[1].ap_rank : ""}</th>
        <th style={{width:"33%"}}>{lineData.approvalLine[2] ? lineData.approvalLine[2].ap_name+" "+lineData.approvalLine[2].ap_rank : ""}</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{height:'50px'}}>
          <td>
            {lineData.approvalLine[0] && lineData.approvalLine[0].ap_result === '승인' && <img src={approvalImg} style={{height:'40px'}} alt="결재"/>}
            {lineData.approvalLine[0] && lineData.approvalLine[0].ap_result === '반려' && <img src={denyImg} style={{height:'40px'}} alt="반려"/>}
          </td>
          <td>
            {lineData.approvalLine[1] && lineData.approvalLine[1].ap_result === '승인' && <img src={approvalImg} style={{height:'40px'}} alt="결재"/>}
            {lineData.approvalLine[1] && lineData.approvalLine[1].ap_result === '반려' && <img src={denyImg} style={{height:'40px'}} alt="반려"/>}
          </td>
          <td>
            {lineData.approvalLine[2] && lineData.approvalLine[2].ap_result === '승인' && <img src={approvalImg} style={{height:'40px'}} alt="결재"/>}
            {lineData.approvalLine[2] && lineData.approvalLine[2].ap_result === '반려' && <img src={denyImg} style={{height:'40px'}} alt="반려"/>}
          </td>
        </tr>
        <tr style={{height:'40px'}}>
        <td>
              {lineData.approvalLine[0] && lineData.approvalLine[0].ap_result === '승인' && <Button onClick={() => handleBtn(lineData.approvalLine[0])} variant="secondary" >의견</Button>}
              {lineData.approvalLine[0] && lineData.approvalLine[0].ap_result === '반려' && <Button onCLick={() => handleBtn(lineData.approvalLine[0])} variant="secondary" >의견</Button>}
            </td>
            <td>
              {lineData.approvalLine[1] && lineData.approvalLine[1].ap_result === '승인' && <Button onClick={() => handleBtn(lineData.approvalLine[1])} variant="secondary" >의견</Button>}
              {lineData.approvalLine[1] && lineData.approvalLine[1].ap_result === '반려' && <Button onClick={() => handleBtn(lineData.approvalLine[1])} variant="secondary" >의견</Button>}
            </td>
            <td>
              {lineData.approvalLine[2] && lineData.approvalLine[2].ap_result === '승인' && <Button onClick={() => handleBtn(lineData.approvalLine[2])} variant="secondary" >의견</Button>}
              {lineData.approvalLine[2] && lineData.approvalLine[2].ap_result === '반려' && <Button onClick={() => handleBtn(lineData.approvalLine[2])} variant="secondary" >의견</Button>}
            </td>
        </tr>
      </tbody>
    </Table>
    </div>
    <div className={styles.agreeTable}>
      <Table className='mb-0 mt-0' striped bordered size="sm">
        <thead>
          <tr style={{height:'30px'}}>
          <th style={{width:"33%"}}>{lineData.agreement[0] ? lineData.agreement[0].ap_name+" "+lineData.agreement[0].ap_rank : ""}</th>
          <th style={{width:"33%"}}>{lineData.agreement[1] ? lineData.agreement[1].ap_name+" "+lineData.agreement[1].ap_rank : ""}</th>
          <th style={{width:"33%"}}>{lineData.agreement[2] ? lineData.agreement[2].ap_name+" "+lineData.agreement[2].ap_rank : ""}</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{height:'50px'}}>
            <td>
              {lineData.agreement[0] && lineData.agreement[0].ap_result === '승인' && <img src={agreementImg} style={{height:'40px'}} alt="합의"/>}
              {lineData.agreement[0] && lineData.agreement[0].ap_result === '반려' && <img src={denyImg} style={{height:'40px'}} alt="반려"/>}
            </td>
            <td>
              {lineData.agreement[1] && lineData.agreement[1].ap_result === '승인' && <img src={agreementImg} style={{height:'40px'}} alt="합의"/>}
              {lineData.agreement[1] && lineData.agreement[1].ap_result === '반려' && <img src={denyImg} style={{height:'40px'}} alt="반려"/>}
              </td>
            <td>
              {lineData.agreement[2] && lineData.agreement[2].ap_result === '승인' && <img src={agreementImg} style={{height:'40px'}} alt="합의"/>}
              {lineData.agreement[2] && lineData.agreement[2].ap_result === '반려' && <img src={denyImg} style={{height:'40px'}} alt="반려"/>}
            </td>
          </tr>
          <tr style={{height:'40px'}}>
            <td>
              {lineData.agreement[0] && lineData.agreement[0].ap_result === '승인' && <Button onClick={() => handleBtn(lineData.approvalLine[0])} variant="secondary" >의견</Button>}
              {lineData.agreement[0] && lineData.agreement[0].ap_result === '반려' && <Button onClick={() => handleBtn(lineData.approvalLine[0])} variant="secondary" >의견</Button>}
            </td>
            <td>
              {lineData.agreement[1] && lineData.agreement[1].ap_result === '승인' && <Button onClick={() => handleBtn(lineData.approvalLine[1])} variant="secondary" >의견</Button>}
              {lineData.agreement[1] && lineData.agreement[1].ap_result === '반려' && <Button onClick={() => handleBtn(lineData.approvalLine[1])} variant="secondary" >의견</Button>}
            </td>
            <td>
              {lineData.agreement[2] && lineData.agreement[2].ap_result === '승인' && <Button onClick={() => handleBtn(lineData.approvalLine[2])} variant="secondary" >의견</Button>}
              {lineData.agreement[2] && lineData.agreement[2].ap_result === '반려' && <Button onClick={() => handleBtn(lineData.approvalLine[2])} variant="secondary" >의견</Button>}
            </td>
          </tr>
        </tbody>
      </Table>
      <ResultCommentModal result={result} show={modalShow} onHide={onHide}/>
    </div>
  </div>
  )
}

export default ApprovalDetailLine