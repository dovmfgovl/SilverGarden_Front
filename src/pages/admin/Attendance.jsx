import React, { useEffect, useState } from 'react'
import { atListDB } from '../../services/api/attendanceApi';
import AtStart from './AtStart';

const Attendance = () => {
  const [atList, setAtList] = useState([]);

  const getAtList = async () => {
    try {
      const response = await atListDB();
      const data = response.date;
      console.log(data);
      setAtList(data || []); // data가 존재하지 않으면 빈 배열을 설정
    } catch (error) {
      console.log(error);
      setAtList([]); // 오류 발생 시 빈 배열로 설정
    }
  }

  useEffect(() => {
    getAtList()
  }, [])

  return (
    <>
      <div>
        {/* {atList && atList.map(item => (
          <AtStart key={item.e_no} e_no={item.e_no} /> // e_no를 AtStart 컴포넌트에 전달
        ))} */}
        <AtStart />
      </div>
    </>
  )
}

export default Attendance;