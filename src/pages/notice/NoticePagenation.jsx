import React from 'react'
import { Pagination } from 'react-bootstrap';

const NoticePagenation = () => {

  return (
    <Pagination className="mb-0">
    <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  )
}

export default NoticePagenation