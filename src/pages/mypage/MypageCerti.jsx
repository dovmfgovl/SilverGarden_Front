import React from 'react'
import {  Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
const { Column } = Table;

const MypageCerti = () => {  
  const selectedEmployee = useSelector(state => state.empInfos.selectedEmployee) || {};
  const dispatch = useDispatch();
  const data = [
    {
      certi_cate :selectedEmployee.CERTI_CATE ,
      certi_code :selectedEmployee.CERTI_CODE ,
      certi_issuer : selectedEmployee.CERTI_ISSUER, 
      certi_acquire : selectedEmployee.CERTI_ACQUIRE 
    },
  ];
  return (
    <>
    <h1>자격증</h1>
    <Table dataSource={data} pagination={false}>
        <Column title="자격종류" dataIndex="certi_cate" key="firstName" />
        <Column title="자격증번호" dataIndex="certi_code" key="age" />
        <Column title="발급기관명" dataIndex="certi_issuer" key="address" />
        <Column title="취득일자" dataIndex="certi_acquire" key="address" />
  </Table>
    </>
  )
}

export default MypageCerti