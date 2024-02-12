import React from 'react'
import { Form, InputGroup} from 'react-bootstrap'

const ApprovalWriteTable = () => {
  return (
    <>
      <InputGroup style={{height: "30%"}}>
      <InputGroup.Text style={{borderRadius: 0, width:"140px", justifyContent:"center"}} id="inputGroup-sizing-lg">기안자</InputGroup.Text>
      <Form.Control
        aria-label="Large"
        aria-describedby="inputGroup-sizing-sm"
        style={{borderRadius: 0}}
      />
    </InputGroup >
      <InputGroup style={{height: "30%"}}>
      <InputGroup.Text style={{borderRadius: 0, width:"140px", justifyContent:"center"}} id="inputGroup-sizing-lg">작성일자</InputGroup.Text>
      <Form.Control
        aria-label="Large"
        aria-describedby="inputGroup-sizing-sm"
        style={{borderRadius: 0}}
      />
    </InputGroup>
      <InputGroup style={{height: "40%"}}>
      <InputGroup.Text style={{borderRadius: 0, width:"140px", justifyContent:"center"}} id="inputGroup-sizing-lg">제목</InputGroup.Text>
      <Form.Control
        aria-label="Large"
        aria-describedby="inputGroup-sizing-sm"
        style={{borderRadius: 0}}
      />
    </InputGroup>
    </>
  )
}

export default ApprovalWriteTable