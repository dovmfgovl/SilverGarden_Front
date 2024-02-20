import React, { useEffect, useState } from 'react';
import { Col, Row, Statistic, Table } from 'antd';
import { callMypage } from '../../services/api/mypageApi'; // mypage 데이터를 가져오는 API 호출
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

const MypageSubcon2 = () => {
  const [mypageDate, setMypageDate] = useState([]); // mypage 데이터 상태
  const selectedEmployee = useSelector(state => state.empInfos.selectedEmployee) || {}; // 선택된 직원 정보
  const dispatch = useDispatch(); // Redux dispatch 함수
  const [selectedDates, setSelectedDates] = useState([null, null]); // 선택된 날짜 범위 상태

   // 선택된 날짜 범위 내에 날짜가 속하는지 확인하는 함수
   const isDateInRange = (date, startDate, endDate) => {
    return date >= startDate && date <= endDate;
  };

  const handleDateChange = (dates, dateStrings) => {
    // 새로운 선택된 날짜 범위로 selectedDates 상태를 업데이트
    setSelectedDates(dates);

    // 선택된 날짜 문자열을 콘솔에 로그로 출력
    console.log('Selected dates:', dateStrings);
  };

  const callMy = async () => {
    const response = await callMypage(); // mypage 데이터를 가져오는 API 호출
    setMypageDate(response.data); // mypage 데이터 상태 업데이트
  };

  useEffect(() => {
    callMy(); // 컴포넌트가 마운트될 때 mypage 데이터 가져오기
  }, []);

  // 선택된 날짜 범위와 직원 ID에 따라 데이터를 필터링
  const filteredDataInRange = mypageDate.filter(item => {
    const itemDate = new Date(item.AT_DATE); // 날짜 문자열을 JavaScript Date 객체로 변환
    const startDate = selectedDates[0]; // selectedDates에서 시작 날짜
    const endDate = selectedDates[1]; // selectedDates에서 종료 날짜
    return (
      item.E_NO === selectedEmployee.E_NO && // 직원 ID가 일치하는지 확인
      isDateInRange(itemDate, startDate, endDate) // 날짜가 선택된 범위 내에 있는지 확인
    );
  });

  // 선택된 날짜 범위 내에서의 정상 출근 횟수 계산
  const attendanceCountInRange = filteredDataInRange.filter(item => item.AT_STATUS === '정상출근').length;

  // 선택된 날짜 범위 내에서의 결근 횟수 계산
  const absenceCountInRange = filteredDataInRange.filter(item => item.AT_STATUS === '결근').length;

  // 선택된 날짜 범위 내에서의 조퇴 횟수 계산
  const earlyLeaveCountInRange = filteredDataInRange.filter(item => item.AT_STATUS === '조퇴').length;

  const columns = [
    {
      title: '일자',
      dataIndex: 'AT_DATE',
      key: 'AT_DATE',
      align: 'center',
    },
    {
      title: '출근시각',
      dataIndex: 'AT_START',
      key: 'AT_START',
      align: 'center',
    },
    {
      title: '퇴근시각',
      dataIndex: 'AT_END',
      key: 'AT_END',
      align: 'center',
    },
    {
      title: '상태',
      dataIndex: 'AT_STATUS',
      key: 'AT_STATUS',
      align: 'center',
    },
  ];
  return (
    <>
      <Row gutter={17} align='middle' >
        <Col span={8} align='middle'>
          <Statistic title="정상출근횟수" value={attendanceCountInRange + '회'} valueStyle={{ color: '#3f8600' }} />
        </Col>
        <Col span={8} align='middle'>
          <Statistic title="결근횟수" value={absenceCountInRange + '회'} valueStyle={{ color: '#860000' }} />
        </Col>
        <Col span={8} align='middle'>
          <Statistic title="조퇴횟수" value={earlyLeaveCountInRange + '회'} valueStyle={{ color: '#909090' }} />
        </Col>
      </Row>
      <Row align='middle'>
        <Col span={24} align='middle'>
          <RangePicker
            onChange={handleDateChange}
            value={selectedDates}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredDataInRange}
        size="small"
        bordered
        pagination={{ position: ['bottomCenter'] }}
      />
    </>
  );
};

export default MypageSubcon2;
