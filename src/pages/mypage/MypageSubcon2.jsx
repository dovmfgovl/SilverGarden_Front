import React, { useEffect, useState } from 'react';
import { Col, Row,  Statistic, Table } from 'antd';
import { callMypage } from '../../services/api/mypageApi';
import { useDispatch, useSelector } from 'react-redux';


const MypageSubcon2 = () => {

  const [mypageDate, setMypageDate] = useState([]);
  const selectedEmployee = useSelector(state => state.empInfos.selectedEmployee) || {};
  const dispatch = useDispatch();


  const callMy = async () => {
    const response = await callMypage();
    console.log(response.data);
    setMypageDate(response.data);
  }

  useEffect(() => {
    callMy();
  }, [])

  const whoDate = mypageDate.find(my => my.E_NO === selectedEmployee.E_NO);
 // redux에서 정해진 직원의 번호와 근태표의 직원번호가 일치하는지 찾으라

 //만일 whoDate가 충족하는 경우라면 해당 근태표의 값을 출력 
  const data = whoDate ? [{
    at_Date: whoDate.AT_DATE,
    startTime: whoDate.AT_START,
    EndTime: whoDate.AT_END,
    status: whoDate.AT_STATUS,
  }] : [];


  const columns = [
    {
      title: '일자',
      dataIndex: 'at_Date',
      key: 'at_Date',
      align: 'center',
      format: 'YYYY-MM-DD',
    },
    {
      title: '출근시각',
      dataIndex: 'startTime',
      key: 'startTime',
      align: 'center',
    },
    {
      title: '퇴근시각',
      dataIndex: 'EndTime',
      key: 'EndTime',
      align: 'center',
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
    },
  ];

  return (
    <>
      <Row gutter={17}>
        <Col span={6}>
          <Statistic title="이번달 출근일자" value={22} valueStyle={{color: '#3f8600', }} />
        </Col> 
        <Col span={6}>
          <Statistic title="결근일자" value={0} />
        </Col> 
        <Col span={6}>
          <Statistic title="조퇴 사용횟수" value={3} />
        </Col> 
        <Col span={6}>
          <Statistic title="휴가 사용횟수" value={12} />
        </Col> 
      </Row>

      <Table
        columns={columns}
        dataSource={data}
        size="small"
        bordered 
        pagination={{position:['bottomCenter']}}
      />

    </>
  );
}


export default MypageSubcon2;
