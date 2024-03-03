import Title from 'antd/es/typography/Title';
import { Col, ConfigProvider, DatePicker, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from '../member.module.css';

const CarStatisticRecord = ({calList}) => {
  const [numOfRecords, setNumOfRecords] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYYMM'));
  const [filteredDataInRange, setFilteredDataInRange] = useState([]);
  const firstMonthOfYear = moment().startOf('year').format('YYYY-MM');
  const yourMonth= moment().format('YYYYMM')
  const defaultDate = selectedMonth ? moment(selectedMonth) : moment(yourMonth);


  const data = calList.map(car => ({
    serv_date: car.SERV_START.split('T')[0].substr(0,11),
    serv_user: car.SERV_USER,       
    serv_title: car.SERV_TITLE, 
    serv_info: car.SERV_INFO, 
    serv_start: car.SERV_START.split('T')[1].substr(0, 5), 
    serv_end: car.SERV_END.split('T')[1].substr(0, 5),  
  }));
  // 선택 가능한 날짜 범위(disabledDate)를 제어하는 함수
  const disabledDate = current => {
    const currentMonth = moment(current).format('YYYYMM');
    // 선택된 달이 없으면 모든 날짜를 활성화
    if (!selectedMonth) return false;
    // 선택된 달이 있는 경우 해당 달에 해당하는 데이터만 필터링
    return currentMonth < firstMonthOfYear || currentMonth > yourMonth;
  };

  useEffect(() => {
    setNumOfRecords(calList.length);
    
    // 새로운 데이터 필터링
    const filteredData = data.filter(item => {
      const itemMonth = moment(item.serv_date).format('YYYYMM');
      return moment(selectedMonth).isSame(itemMonth, 'month');
    });
    setFilteredDataInRange(filteredData);
  }, [calList, selectedMonth]);

  const handleMonthChange = async (date,dateString) => {
    setSelectedMonth(dateString);// dateString에 선택한 월 정보가 포함되어 있음
  };//해당 월 정보만을 받아서 상태를 업데이트하는 것

  return (
    <>
        <Col span={24} align='middle'>
          <DatePicker
            picker='month'
            onChange={handleMonthChange}
            disabledDate={disabledDate} // 선택 가능한 날짜 범위 설정
            value={defaultDate}
          />
        </Col>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderColor: '#d9d9d9',
            },
          },
        }}
      >
        <Table className={styles.memberTable} dataSource={filteredDataInRange} bordered pagination={{position:['bottomCenter'],size:['small'],defaultPageSize:[10]}}>
          <Table.Column title="이용날짜" dataIndex="serv_date" key="SERV_DATE" align='center'/>
          <Table.Column title="이름" dataIndex="serv_user" key="SERV_USER" align='center'/>
          <Table.Column title="이용목적" dataIndex="serv_title" key="SERV_TITLE" align='center'/>
          <Table.Column title="이용내용" dataIndex="serv_info" key="SERV_INFO" align='center'/>
          <Table.Column title="시작시간" dataIndex="serv_start" key="SERV_START" align='center'/>
          <Table.Column title="종료시간" dataIndex="serv_end" key="SERV_END" align='center'/>
        </Table>
        <Title level={5}>전체: {numOfRecords}건</Title> 
      </ConfigProvider>
    </>
  )
}

export default CarStatisticRecord;
