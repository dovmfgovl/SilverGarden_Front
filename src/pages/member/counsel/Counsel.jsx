import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import CounselRow from './CounselRow';


const Counsel = (props) => {


  return (
    <>
    <div>
    <Table striped bordered hover>
          <thead style={{background:'hsl(193, 52%, 88%)'}} >
            <tr>
              <th className='text-center'>상담일시</th>
              <th className='text-center'>상담시간</th>
              <th className='text-center'>상담방법</th>
              <th className='text-center'>대상자번호</th>
              <th className='text-center'>상세보기</th>
            </tr>
          </thead>
          {/* 목록 내용 */}
          <tbody>
                <CounselRow />
          </tbody>
        </Table>
    </div>
    </>
  )
}

export default Counsel