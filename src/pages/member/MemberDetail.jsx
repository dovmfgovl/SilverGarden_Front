import React, { useEffect, useState } from 'react';
import { Col, Stack, Button, Modal, Form } from 'react-bootstrap';
import { Descriptions, Input, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setDetail, saveMemDetails } from '../../redux/memberSlice';
import DaumPostcode from 'react-daum-postcode';
import MemberDelete from './MemberDelete';
import { getEmpList } from '../../redux/empInfosSlice';

const MemberDetail = () => {
  const dispatch = useDispatch();
  const selectedMember = useSelector(state => state.memberSlice.selectedMember) || {};
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [editing, setEditing] = useState(false);
  const [roadAddress, setRoadAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [updatedMember, setUpdatedMember] = useState(selectedMember);
  const [originalMember, setOriginalMember] = useState(selectedMember);

  const empList = useSelector(state => state.empInfos.value);
  useEffect(() => {
    dispatch(getEmpList());
  }, [dispatch]);

  useEffect(() => {
      setUpdatedMember(selectedMember)
      setOriginalMember(selectedMember)
  }, [selectedMember])

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setRoadAddress('');
    setDetailAddress('');
    setUpdatedMember(originalMember);
  };

  const handleSaveChanges = () => {
    const fullAddress = `${roadAddress} ${detailAddress}`;
    const updatedMemberDetail = {
      ...updatedMember,
      CLIENT_ADDRESS: fullAddress
    };

    dispatch(saveMemDetails(updatedMemberDetail))
      .then(() => {
        dispatch(setDetail(updatedMember));
        setEditing(false);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error saving member details: ', error);
      });
  };

  const handleChange = (key, value) => {
    if (key === 'CLIENT_BIRTH') {
      // 생년월일이 변경될 때 나이를 다시 계산하여 업데이트
      const birthYear = new Date(value).getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;
      setUpdatedMember(prevState => ({
        ...prevState,
        [key]: value,
        'CLIENT_AGE': age // 나이 업데이트
      }));
    } else {
      setUpdatedMember(prevState => ({
        ...prevState,
        [key]: value
      }));
    }
  };
  
  const completeHandler = (data) => {
    console.log(data);
    setRoadAddress(data.address);
    setShow(false)
  };

  const changeHandler = (e) => {
    setDetailAddress(e.target.value);
  };

  return (
    <div className="container" >
      <div className="user-detail" >
        <Col>
          <h2>&nbsp;&nbsp;&nbsp;▶︎&nbsp;이용자상세정보</h2>
        </Col>
        {Object.keys(selectedMember).length > 0 && ( // Check if selectedMember is not empty
          <Stack direction="horizontal" gap={3}>
            {editing ? (
              <>
              <div className='ms-auto'>
                <Button variant="outline-secondary" onClick={handleSaveChanges}>저장</Button>
              </div>
                <Button variant="outline-danger" onClick={handleCancel}>취소</Button>
              </>
            ) : (
              <>
              <div className=' ms-auto'>
                <Button variant="outline-success" onClick={handleEdit}>수정</Button>
              </div>
              <div >
                <MemberDelete />
              </div>
              </>
            )}
          </Stack>
        )}
        {editing ? (
            <Descriptions bordered>
              <Descriptions.Item label="이름">
                <Input
                  placeholder="이름"
                  value={updatedMember.CLIENT_NAME}
                  onChange={e => handleChange('CLIENT_NAME', e.target.value)}
                />
              </Descriptions.Item>
              <Descriptions.Item label="생년월일" span={2} >
                <Input
                  type='date'
                  onChange={e => handleChange('CLIENT_BIRTH', e.target.value)}
                />
                <text>{updatedMember.CLIENT_BIRTH}</text>
              </Descriptions.Item>
              <Descriptions.Item label="성별">
                <Select
                  style={{ width: '100%' }}
                  value={updatedMember.CLIENT_GENDER}
                  onChange={e => handleChange('CLIENT_GENDER', e.target)}
                >
                  <Select.Option value="남">남</Select.Option>
                  <Select.Option value="여">여</Select.Option>
                </Select>
              </Descriptions.Item>
              <Descriptions.Item label="담당자" span={2}>
                <Form.Select  onChange={e => { handleChange('CLIENT_MANAGER', e.target.value) }}>
                  <option >{updatedMember.CLIENT_MANAGER}</option>
                  {empList.map(emp => (
                    <option value={emp.E_NAME}>{emp.E_NAME}</option>
                  ))}
                </Form.Select>
              </Descriptions.Item>
              <Descriptions.Item label="전화번호">
                <Input
                  value={updatedMember.CLIENT_TEL}
                  onChange={e => handleChange('CLIENT_TEL', e.target.value)}
                />
              </Descriptions.Item>
              <Descriptions.Item label="나이" span={2}>
                <Input
                  placeholder="나이"
                  value={updatedMember.CLIENT_AGE}
                  onChange={e => handleChange('CLIENT_AGE', e.target.value)}
                  disabled
                /> </Descriptions.Item>
              <Descriptions.Item label="주소" span={3}>
                <Space size={'large'}>
                  <Input
                    style={{ maxWidth: '150%' }}
                    placeholder={updatedMember.CLIENT_ADDRESS}
                    value={roadAddress}
                    readOnly
                  />
                  <Button  onClick={() => setShow(true)}>주소검색</Button>
                </Space>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>주소검색</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <DaumPostcode onComplete={completeHandler} height="400px" />
                    </Modal.Body>
                  </Modal>
                <Input
                  placeholder="상세주소"
                  value={detailAddress}
                  onChange={changeHandler}
                />
              </Descriptions.Item>
            </Descriptions>
        ) : (
          <Descriptions bordered>
            <Descriptions.Item label="이름">{selectedMember.CLIENT_NAME}</Descriptions.Item>
            <Descriptions.Item label="이용자번호" span={2}>{selectedMember.CLIENT_ID}</Descriptions.Item>
            <Descriptions.Item label="생년월일">{selectedMember.CLIENT_BIRTH}</Descriptions.Item>
            <Descriptions.Item label="등록일" span={2}>{selectedMember.REG_DATE}</Descriptions.Item>
            <Descriptions.Item label="성별">{selectedMember.CLIENT_GENDER}</Descriptions.Item>
            <Descriptions.Item label="담당자" span={2}>{selectedMember.CLIENT_MANAGER}</Descriptions.Item>
            <Descriptions.Item label="전화번호">{selectedMember.CLIENT_TEL}</Descriptions.Item>
            <Descriptions.Item label="나이" span={2}>{selectedMember.CLIENT_AGE}</Descriptions.Item>
            <Descriptions.Item label="주소">{selectedMember.CLIENT_ADDRESS}</Descriptions.Item>
          </Descriptions>
        )}
      </div>
    </div>
  );
};

export default MemberDetail;
