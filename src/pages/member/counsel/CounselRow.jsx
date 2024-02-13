import React from 'react';
import CounselDetail from './CounselDetail';
import { Table } from 'react-bootstrap';


const CounselRow = ({selectedMember,counselList}) => {
  
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
            {counselList.map((counsel,index)=>(
            <tr key={counsel.COUNSEL_NO}className='' style={{ cursor: 'pointer' }} >
              <td className='text-center'><h6 className="pe-auto">{counsel.COUNSEL_DATE}</h6></td>
              <td className='text-center'> <h6 className="pe-auto">{counsel.COUNSEL_TIME}</h6></td>
              <td className='text-center'> <h6 className="pe-auto">{counsel.COUNSEL_HOW}</h6></td>
              <td className='text-center'> <h6 className="pe-auto"></h6>{counsel.CLIENT_ID}</td>
              <CounselDetail  />
            </tr>
            ))}
          </tbody>
    </Table>
    </>
  );
}

export default CounselRow;