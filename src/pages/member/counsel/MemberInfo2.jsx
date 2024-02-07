import {React, useEffect, useState} from 'react'
import styles from '../member.module.css';


// import { userListDB } from '../../services/api/CardApi';

import { Button, Table } from 'react-bootstrap';
import MemberSearchbar2 from './MemberSearchbar2';
import MemberRow2 from './MemberRow2';
import MemberDetail2 from './MemberDetail2';


const MemberInfo2 = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자 정보 저장

//   const getUserList=async()=>{
//     const res= await userListDB();
//     const data= res.data;
//     console.log(data);
//     setUserList(data);
//   }

//   useEffect(()=>{
//     getUserList();
//   },[]);

//   const handleRowClick = (userNum) => {
//     const selected = userList.find((userList) => userList.U_NUM === userNum);
//     setSelectedUser(selected);
//     console.log(selectedUser);
//   };
  return (
    <>
    <div className={styles.InnerMemberLayout}>
        <div className={styles.leftMemberLayout}>
        <h2>▶︎&nbsp;이용자목록</h2>
          <MemberSearchbar2/>
          <div>
   
    <div className="col border border-white border-2"  style={{background:'hsl(193, 6%, 88%)'}}>
      <Table striped bordered hover>
        <thead style={{background:'hsl(193, 52%, 88%)'}} >
          <tr>
            <th className='text-center'>#</th>
            <th className='text-center'>이름</th>
            <th className='text-center'>현황</th>
            <th className='text-center'>생년월일</th>
            <th className='text-center'>나이</th>
            <th className='text-center'>담당자</th>
          </tr>
        </thead>
        {/* 목록 내용 */}
        <tbody>
        {userList &&
              userList.map((userList, key) => (
                <MemberRow2 key={key} userList={userList}  />
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
         <MemberDetail2 user={selectedUser} /> 
          </div>
    </div>
    </>
  )
}

export default MemberInfo2