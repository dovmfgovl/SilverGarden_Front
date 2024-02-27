import React, { useEffect, useState } from 'react'
import { Col, Row, Stack, Table } from 'react-bootstrap'
import styles from '../member.module.css';
import CarRow from './CarRow';
import CarDetail from './CarDetail';
import CarInsert from './CarInsert';
import { getShuttleList } from '../../../services/api/carApi';
import { useDispatch, useSelector } from 'react-redux';
import { getCarList } from '../../../redux/carSlice';


const CarInfo = () => {
  const dispatch = useDispatch()
  const carList=useSelector((state)=>state.carSlice.value);
  const carDetail=useSelector((state)=>state.carSlice.selcetedCar) ||{};
  

  useEffect(()=>{
   dispatch(getCarList())
  },[dispatch])


  return (
    <>
    <Row>
    <Col><h2>차량목록</h2></Col>
    <Col><h2>차량상세정보</h2> </Col>
    </Row>
    <div className={styles.InnerMemberLayout}>
    <Stack >
    <div className="col border border-white border-2" >
    <Table striped bordered hover>
        <thead style={{ background: 'hsl(193, 52%, 88%)' }}>
            <tr>
                <th className='text-center'>차량명</th>
                <th className='text-center'>차량번호</th>
                <th className='text-center'>운전자명</th>
            </tr>
        </thead>
        <tbody>
          {carList.map(car =>(
              <CarRow key={car.SHUTTLE_NO} car={car}/>
          ))}
        </tbody>
    </Table>
    <CarInsert />
</div>
    </Stack>
<div className={styles.rightMemberLayout1}>
  <CarDetail />
</div>
    </div>
    </>
  )
}

export default CarInfo