import React, { useRef, useState } from 'react'
import { Container, Row, Col, Button, ButtonGroup, Dropdown, DropdownButton, Form } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap/esm';
import styles from './message.module.css'
import 'react-datepicker/dist/react-datepicker.css';
const MessageListHeader = () => {
  const [activeBtn, setActiveBtn] = useState(null);
  const [gubun, setGubun] = useState("");
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("전체");

  const[startDate, setStartDate] = useState(null);
  const[endDate, setEndDate] = useState(null);

  const handleSubmit =() =>{
    
  }

  const handleDateChange = (e) =>{
    const selectedTarget = e.target.id
    const selectedDate = e.target.value
    if(selectedTarget === "start-date"){
      console.log("start-date");
      setStartDate(selectedDate)
    }else{
      console.log("end-date");
      const sDate = new Date(startDate)
      const eDate = new Date(selectedDate)
      if(eDate < sDate){
        alert("시작날짜가 종료날짜보다 먼저가 되어야합니다.")
        setStartDate("");
        setEndDate("");
        return;
      }else{
        setEndDate(selectedDate)
      }
    }
  }

  const handleButtonClick = (period) => {
    setActiveBtn(period); // Update the active button state
    if(period !== "datePick"){
      setStartDate("");
      setEndDate("");
    }
  };

  const isActive = (period) => {
    return activeBtn === period; // Check if the button is active
  };

  const handleChange = (e) =>{
    const text = e.target.innerText
    setGubun(e.target.id)
    setTitle(text);
  }

  return (
    <>
      <div className={styles.datepickerTitle}>
        기간설정
      </div>
      <div className={styles.datepicker}>
        <div>
          <Button 
            className='ms-2' 
            variant={isActive('week') ? 'primary' : 'secondary'} 
            onClick={() => handleButtonClick('week')}
          >
            1주일
          </Button>
          <Button 
            className='ms-2' 
            variant={isActive('month') ? 'primary' : 'secondary'} 
            onClick={() => handleButtonClick('month')}
          >
            1개월
          </Button>
          <Button 
            className='ms-2' 
            variant={isActive('3months') ? 'primary' : 'secondary'} 
            onClick={() => handleButtonClick('3months')}
          >
            3개월
          </Button>
          <Button 
            className='ms-2' 
            variant={isActive('datePick') ? 'primary' : 'secondary'} 
            onClick={() => handleButtonClick('datePick')}
          >
            직접선택
          </Button>
        </div>
        <div style={{display:"flex"}}>
          <div style={{margin: "0 20px 0 0"}}>
            <label htmlFor="start-date">시작일자</label>
            <input type="date" id="start-date" name="start-date" value={startDate} onChange={handleDateChange}/>
          </div>
          <div>
          <label for="end-date">종료일자</label>
          <input type="date" id="end-date" name="end-date"  value={endDate} onChange={handleDateChange}/>
          </div>
        </div>
      </div>
      <div className={styles.searchTitle}>
        쪽지검색
      </div>
      <div className={styles.searchBar}>
        <InputGroup style={{width: "700px"}}>
                  <DropdownButton
                    variant="outline-secondary"
                    title={title}
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item onClick={handleChange}>전체</Dropdown.Item>
                    <Dropdown.Item id="me_title" onClick={handleChange}>제목</Dropdown.Item>
                    <Dropdown.Item id="me_content" onClick={handleChange}>내용</Dropdown.Item>
                    <Dropdown.Item id="e_name"  onClick={handleChange}>작성자</Dropdown.Item>
                  </DropdownButton>
                  <Form.Control aria-label="Text input with dropdown button"/>
                  <Button variant="secondary">검색</Button>
          </InputGroup>
      </div>
    </>
  )
}

export default MessageListHeader