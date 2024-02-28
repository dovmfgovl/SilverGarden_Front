import React, { useEffect, useState } from 'react'
import { Col, Row, Stack, Table } from 'react-bootstrap'
import styles from '../member.module.css';
import CarRow from './CarRow';
import CarDetail from './CarDetail';
import CarInsert from './CarInsert';
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
    <div className={styles.InnerMemberLayout}>
      <div className={styles.leftMemberLayout}>
    <Row>
    <Col><h2>차량목록</h2></Col>
    </Row>
    <Stack >
    <div className=" col border border-white border-2">
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
      </div>
  <CarDetail />
</div>
    
    </>
  )
}

export default CarInfo