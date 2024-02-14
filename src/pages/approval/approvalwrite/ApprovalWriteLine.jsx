import React from 'react'
import { Table } from 'react-bootstrap'
import styles from './approvalWrite.module.css'
const ApprovalWriteLine = ({lineData}) => {
  console.log("lineData:"+lineData.approvalLine.ename);
  return (
    <div className={styles.approvalLineWrap}>
      <div className={styles.approvalTableHeader}>결재</div>
      <div className={styles.agreeTableHeader}>합의</div>
      <div className={styles.approvalTable}>
        <Table className='mb-0 mt-0' striped bordered size="sm">
        <thead>
          <tr>
            <th style={{width:"33%"}}>결재1</th>
            <th style={{width:"33%"}}>결재2</th>
            <th style={{width:"33%"}}>결재3</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{height:'50px'}}>
            <td>{lineData.approvalLine[0] ? lineData.approvalLine[0].e_name : ""}</td>
            <td>{lineData.approvalLine[1] ? lineData.approvalLine[1].e_name : ""}</td>
            <td>{lineData.approvalLine[2] ? lineData.approvalLine[2].e_name : ""}</td>
          </tr>
        </tbody>
      </Table>
      </div>
      <div className={styles.agreeTable}>
        <Table className='mb-0 mt-0' striped bordered size="sm">
          <thead>
            <tr >
              <th style={{width:"33%"}}>합의1</th>
              <th style={{width:"33%"}}>합의2</th>
              <th style={{width:"33%"}}>합의3</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{height:'50px'}}>
              <td>{lineData.agreement[0] ? lineData.agreement[0].e_name : ""}</td>
              <td>{lineData.agreement[1] ? lineData.agreement[1].e_name : ""}</td>
              <td>{lineData.agreement[2] ? lineData.agreement[2].e_name : ""}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default ApprovalWriteLine