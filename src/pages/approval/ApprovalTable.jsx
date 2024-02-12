import React, { useState } from 'react'
import { Form, Table } from 'react-bootstrap'

const ApprovalTable = ({appList}) => {
  console.log(appList);
  const [isChecked, setChecked] = useState(false);

  const handleAllCheck= () =>{
    setChecked(current => !current)
  }
  return (
    <>
    <div>총: {appList? appList.length : 0}건</div>
    <Table bordered hover style={{textAlign: "center"}}>
    <thead>
      <tr>
        <th ><Form.Check aria-label="option 1"/></th>
        <th style={{ width: '60px'}}>번호</th>
        <th>문서종류</th>
        <th>문서제목</th>
        <th>기안자</th>
        <th>기안부서</th>
        <th>기안일</th>
        <th>배정일</th>
        <th style={{ width: '90px'}}>결재상태</th>
      </tr>
    </thead>
    <tbody>
      {appList && appList.map((doc)=>(
        <tr>
          <td><Form.Check aria-label="option 1"/></td>
          <td>{doc.D_NO}</td>
          <td>{doc.D_TITLE}</td>
          <td>{doc.D_CONTENT}</td>
          <td>{doc.E_NAME}</td>
          <td>{doc.DEPT_NAME}</td>
          <td>{doc.REG_DATE}</td>
          <td>{doc.REG_DATE}</td>
          <td>{doc.D_STATUS}</td>
        </tr>
      ))}
    </tbody>
  </Table>
    </>
  )
}

export default ApprovalTable