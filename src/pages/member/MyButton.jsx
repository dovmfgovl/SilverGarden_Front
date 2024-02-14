import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import MemberInsert from './MemberInsert';
import MemberDelete from './MemberDelete';
import MemberUpdate from './MemberUpdate';

const MyButton = ({selectedMember}) => {
  const [button, setButton] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 모달 상태 추가
  

  const handleButton = (buttonTitle) => {
    setButton(buttonTitle);
    if (buttonTitle === "삭제") {
      setShowDeleteModal(true); // 삭제 버튼 클릭 시 모달 열기
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false); // 모달 닫기
  };

  return (
    <div>
      <Buttons handleButton={handleButton} />
        <>
          {button === "추가" && <MemberInsert />}
          {button === "수정" && <MemberUpdate selectedMember={selectedMember}/>}
          {button === "삭제" && <MemberDelete show={showDeleteModal} handleClose={handleCloseDeleteModal} selectedMember={selectedMember}/>}
        </>
    </div>
  );
};

export const Buttons = ({ handleButton }) => {
  const ButtonList = [
    { label: '추가' },
    { label: '수정' },
    { label: '삭제' }
  ];

  const handleClick = (e) => {
    const buttonTitle = e.target.innerText;
    if (handleButton) {
      handleButton(buttonTitle);
    }
  };

  return (
    <>
      {ButtonList.map((item, label) => (
        <Button className='ms-auto' key={label} onClick={handleClick}>
          {item.label}
        </Button>
      ))}
    </>
  );
};

export default MyButton;
