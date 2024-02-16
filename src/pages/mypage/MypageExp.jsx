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

const MypageExp = () => {
  return (
    <>
    <h1>경력</h1>
    <Table dataSource={data} pagination={false}>
        <Column title="회사명" dataIndex="firstName" key="firstName" />
        <Column title="부서" dataIndex="age" key="age" />
        <Column title="직급" dataIndex="address" key="address" />
        <Column title="담당업무" dataIndex="address" key="address" />
        <Column title="재직기간" dataIndex="address" key="address" />
  </Table>
    </>
  )
}

export default MypageExp