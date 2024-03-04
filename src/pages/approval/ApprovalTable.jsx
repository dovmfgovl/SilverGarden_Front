import React from 'react'
import { Form, Table } from 'react-bootstrap'
import styles from './approval.module.css'

const ApprovalTable = ({appList, handleMenu}) => {

  return (
    <>
    <Table hover className={styles.approvalTable}>
    <thead>
      <tr>
        <th style={{ width: '60px'}}><Form.Check aria-label="option 1"/></th>
        <th style={{ width: '60px'}}>번호</th>
        <th style={{ width: '150px'}}>문서종류</th>
        <th>문서제목</th>
        <th style={{ width: '150px'}}>기안자</th>
        <th style={{ width: '150px'}}>기안부서</th>
        <th style={{ width: '150px'}}>기안일</th>
        <th style={{ width: '90px'}}>결재상태</th>
      </tr>
    </thead>
    <tbody>
      {appList && appList.map((doc)=>(
        <tr key={doc.d_no}>
          <td><Form.Check aria-label="option 1"/></td>
          <td>{doc.d_no}</td>
          <td onClick={()=>handleMenu("결재문서상세", doc.d_no)}>{doc.d_category}</td>
          <td onClick={()=>handleMenu("결재문서상세", doc.d_no)}>{doc.d_title}</td>
          <td onClick={()=>handleMenu("결재문서상세", doc.d_no)}>{doc.e_name}</td>
          <td onClick={()=>handleMenu("결재문서상세", doc.d_no)}>{doc.dept_name}</td>
          <td onClick={()=>handleMenu("결재문서상세", doc.d_no)}>{doc.reg_date}</td>
          <td onClick={()=>handleMenu("결재문서상세", doc.d_no)}>{doc.d_status}</td>
        </tr>
      ))}
    </tbody>
  </Table>
    </>
  )
}

export default ApprovalTable