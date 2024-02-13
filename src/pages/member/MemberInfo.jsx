import React, { useState } from 'react';
import styles from './member.module.css';
import { Button } from 'react-bootstrap';
import MemberSearchbar from './MemberSearchbar';
import MemberRow from './MemberRow';
import MemberDetail from './MemberDetail';

const MemberInfo = ({ memberList }) => {
  const [selectedMemberId, setSelectedMemberId] = useState(null); // 선택된 사용자 ID 저장
  const [selectedMember, setSelectedMember] = useState(null); // 선택된 사용자 정보 저장

  const handleRowClick = (userId) => {
    const selected = memberList.find((member) => member.CLIENT_ID === userId);
    setSelectedMemberId(userId);
    setSelectedMember(selected);
  };

  return (
    <>
      <div className={styles.InnerMemberLayout}>
        <div className={styles.leftMemberLayout}>
          <h2>▶︎&nbsp;이용자목록</h2>
          <MemberSearchbar />
          <MemberRow memberList={memberList} onClickRow={handleRowClick} />
          <Button variant="warning">전체조회</Button>
        </div>
        <div className={styles.rightMemberLayout1}>
          {selectedMember ? (
            <MemberDetail selectedMember={selectedMember} />
          ) : (
            <MemberDetail />
          )}
        </div>
      </div>
    </>
  );
};

export default MemberInfo;