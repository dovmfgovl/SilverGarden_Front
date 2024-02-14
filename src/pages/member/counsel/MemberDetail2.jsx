import React from 'react'
import {Col, Image, Row, Stack, Table } from 'react-bootstrap'
import Counsel from './Counsel'

const MemberDetail2 = ({selectedMember}) => {

  return (
    <div className="container">
      <div className="user-detail">
        <Col>
          <h2>&nbsp;&nbsp;&nbsp;▶︎&nbsp;이용자상담정보</h2>
        </Col>
        <Col>
          <Stack direction="horizontal" gap={2}>
          </Stack>
        </Col>
        {selectedMember ? (
          <MemberDetailPage selectedMember={selectedMember} />
        ) : (
          <p>선택된 회원이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export const MemberDetailPage = ({selectedMember}) => {
  return (
    <>
          <Stack direction="horizontal" gap={3}>
      <Image width={210}
        height={180}
        alt="171x180" src="logo192.png" rounded 
        className='p-2 ms-auto'/>
              <Table className='shadow  w-100 ms-auto' >
                <tbody>
                  <tr>
                    <th><strong>이름:</strong></th>
                    <td style={{width: '20%'}} className='px-2'>{selectedMember ? selectedMember.CLIENT_NAME : ''}</td>
                    <th><strong>이용자번호:</strong></th>
                     <td style={{width: '20%'}} className='px-2'> {selectedMember ? selectedMember.CLIENT_ID : ''}</td>
                  </tr>
                  <tr>
                    <th><strong>생년월일:</strong></th>
                     <td style={{width: '20%'}} className='px-2'> {selectedMember ? selectedMember.CLIENT_BIRTH : ''}</td>
                    <th><strong>나이:</strong></th>
                     <td style={{width: '20%'}} className='px-2'> </td>
                  </tr>
                  <tr>
                    <th><strong>등록일:</strong></th>
                     <td style={{width: '35%'}} className='px-2'>{selectedMember ? selectedMember.REG_DATE : ''}</td>
                    <th><strong>성별:</strong></th>
                     <td style={{width: '20%'}} className='px-2'>{selectedMember ? selectedMember.CLIENT_GENDER : ''}</td>
                  </tr>
                  <tr>
                  <th><strong>담당자:</strong></th>
                     <td style={{width: '1%'}} className='px-2'> {selectedMember ? selectedMember.CLIENT_MANAGER : ''}</td>
                    <th><strong>전화번호:</strong></th>
                     <td style={{width: '20%'}} className='px-2'>{selectedMember ? selectedMember.CLIENT_TEL : ''}</td>
                  </tr>
                  <tr>
                     <th><strong>주소:</strong></th>
                     <td style={{width: '20%'}} className='px-2'> {selectedMember ? selectedMember.CLIENT_ADDRESS : ''}</td>
                  </tr>
              </tbody>
              </Table>
      </Stack>
      <Counsel selectedMember={selectedMember}/>
    </>
  )
}

export default MemberDetail2