import React, { useEffect, useState } from 'react';
import CarCalendarLogic from './CarCalendarLogic';
import { Tab, Tabs } from 'react-bootstrap';
import CarStatisticAll from './CarStatisticAll';
import CarStatisticPass from './CarStatisticPass';
import CarStatisticRecord from './CarStatisticRecord';

const CarStatistic = ({selectedCar}) => {
  const [numOfRecords, setNumOfRecords] = useState(0); // 추가: 출력된 정보의 개수를 저장하기 위한 상태
  const [calList, setCalList] = useState([]);
  const [filteredCalList, setFilteredCalList] = useState([]);

  const getCalList = async () => {
    const url = `member/shuttleCalList`;
    const res = await CarCalendarLogic.listDB(url);
    setCalList(res);
  }

  useEffect(() => {
    getCalList();
  }, []);
  useEffect(() => {
    setNumOfRecords(calList.length); // calList의 길이를 numOfRecords로 설정
}, [calList]);
  useEffect(() => {
    if (selectedCar) {
      const filteredList = calList.filter(item => item.SERV_CAR_NO === selectedCar.SHUTTLE_NO);
      setFilteredCalList(filteredList);
    } else {
      setFilteredCalList([]);
    }
  }, [selectedCar, calList]);

  return (
    <>
      <h5>운행기록</h5>
      {selectedCar && filteredCalList.length > 0 && (
        <Tabs
          defaultActiveKey="all"
          transition={false}
          className="mb-3"
        >
          <Tab eventKey="all" title="전체">
            <CarStatisticAll calList={filteredCalList} />
          </Tab>
          <Tab eventKey="passenger" title="이용자별 운행기록">
            <CarStatisticPass calList={filteredCalList}/>
          </Tab>
          <Tab eventKey="drive" title="날짜별 운행기록" >
            <CarStatisticRecord calList={filteredCalList} />
          </Tab>
        </Tabs>
      )}
    </>
  );
}

export default CarStatistic;
