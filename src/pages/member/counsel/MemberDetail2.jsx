import React from 'react'
import {Col, Image, Row, Stack, Table } from 'react-bootstrap'
import Counsel from './Counsel'

const MemberDetail2 = (selectedUser) => {
  const setUser=selectedUser.user
//   if (!selectedUser.user) {
//     return null; // 선택된 사용자가 없으면 아무것도 렌더링하지 않음
//   }

  return (
    
      <div className="user-detail">
        <Row>
         <Col><h2>&nbsp;&nbsp;&nbsp;▶︎&nbsp;이용자상담일지</h2></Col>
      </Row>
      <Stack direction="horizontal" gap={5}>
      <Image 
        width={170}
        height={180}
        alt="171x180" src="logo192.png" rounded 
        className='col-3 '/>
         <Col>
              <Table className='shadow col-6' >
                <tbody>
                  <tr>
                    <th><strong>이름</strong></th>
                     <td  className='px-2'> 나노인</td>
                    <th><strong>나이</strong></th>
                     <td  className='px-2'> 101세</td>
                  </tr>
                  <tr>
                    <th><strong>생년월일</strong></th>
                     <td  className='px-2'> 1923-04-05</td>
                     <th><strong>성별</strong></th>
                     <td  className='px-2'> 남성</td>
                  </tr>
                  <tr>
                    <th style={{width: '23%'}}><strong>등록일</strong></th>
                     <td style={{width: '30%'}} className='px-2'>2024-02-07</td>
                     <th style={{width: '21%'}}><strong>전화번호</strong></th>
                     <td style={{width: '35%'}} className='px-2'> 010-1111-1111</td>
                  </tr>
                  <tr>
                    <th><strong>현황</strong></th>
                     <td className='px-2'> 상담중</td>
                    <th><strong>담당자</strong></th>
                     <td  className='px-2'> 복지사</td>
                  </tr>
              </tbody>
              </Table>
         </Col>
      </Stack>
      <Counsel/>
    </div>
  )
}

export default MemberDetail2