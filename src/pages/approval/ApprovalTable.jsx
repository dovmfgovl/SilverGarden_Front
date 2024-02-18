import React, { useState } from 'react'
import { Form, Table } from 'react-bootstrap'

const ApprovalTable = ({appList, handleMenu}) => {
  const [isChecked, setChecked] = useState(false);

  const handleAllCheck= () =>{
    setChecked(current => !current)
  }

  return (
    <>
    <Table bordered hover style={{textAlign: "center", margin:0}}>
    <thead>
      <tr>
        <th style={{ width: '60px'}}><Form.Check aria-label="option 1"/></th>
        <th style={{ width: '60px'}}>번호</th>
        <th>문서종류</th>
        <th>문서제목</th>
        <th>기안자</th>
        <th>기안부서</th>
        <th>기안일</th>
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