import React from 'react'
import { Button, Col, Image, Row, Stack, Table } from 'react-bootstrap'

const MemberDetail = (selectedUser) => {
  const setUser=selectedUser.user
//   if (!selectedUser.user) {
//     return null; // 선택된 사용자가 없으면 아무것도 렌더링하지 않음
//   }

  return (
    <div className="container">
      <div className="user-detail">
        <Row>
         <Col><h2>&nbsp;&nbsp;&nbsp;▶︎&nbsp;이용자상세정보</h2></Col>
         <Col>
         <Stack direction="horizontal" gap={2}>
            <Button variant="success" className="p-2 ms-auto">추가</Button>
 
            <Button variant="primary" className="p-2 ">수정</Button>
           
            <Button variant="danger" className="p-2">삭제</Button>
         </Stack>
         </Col>
        </Row>
      <Stack direction="horizontal" gap={3}>
      <Image width={210}
        height={180}
        alt="171x180" src="logo192.png" rounded 
        className='p-2 ms-auto'/>
              <Table className='shadow  w-100 ms-auto' >
                <tbody>
                  <tr>
                    <th><strong>이름:</strong></th>
                     <td style={{width: '20%'}} className='px-2'> 나노인</td>
                    <th><strong>이용자번호:</strong></th>
                     <td style={{width: '20%'}} className='px-2'> 0000001</td>
                  </tr>
                  <tr>
                    <th><strong>생년월일:</strong></th>
                     <td style={{width: '20%'}} className='px-2'> 1923-04-05</td>
                    <th><strong>나이:</strong></th>
                     <td style={{width: '20%'}} className='px-2'> 101세</td>
                  </tr>
                  <tr>
                    <th><strong>등록일:</strong></th>
                     <td style={{width: '35%'}} className='px-2'>2024-02-07</td>
                    <th><strong>성별:</strong></th>
                     <td style={{width: '20%'}} className='px-2'> 남성</td>
                  </tr>
                  <tr>
                    <th><strong>주소:</strong></th>
                     <td style={{width: '20%'}} className='px-2'> 서울특별시 이촌로54길 14 102동 201호</td>
                    <th><strong>전화번호:</strong></th>
                     <td style={{width: '20%'}} className='px-2'> 010-1111-1111</td>
                  </tr>
                  <tr>
                    <th><strong>현황:</strong></th>
                     <td style={{width: '35%'}} className='px-2'> 상담중</td>
                    <th><strong>담당자:</strong></th>
                     <td style={{width: '1%'}} className='px-2'> 복지사</td>
                  </tr>
              </tbody>
              </Table>
      </Stack>
    </div>
  </div>
  )
}

export default MemberDetail