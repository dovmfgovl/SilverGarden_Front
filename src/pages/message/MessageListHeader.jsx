import React, { useState } from 'react'
import {Button, Dropdown, DropdownButton, Form } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap/esm';
import styles from './message.module.css'
import 'react-datepicker/dist/react-datepicker.css';
import { messageDeletedList, messageReceiveList, messageSendList, messageStoredList } from '../../services/api/messageApi';
const MessageListHeader = ({messagePage, handleList, empData}) => {
  const [activeBtn, setActiveBtn] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("제목");
  const [gubun, setGubun] = useState();
  const[startDate, setStartDate] = useState(null);
  const[endDate, setEndDate] = useState(null);

  let dataSet = {e_no:empData.e_no}

  const handlePeriodSearch = async () =>{
    dataSet = {...dataSet,gubun:"period", start_date:startDate, end_date:endDate}
    if("받은쪽지함" === messagePage){
      console.log(dataSet);
      const response = await messageReceiveList(dataSet);
      handleList(response.data)
    }else if("보낸쪽지함" === messagePage){
      const response = await messageSendList(dataSet);
      handleList(response.data)
    }else if("쪽지보관함" === messagePage){
      const response = await messageStoredList(dataSet);
      handleList(response.data)
    }else if("휴지통" === messagePage){
      const response = await messageDeletedList(dataSet);
      handleList(response.data)
    }
  }

  const handleKeywordSearch = async (e) =>{
    dataSet = {...dataSet,gubun:gubun,keyword:keyword}
    if("받은쪽지함" === messagePage){
      if("전체검색" === e.target.innerText){//전체검색을 누른 경우
        const response = await messageReceiveList({e_no:empData.e_no});
        handleList(response.data)
      }else{//키워드 검색인 경우
        const response = await messageReceiveList(dataSet);
        handleList(response.data)
      }
    }else if("보낸쪽지함" === messagePage){
      if("전체검색" === e.target.innerText){//전체검색을 누른 경우
        const response = await messageSendList({e_no:empData.e_no});
        handleList(response.data)
      }else{//키워드 검색인 경우
        const response = await messageSendList(dataSet);
        handleList(response.data)
      }
    }else if("쪽지보관함" === messagePage){
      if("전체검색" === e.target.innerText){//전체검색을 누른 경우
        const response = await messageStoredList({e_no:empData.e_no});
        handleList(response.data)
      }else{//키워드 검색인 경우
        const response = await messageStoredList(dataSet);
        handleList(response.data)
      }
    }else if("휴지통" === messagePage){
      if("전체검색" === e.target.innerText){//전체검색을 누른 경우
        const response = await messageDeletedList({e_no:empData.e_no});
        handleList(response.data)
      }else{//키워드 검색인 경우
        const response = await messageDeletedList(dataSet);
        handleList(response.data)
      }
    }
    setKeyword("");
  }


  const handleDateChange = (e) =>{
    const selectedTarget = e.target.id
    const selectedDate = e.target.value
    if(selectedTarget === "start-date"){
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
    setTitle("제목")
    setActiveBtn(period); // Update the active button state
    const today = new Date();
    let start_date = "";
    let end_date = today.toISOString().split('T')[0];
    if(period === "datePick"){//직접 날짜를 지정할 때는 state를 비워준다
      end_date = "";
    }else if(period === "week"){
      start_date = new Date(today.setDate(today.getDate()-6))//현재날짜부터 7일
      start_date = start_date.toISOString().split('T')[0];
    }else if(period === "month"){
      start_date = new Date(today.setMonth(today.getMonth()-1))//1개월 후
      start_date = start_date.toISOString().split('T')[0];
    }else if(period === "3months"){
      start_date = new Date(today.setMonth(today.getMonth()-3))//3개월 후
      start_date = start_date.toISOString().split('T')[0];
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
    setActiveBtn(null);//조건검색을 할때는 기간검색 내역들을 비워줌
    setStartDate("");
    setEndDate("");
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
              <Button className='ms-5' variant='secondary' onClick={handlePeriodSearch}>기간검색</Button>
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
                    <Dropdown.Item id="me_title" onClick={handleChange}>제목</Dropdown.Item>
                    <Dropdown.Item id="me_content" onClick={handleChange}>내용</Dropdown.Item>
                    <Dropdown.Item id="me_writer"  onClick={handleChange}>이름</Dropdown.Item>
                  </DropdownButton>
                  <Form.Control aria-label="Text input with dropdown button" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
          </InputGroup>
          <Button className='ms-3' variant="secondary" onClick={handleKeywordSearch}>검색</Button>
          <Button className='ms-3' variant="secondary" onClick={handleKeywordSearch}>전체검색</Button>
      </div>
    </>
  )
}

export default MessageListHeader