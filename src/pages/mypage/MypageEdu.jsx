import React from 'react'
import {  Table } from 'antd';
const { Column } = Table;
const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const MypageEdu = () => {
  return (
    <>
    
    <h1>학력</h1>
    <Table dataSource={data} pagination={false}>
        <Column title="기간" dataIndex="firstName" key="firstName" />
        <Column title="학교명" dataIndex="age" key="age" />
        <Column title="학과명" dataIndex="address" key="address" />
        <Column title="졸업구본" dataIndex="address" key="address" />
  </Table>
    </>
  )
}

export default MypageEdu