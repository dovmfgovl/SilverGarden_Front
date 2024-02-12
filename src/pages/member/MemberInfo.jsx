import {React, useEffect, useState} from 'react'
import styles from './member.module.css';
import { Button, Table } from 'react-bootstrap';
import MemberSearchbar from './MemberSearchbar';
import MemberRow from './MemberRow';
import MemberDetail from './MemberDetail';


const MemberInfo = ({Member}) => {
  const [selectedMember, setSelectedMember] = useState(null); // 선택된 사용자 정보 저장

  const handleRowClick = (userNum) => {
    const selected = Member.find((Member) => Member.CLIENT_ID === userNum);
    setSelectedMember(selected);
    console.log(selectedMember);
  };



  
  return (
    <>
    <div className={styles.InnerMemberLayout}>
        <div className={styles.leftMemberLayout}>
        <h2>▶︎&nbsp;이용자목록</h2>
          <MemberSearchbar/>
          <div>
   
    <div className="col border border-white border-2"  style={{background:'hsl(193, 6%, 88%)'}}>
      <Table striped bordered hover>
        <thead style={{background:'hsl(193, 52%, 88%)'}} >
          <tr>
            <th className='text-center'>#</th>
            <th className='text-center'>이름</th>
            <th className='text-center'>생년월일</th>
            <th className='text-center'>나이</th>
            <th className='text-center'>담당자</th>
          </tr>
        </thead>
        {/* 목록 내용 */}
        <tbody>
        {Member &&
             Member.map((member, memberId) => (
                <MemberRow key={memberId} member={member}  />
              ))}
        </tbody>
      </Table>
      <div>
      <Button variant="warning" >
            전체조회
          </Button>
      </div>
    </div>
  </div>
          </div>
        <div className={styles.rightMemberLayout1}>
         <MemberDetail member={selectedMember} /> 
          </div>
    </div>
    </>
  )
}

export default MemberInfo