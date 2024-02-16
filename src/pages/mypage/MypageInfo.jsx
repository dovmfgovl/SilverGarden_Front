import React from 'react'
import { Image, Stack, Table } from 'react-bootstrap'

const MypageInfo = () => {
  return (
    <>
    <Stack direction="horizontal" gap={3}>
<Image width={210} height={180}
  alt="171x180" src="logo192.png" rounded 
  className='p-2 ms-auto'/>
        <Table className='shadow  w-100 ms-auto' >
          <tbody>
            <tr>
              <th><strong>이름:</strong></th>
              <td style={{width: '20%'}} className='px-2'></td>
              <th><strong>성별:</strong></th>
               <td style={{width: '20%'}} className='px-2'> </td>
            </tr>
            <tr>
              <th><strong>생년월일:</strong></th>
               <td style={{width: '20%'}} className='px-2'> </td>
              <th><strong>사원번호:</strong></th>
               <td style={{width: '20%'}} className='px-2'> </td>
            </tr>
            <tr>
              <th><strong>입사일:</strong></th>
               <td style={{width: '35%'}} className='px-2'></td>
              <th><strong>퇴사일:</strong></th>
               <td style={{width: '20%'}} className='px-2'></td>
            </tr>
            <tr>
            <th><strong>연락처:</strong></th>
               <td style={{width: '1%'}} className='px-2'> </td>
              <th><strong>이메일:</strong></th>
               <td style={{width: '20%'}} className='px-2'></td>
            </tr>
            <tr>
               <th><strong>주소:</strong></th>
               <td style={{width: '20%'}} className='px-2'> </td>
               <th><strong>부서:</strong></th>
               <td style={{width: '20%'}} className='px-2'> </td>
            </tr>
            <tr>
               <th><strong>권한:</strong></th>
               <td style={{width: '20%'}} className='px-2'> </td>
               <th><strong>현황:</strong></th>
               <td style={{width: '20%'}} className='px-2'> </td>
            </tr>
            <tr>
               <th><strong>담당직종:</strong></th>
               <td style={{width: '20%'}} className='px-2'> </td>
               <th><strong>직급:</strong></th>
               <td style={{width: '20%'}} className='px-2'> </td>
            </tr>
        </tbody>
        </Table>
</Stack>
</>
  )
}

export default MypageInfo