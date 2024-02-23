import React from 'react'
import { Form, InputGroup} from 'react-bootstrap'

const ApprovalWriteTable = ({empData, titleRef}) => {

    const now = new Date();
    // ISO 문자열로 변환 (예: "2024-02-13T15:03:04.000Z")
    const isoString = now.toISOString();
    // ISO 문자열을 Oracle 날짜 형식으로 변환 (UTC 기준)
    const dateString = isoString.replace('T', ' ').substring(0, 19);

  return (
    <>
      <InputGroup style={{height: "30%"}}>
        <InputGroup.Text style={{borderRadius: 0, width:"140px", justifyContent:"center"}} id="inputGroup-sizing-lg">기안자</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          style={{borderRadius: 0}}
          value={empData.e_name}
          readOnly
        />
        <InputGroup.Text style={{borderRadius: 0, width:"140px", justifyContent:"center"}} id="inputGroup-sizing-lg">직급</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          style={{borderRadius: 0}}
          value={empData.e_rank}
          readOnly
        />
    </InputGroup >
        <InputGroup style={{height: "30%"}}>
        <InputGroup.Text style={{borderRadius: 0, width:"140px", justifyContent:"center"}} id="inputGroup-sizing-lg">기안일</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          style={{borderRadius: 0}}
          value={dateString}
          readOnly
        />
        <InputGroup.Text style={{borderRadius: 0, width:"140px", justifyContent:"center"}} id="inputGroup-sizing-lg">부서</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          style={{borderRadius: 0}}
          value={empData.dept_name}
          readOnly
        />
    </InputGroup>
        <InputGroup style={{height: "40%"}}>
        <InputGroup.Text style={{borderRadius: 0, width:"140px", justifyContent:"center"}} id="inputGroup-sizing-lg">제목</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          style={{borderRadius: 0}}
          ref={titleRef}
        />
    </InputGroup>
    </>
  )
}

export default ApprovalWriteTable