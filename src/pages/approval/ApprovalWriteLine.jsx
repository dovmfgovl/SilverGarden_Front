import React from 'react'
import { Table } from 'react-bootstrap'

import styles from './approval.module.css'
const ApprovalWriteLine = () => {
  return (
    <div className={styles.approvalLineWrap}>
      <div className={styles.approvalTableHeader}>결재</div>
      <div className={styles.agreeTableHeader}>합의</div>
      <div className={styles.approvalTable}>
        <Table className='mb-0 mt-0' striped bordered hover size="sm">
        <thead>
          <tr>
            <th>결재1</th>
            <th>결재2</th>
            <th>결재3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
        </tbody>
      </Table>
      </div>
      <div className={styles.agreeTable}>
        <Table className='mb-0 mt-0' striped bordered hover size="sm">
          <thead>
            <tr>
              <th>합의1</th>
              <th>합의2</th>
              <th>합의3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default ApprovalWriteLine