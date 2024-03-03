import React, { useState, useEffect } from 'react';
import CounselDetail from './CounselDetail';
import styles from '../member.module.css';
import Title from 'antd/es/typography/Title';
import { ConfigProvider, Table, Col, DatePicker } from 'antd';
import moment from 'moment';

const CounselRow = ({ selectedMember, counselList,getCounsel }) => {
  const [numOfRecords, setNumOfRecords] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYYMM'));
  const [filteredCounselList, setFilteredCounselList] = useState([]);
  const firstMonthOfYear = moment().startOf('year').format('YYYY-MM');
  const yourMonth= moment().format('YYYYMM');
  const defaultDate = selectedMonth ? moment(selectedMonth) : moment(yourMonth);


  useEffect(() => {
    // selectedMember의 CLIENT_ID와 counselList의 CLIENT_ID가 일치하는 것만 필터링
    const filteredData = counselList.filter(counsel => counsel.CLIENT_ID === selectedMember.CLIENT_ID);
    setFilteredCounselList(filteredData);
  }, [selectedMember, counselList]);

  useEffect(() => {
    const filteredData = counselList.filter(counsel => {
      const itemMonth = moment(counsel.COUNSEL_DATE).format('YYYYMM');
      return counsel.CLIENT_ID === selectedMember.CLIENT_ID &&
             moment(selectedMonth).isSame(itemMonth, 'month');
      });
    setFilteredCounselList(filteredData);
    setNumOfRecords(filteredData.length);
  }, [counselList, selectedMember, selectedMonth]);
  

  const handleMonthChange = async (date,dateString) => {
    setSelectedMonth(dateString);
  };//해당 월 정보만을 받아서 상태를 업데이트하는 것

  const disabledDate = current => {
    const currentMonth = moment(current).format('YYYYMM');
    return currentMonth < firstMonthOfYear || currentMonth > yourMonth;
  };

  return (
    <>
      <Col span={24} align='middle'>
        <DatePicker
          picker='month'
          onChange={handleMonthChange}
          disabledDate={disabledDate}
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
        <Table
          className={styles.memberTable}
          dataSource={filteredCounselList}
          bordered
          pagination={{ position: ['bottomCenter'], size: ['small'], defaultPageSize: [5] }}
        >
          <Table.Column title="상담일시" dataIndex="COUNSEL_DATE" key="COUNSEL_DATE" align='center'/>
          <Table.Column title="상담시간" dataIndex="COUNSEL_TIME" key="COUNSEL_TIME" align='center'/>
          <Table.Column title="상담방법" dataIndex="COUNSEL_HOW" key="COUNSEL_HOW" align='center'/>
          <Table.Column
            title="상세보기"
            dataIndex=""
            key="detail"
            align='center'
            render={(record) => (
              <CounselDetail counsel={record} getCounsel={getCounsel} />
            )}
          />
        </Table>
        <Title level={5}>전체: {numOfRecords}건</Title> 
      </ConfigProvider>
    </>
  );
}

export default CounselRow;

