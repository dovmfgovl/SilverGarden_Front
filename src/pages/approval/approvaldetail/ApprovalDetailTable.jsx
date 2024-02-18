import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'

const ApprovalDetailTable = ({docDetail}) => {
  return (
    <>
      <InputGroup style={{height: "30%"}}>
        <InputGroup.Text style={{borderRadius: 0, width:"140px", justifyContent:"center"}} id="inputGroup-sizing-lg">기안자</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          style={{borderRadius: 0}}
          value={docDetail.e_name}
          readOnly
        />
        <InputGroup.Text style={{borderRadius: 0, width:"140px", justifyContent:"center"}} id="inputGroup-sizing-lg">직급</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          style={{borderRadius: 0}}
          value={docDetail.e_rank}
          readOnly
        />
    </InputGroup >
        <InputGroup style={{height: "30%"}}>
        <InputGroup.Text style={{borderRadius: 0, width:"140px", justifyContent:"center"}} id="inputGroup-sizing-lg">기안일</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          style={{borderRadius: 0}}
          value={docDetail.reg_date}
          readOnly
        />
        <InputGroup.Text style={{borderRadius: 0, width:"140px", justifyContent:"center"}} id="inputGroup-sizing-lg">부서</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          style={{borderRadius: 0}}
          value={docDetail.dept_name}
          readOnly
        />
    </InputGroup>
        <InputGroup style={{height: "40%"}}>
        <InputGroup.Text style={{borderRadius: 0, width:"140px", justifyContent:"center"}} id="inputGroup-sizing-lg">제목</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          style={{borderRadius: 0}}
          value={docDetail.d_title}
          readOnly
        />
    </InputGroup>
    </>
  )
}

export default ApprovalDetailTable