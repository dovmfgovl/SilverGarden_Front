import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { atUpdateDB } from '../../services/api/attendanceApi';

const AtEnd = () => {
  const E_NO = useSelector(state => state.userInfoSlice.e_no);
  console.log(E_NO);

  const today = new Date();
  const [date, setDate] = useState([today.getFullYear(), `0${today.getMonth() + 1}`.slice(-2), `0${today.getDate()}`.slice(-2)].join("-"));
  const [end, setEnd] = useState([today.getFullYear(), `0${today.getMonth() + 1}`.slice(-2), `0${today.getDate()}`.slice(-2)].join("-") 
                                      + ` ${`0${today.getHours()}`.slice(-2)}:${`0${today.getMinutes()}`.slice(-2)}:${`0${today.getSeconds()}`.slice(-2)}`);

  const handleUpdate = async () => {
    console.log("퇴근버튼 클릭");
    try {
      const updateData = {
        E_NO: E_NO,
        AT_DATE: date,
        AT_END: end,
        AT_STATUS: '',
        MOD_DATE: end,
        MOD_ID: E_NO
      };
      const response = await atUpdateDB(updateData);
      console.log(response);      
    } catch (error) {
      console.log("퇴근update 에러: ", error);
    }

  }

  return (
    <div>
      <Button variant="outline-secondary" id="btn_atStart" onClick={handleUpdate}>
        퇴근
      </Button>
    </div>
  )
}

export default AtEnd
