import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { atUpdateDB } from '../../services/api/attendanceApi';
import styles from './home.module.css';

const AtEnd = ({empAtList}) => {
  const E_NO = useSelector(state => state.userInfoSlice.e_no);
  console.log(E_NO);

  const today = new Date();
  const [date, setDate] = useState([today.getFullYear(), `0${today.getMonth() + 1}`.slice(-2), `0${today.getDate()}`.slice(-2)].join("-"));

  const handleUpdate = async () => {
    console.log("퇴근버튼 클릭");
    try {
      const updateData = {
        E_NO: E_NO,
        AT_DATE: date,
        AT_STATUS: '',
        MOD_ID: E_NO
      };
      const response = await atUpdateDB(updateData);
      console.log(response);      
      await empAtList();
    } catch (error) {
      console.log("퇴근update 에러: ", error);
    }
  }

  return (
    <>
    <div>
      <button className={styles.atEnd} onClick={handleUpdate}>
        퇴근
      </button>
    </div>
    </>
  )
}

export default AtEnd
