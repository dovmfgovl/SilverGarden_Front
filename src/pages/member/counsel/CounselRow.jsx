import React from 'react';
import CounselDetail from './CounselDetail';
import { Table } from 'react-bootstrap';


const CounselRow = () => {
  
  return (
    <>
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
            <tr className='' style={{ cursor: 'pointer' }} >
              <td className='text-center'><h6 className="pe-auto"></h6></td>
              <td className='text-center'> <h6 className="pe-auto"></h6></td>
              <td className='text-center'> <h6 className="pe-auto"></h6></td>
              <td className='text-center'> <h6 className="pe-auto"></h6></td>
              <CounselDetail  />
            </tr>
          </tbody>
    </Table>
    </>
  );
}

export default CounselRow;