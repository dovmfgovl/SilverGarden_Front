import React, { useEffect, useState } from 'react'
import { atListDB } from '../../services/api/attendanceApi';
import AtCalendar from './AtCalendar';

const Attendance = () => {
  const [atList, setAtList] = useState([]);

  const getAtList = async () => {
    try {
      const response = await atListDB();
      const data = response.data;
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
        <AtCalendar />
      </div>
    </>
  )
}

export default Attendance;