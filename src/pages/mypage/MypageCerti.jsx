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

const MypageCerti = () => {
  return (
    <>
    <h1>자격증</h1>
    <Table dataSource={data} pagination={false}>
        <Column title="자격종류" dataIndex="firstName" key="firstName" />
        <Column title="자격증번호" dataIndex="age" key="age" />
        <Column title="발급기관명" dataIndex="address" key="address" />
        <Column title="취득일자" dataIndex="address" key="address" />
  </Table>
    </>
  )
}

export default MypageCerti