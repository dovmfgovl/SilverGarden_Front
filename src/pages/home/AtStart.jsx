import React from 'react'
import { useSelector } from 'react-redux'
import { atInsertDB } from '../../services/api/attendanceApi';
import styles from './home.module.css';

const AtStart = ({empAtList}) => {
  const E_NO = useSelector(state => state.userInfoSlice.e_no); // Redux store에서 e_no 가져오기
  console.log(E_NO);

  const handleInsert = async () => {
    console.log("출근버튼 클릭");
    try {
        const newData = {
          E_NO: E_NO, 
          AT_STATUS: '결근', 
          REG_ID: E_NO 
        };
        const response = await atInsertDB(newData);
        console.log(response);
        await empAtList();
    } catch (error) {
      console.log('출근 버튼 클릭 에러: ', error);
    }

  }
  return (
    <>
    <div>
      <button className={styles.atStart} onClick={handleInsert}>
        출근
      </button>
    </div>
    </>
  )
}

export default AtStart