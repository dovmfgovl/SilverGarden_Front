import React, { useRef, useState } from 'react'
import { Container, Row, Col, Button, ButtonGroup, Dropdown, DropdownButton, Form } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap/esm';
import styles from './message.module.css'
import 'react-datepicker/dist/react-datepicker.css';
import { messageDeletedList, messageReceiveList, messageSendList, messageStoredList } from '../../services/api/messageApi';
const MessageListHeader = ({messagePage, handleList, empData}) => {
  const [activeBtn, setActiveBtn] = useState(null);
  const [gubun, setGubun] = useState("");
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("전체");
  
  const[startDate, setStartDate] = useState(null);
  const[endDate, setEndDate] = useState(null);

  let dataSet = {}

  const handleSubmit = async () =>{
    if("받은쪽지함" === messagePage){
      if(activeBtn){//기간검색이라면
        dataSet = {gubun:"period", start_date:startDate, end_date:endDate}
      }else{//키워드검색이라면
        dataSet = {gubun:title, start_date:startDate, end_date:endDate}
      }
      const response = await messageReceiveList();
      handleList(response.data)
    }else if("보낸쪽지함" === messagePage){
      const response = await messageSendList();
      handleList(response.data)
    }else if("쪽지보관함" === messagePage){
      const response = await messageStoredList();
      handleList(response.data)
    }else if("휴지통" === messagePage){
      const response = await messageDeletedList();
      handleList(response.data)
    }
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
    setKeyword("")
    setTitle("전체")
    setActiveBtn(period); // Update the active button state
    const today = new Date();
    let start_date = today.toISOString().split('T')[0];
    let end_date = "";
    if(period === "datePick"){//직접 날짜를 지정할 때는 state를 비워준다
      start_date = "";
    }else if(period === "week"){
      end_date = new Date(today.setDate(today.getDate()+6))//현재날짜부터 7일
      end_date = end_date.toISOString().split('T')[0];
    }else if(period === "month"){
      end_date = new Date(today.setMonth(today.getMonth()+1))//1개월 후
      end_date = end_date.toISOString().split('T')[0];
    }else if(period === "3months"){
      end_date = new Date(today.setMonth(today.getMonth()+3))//3개월 후
      end_date = end_date.toISOString().split('T')[0];
    }
    setStartDate(start_date);
    setEndDate(end_date);
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
        기간검색
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
          <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}> 
              <Button className='ms-5' variant='secondary'>기간검색</Button>
          </div>
        </div>
      </div>
      <div className={styles.searchTitle}>
        조건검색
      </div>
      <div className={styles.searchBar}>
        <InputGroup style={{width: "480px"}}>
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
                  <Form.Control aria-label="Text input with dropdown button" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
          </InputGroup>
          <Button className='ms-3' variant="secondary">검색</Button>
      </div>
    </>
  )
}

export default MessageListHeader