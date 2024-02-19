import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import userInfoSlice from '../../redux/userInfoSlice';
import { atInsertDB } from '../../services/api/attendanceApi';

const AtStart = () => {
  const dispatch = useDispatch();
  const E_NO = useSelector(state => state.userInfoSlice.e_no); // Redux store에서 e_no 가져오기
  console.log(E_NO);

  const today = new Date();
  const [date, setDate] = useState([today.getFullYear(), `0${today.getMonth() + 1}`.slice(-2), `0${today.getDate()}`.slice(-2)].join("-"));
  const [start, setStart] = useState([today.getFullYear(), `0${today.getMonth() + 1}`.slice(-2), `0${today.getDate()}`.slice(-2)].join("-") 
                                      + ` ${`0${today.getHours()}`.slice(-2)}:${`0${today.getMinutes()}`.slice(-2)}:${`0${today.getSeconds()}`.slice(-2)}`);

  /* const getAtList = useSelector(state => state.userInfoSlice); */

 /*  const [newData, setData] = useState({
    AT_DATE: '',
    E_NO: '',
    AT_START: '',
    AT_STATUS: '',
    REG_DATE: '',
    REG_ID: ''
  }) */

  const handleInsert = async () => {
    console.log("출근버튼 클릭");
    try {
        const newData = {
          AT_DATE: date, 
          E_NO: E_NO, 
          AT_START: start, 
          AT_STATUS: '결근', 
          REG_DATE: start, 
          REG_ID: E_NO 
        };
        const response = await atInsertDB(newData);
        console.log(response);
    } catch (error) {
      console.log('출근 버튼 클릭 에러: ', error);
    }

  }
  return (
    <div>
      <Button variant="outline-success" id="btn_atStart" onClick={handleInsert}>
        출근
      </Button>
    </div>
  )
}

export default AtStart
