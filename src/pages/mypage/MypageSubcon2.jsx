import React, { useEffect, useState } from 'react';
import { Col, ConfigProvider, Row, Statistic, Table } from 'antd';
import { callMypage } from '../../services/api/mypageApi'; // mypage 데이터를 가져오는 API 호출
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from 'antd';
import moment from 'moment';
import styles from './mypage.module.css'

const MypageSubcon2 = () => {
  const [mypageDate, setMypageDate] = useState([]); // mypage 데이터 상태
  const selectedEmployee = useSelector(state => state.chooseEmp.selectedEmployee) || {}; // 선택된 직원 정보
  const dispatch = useDispatch(); // Redux dispatch 함수
  const [selectedMonth, setSelectedMonth] = useState(null); // 선택된 달 상태 변경

  const firstMonthOfYear = moment().startOf('year').format('YYYY-MM');
  const yourMonth= moment().format('YYYYMM')

  // DatePicker 컴포넌트의 value 속성에서 사용할 변수 정의
  const defaultDate = selectedMonth ? moment(selectedMonth) : moment(yourMonth);

  // 선택 가능한 날짜 범위(disabledDate)를 제어하는 함수
  const disabledDate = current => {
    const currentMonth = moment(current).format('YYYYMM');
    return currentMonth < firstMonthOfYear || currentMonth > yourMonth;
  };

  useEffect(() => {
    // 선택된 달이 변경될 때마다 API 호출
    const callMy = async () => {
      const response = await callMypage(); // mypage 데이터를 가져오는 API 호출
      setMypageDate(response.data); // mypage 데이터 상태 업데이트
    };
    callMy();
  }, [selectedMonth]);

  // 선택된 달 범위 내의 데이터 필터링
  const filteredDataInRange = mypageDate.filter(item => {
    const itemMonth = item.AT_DATE.substring(0, 7); // 날짜에서 연도와 월 부분 추출
    return (
      item.E_NO === selectedEmployee.E_NO && // 직원 ID가 일치하는지 확인
      (selectedMonth ? itemMonth === selectedMonth : true) // 선택된 달이 없으면 모든 데이터 출력
    );
  });

  // 선택된 달 범위 내에서의 정상 출근 횟수 계산
  const attendanceCountInRange = filteredDataInRange.filter(item => item.AT_STATUS === '정상출근').length;

  // 선택된 달 범위 내에서의 결근 횟수 계산
  const absenceCountInRange = filteredDataInRange.filter(item => item.AT_STATUS === '결근').length;

  // 선택된 달 범위 내에서의 조퇴 횟수 계산
  const earlyLeaveCountInRange = filteredDataInRange.filter(item => item.AT_STATUS === '조퇴').length;

  const handleMonthChange = async (date, dateString) => {
    // 선택된 달 문자열로 업데이트
    setSelectedMonth(dateString);
  };

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
      <Row gutter={17} align='middle'>
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
          <DatePicker
            picker='month'
            onChange={handleMonthChange}
            disabledDate={disabledDate} // 선택 가능한 날짜 범위 설정
            value={defaultDate}
          />
        </Col>
      </Row>
      <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            borderColor: '#d9d9d9', //hex색표 
                                },
                            },
                        }}
            >
      <Table
        className={styles.myTable}
        columns={columns}
        dataSource={filteredDataInRange}
        size="small"
        bordered
        pagination={{ position: ['bottomCenter'] }}
      />
            </ConfigProvider>
    </>
  );
};

export default MypageSubcon2;
