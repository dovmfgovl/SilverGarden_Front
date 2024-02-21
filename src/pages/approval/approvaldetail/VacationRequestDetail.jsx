import React from 'react'
import { Col, Form, InputGroup } from 'react-bootstrap'

const VacationRequestDetail = ({value}) => {
  const vacationInfo = JSON.parse(value);

  return (
    <>
    <InputGroup style={{ height: "10%" , margin:0 , borderTop: 0}}>
      <InputGroup.Text style={{ borderRadius: 0, width: "140px", justifyContent: "center",borderTop: 0}}>
        구분
      </InputGroup.Text>
      <Form.Control
        type="text"
        style={{ borderRadius: 0, textAlign:"center",borderTop: 0}}
        aria-label="Start date"
        id='start-date'
        value={vacationInfo.vacationType || ''}
        readOnly
      />
    </InputGroup>
    <InputGroup style={{ height: "10%" , margin:0}}>
      <InputGroup.Text style={{ borderRadius: 0, width: "140px", justifyContent: "center" }}>
        휴가기간
      </InputGroup.Text>
      <InputGroup.Text style={{ borderRadius: 0, justifyContent: "center" }}>시작일자</InputGroup.Text>
      <Form.Control
        type="text"
        style={{ borderRadius: 0}}
        aria-label="Start date"
        id='start-date'
        value={vacationInfo.startDate || ''}
        readOnly
      />
      <InputGroup.Text style={{ borderRadius: 0, justifyContent: "center" }}>종료일자</InputGroup.Text>
      <Form.Control
        type="text"
        style={{ borderRadius: 0}}
        aria-label="End date"
        id='end-date'
        value={vacationInfo.endDate || ''}
        readOnly
      />
      <InputGroup.Text style={{ borderRadius: 0, justifyContent: "center" }}>일수</InputGroup.Text>
      <Form.Control
        type="text"
        style={{ borderRadius: 0}}
        aria-label="Total date"
        id='total-date'
        value={vacationInfo.totalDate || ''}
        readOnly
      />
    </InputGroup>
    <InputGroup style={{ height: "80%" , margin:0}}>
      <InputGroup.Text style={{ borderRadius: 0, width: "140px", justifyContent: "center" }}>
        사유
      </InputGroup.Text>
        <Form.Control
          as="textarea"
          aria-label="With textarea"
          style={{ borderRadius: 0, height:"100%", textAlign:"center", resize: "none", paddingTop: "20%"}}
          value={vacationInfo.vacationReason || ''}
          readOnly
        />
    </InputGroup>
    </>
  )
}

export default VacationRequestDetail