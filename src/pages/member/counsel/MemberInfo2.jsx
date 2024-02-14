import {React,useState} from 'react'
import styles from '../member.module.css';
import { Button } from 'react-bootstrap';
import MemberRow from '../MemberRow';
import MemberDetail2 from './MemberDetail2'
import MemberSearchbar2 from './MemberSearchbar2';



const MemberInfo2 = ({ memberList,getMember }) => {
 const [selectedMemberId, setSelectedMemberId] = useState(null); // 선택된 사용자 ID 저장
  const [selectedMember, setSelectedMember] = useState(null); // 선택된 사용자 정보 저장

  const handleRowClick = (userId) => {
    const selected = memberList.find((member) => member.CLIENT_ID === userId);
    setSelectedMemberId(userId);
    setSelectedMember(selected);
  };


  const handleReset = ()=>{
    console.log('handleReset');
    setSelectedMemberId(null); // 선택된 사용자 ID 초기화
    setSelectedMember(null); // 선택된 사용자 정보 초기화
    getMember(); 
  }
  
  return (
    <>
      <div className={styles.InnerMemberLayout}>
        <div className={styles.leftMemberLayout}>
          <h2>▶︎&nbsp;이용자목록</h2>
          <MemberSearchbar2 getMember={getMember}/>
          <MemberRow memberList={memberList} onClickRow={handleRowClick} />
          <Button variant="warning" onClick={handleReset}>전체조회</Button>
        </div>
        <div className={styles.rightMemberLayout1}>
          {selectedMember ? (
            <MemberDetail2 selectedMember={selectedMember} />

          ) : (
            <MemberDetail2 />
          )}
        </div>
      </div>
    </>
  );
};

export default MemberInfo2