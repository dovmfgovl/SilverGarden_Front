import React, { useEffect, useState } from 'react'
import { Col, Form, InputGroup } from 'react-bootstrap'

const VacationRequestForm = ({handleContent, formContent}) => {

  const [vacationInfo, setVacationInfo] = useState({
    startDate: null,
    endDate: null,
    totalDate: "",
    vacationType: "",
    vacationReason: ""
  });

  useEffect(()=>{
    if(formContent){
      const rows = JSON.parse(formContent)
      setVacationInfo([...rows])
    }
  },[])

  const handleDateChange = (e) => {
    const { id, value } = e.target;
  
    if(id === "start-date") {
      // 시작 날짜 설정
      setVacationInfo(prevState => ({
        ...prevState,
        startDate: value
      }));
    } else if(id === "end-date") {
      const sDate = new Date(vacationInfo.startDate);
      const eDate = new Date(value);
      if(eDate < sDate) {
        alert("시작날짜가 종료날짜보다 먼저가 되어야 합니다.");
        // 오류 시 날짜 초기화
        setVacationInfo(prevState => ({
          ...prevState,
          startDate: null,
          endDate: null
        }));
      } else {
        const diffTime = Math.abs(eDate - sDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        // 종료 날짜와 총 일수 설정
        setVacationInfo(prevState => ({
          ...prevState,
          endDate: value,
          totalDate: diffDays.toString()
        }));
        handleContent(JSON.stringify(vacationInfo))
      }
    }
  };

  const handleVacationTypeChange = (e) => {
    const newVacationType = e.target.nextSibling.textContent;
    setVacationInfo(prevState => ({
      ...prevState,
      vacationType: newVacationType
    }));
    handleContent(JSON.stringify(vacationInfo))
  };

  const handleReasonChange = (e) => {
    const newReason = e.target.value;
    setVacationInfo(prevState => ({
      ...prevState,
      vacationReason: newReason
    }));
    handleContent(JSON.stringify(vacationInfo))
  };

  return (
    <>
    <InputGroup style={{ height: "10%" , margin:0}}>
      <InputGroup.Text style={{ borderRadius: 0, width: "140px", justifyContent: "center" }}>
        구분
      </InputGroup.Text>
      <Col style={{textAlign: "center", padding:"20px"}}>
        {["연차휴가","특별휴가", "무급휴가", "병가", "기타"].map((type, idx) => (
          <Form.Check
            key={idx}
            inline
            label={type}
            name="vacationType"
            type="radio"
            id={`inline-radio-${idx}`}
            onClick={handleVacationTypeChange}
          />
        ))}
      </Col>
    </InputGroup>
    <InputGroup style={{ height: "10%" , margin:0}}>
      <InputGroup.Text style={{ borderRadius: 0, width: "140px", justifyContent: "center" }}>
        휴가기간
      </InputGroup.Text>
      <InputGroup.Text style={{ borderRadius: 0, justifyContent: "center" }}>시작일자</InputGroup.Text>
      <Form.Control
        type="date"
        style={{ borderRadius: 0}}
        aria-label="Start date"
        id='start-date'
        onChange={handleDateChange}
        value={vacationInfo.startDate || ''}
      />
      <InputGroup.Text style={{ borderRadius: 0, justifyContent: "center" }}>종료일자</InputGroup.Text>
      <Form.Control
        type="date"
        style={{ borderRadius: 0}}
        aria-label="End date"
        id='end-date'
        onChange={handleDateChange}
        value={vacationInfo.endDate || ''}
      />
      <InputGroup.Text style={{ borderRadius: 0, justifyContent: "center" }}>일수</InputGroup.Text>
      <Form.Control
        type="text"
        style={{ borderRadius: 0}}
        aria-label="Total date"
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
        onChange={handleReasonChange}
      />
    </InputGroup>
    </>
  )
}
export default VacationRequestForm