import React from 'react'
import {Col, Image,  Stack} from 'react-bootstrap'
import Counsel from './Counsel'
import { useDispatch, useSelector } from 'react-redux';
import { Descriptions } from 'antd';

const MemberDetail2 = () => {
  const dispatch = useDispatch();
  const selectedMember = useSelector(state => state.memberSlice.selectedMember) || {};
  return (
    <div className="container">
      <div className="user-detail">
        <Col>
          <h2>&nbsp;&nbsp;&nbsp;▶︎&nbsp;이용자상담일지</h2>
        </Col>
        <Col>
          <Stack direction="horizontal" gap={2}>
          </Stack>
        </Col>
          <MemberDetailPage selectedMember={selectedMember}  />
      </div>
    </div>
  );
};

export const MemberDetailPage = ({selectedMember}) => {
  return (
    <>
   <Descriptions bordered >
            <Descriptions.Item label="이름">{selectedMember.CLIENT_NAME}</Descriptions.Item>
            <Descriptions.Item label="이용자번호" span={2}>{selectedMember.CLIENT_ID}</Descriptions.Item>
            <Descriptions.Item label="생년월일">{selectedMember.CLIENT_BIRTH}</Descriptions.Item>
            <Descriptions.Item label="등록일" span={2}>{selectedMember.REG_DATE}</Descriptions.Item>
            <Descriptions.Item label="성별">{selectedMember.CLIENT_GENDER}</Descriptions.Item>
            <Descriptions.Item label="담당자"span={2}>{selectedMember.CLIENT_MANAGER}</Descriptions.Item>
            <Descriptions.Item label="전화번호">{selectedMember.CLIENT_TEL}</Descriptions.Item>
            <Descriptions.Item label="나이" span={2}>{selectedMember.CLIENT_AGE}</Descriptions.Item>
            <Descriptions.Item label="주소">{selectedMember.CLIENT_ADDRESS}</Descriptions.Item>
          </Descriptions>
       <Counsel selectedMember={selectedMember}/>
    </>
  )
}

export default MemberDetail2