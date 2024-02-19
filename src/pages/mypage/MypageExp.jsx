import React from 'react'
import {  Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const MypageExp = () => {
  const selectedEmployee = useSelector(state => state.empInfos.selectedEmployee) || {};
    const dispatch = useDispatch();
  
  const { Column } = Table;
  const data = [
    {
      exp_name: selectedEmployee.EXP_NAME,
      exp_dept: selectedEmployee.EXP_DEPT,
      exp_rank: selectedEmployee.EXP_RANK,
      exp_duty: selectedEmployee.EXP_DUTY,
      exp_period:selectedEmployee.EXP_PERIOD
    },
  ];
  return (
    <>
    <h1>경력</h1>
    <Table dataSource={data} pagination={false}>
        <Column title="회사명" dataIndex="exp_name" key="firstName" />
        <Column title="부서" dataIndex="exp_dept" key="age" />
        <Column title="직급" dataIndex="exp_rank" key="address" />
        <Column title="담당업무" dataIndex="exp_duty" key="address" />
        <Column title="재직기간" dataIndex="exp_period" key="address" />
  </Table>
    </>
  )
}

export default MypageExp