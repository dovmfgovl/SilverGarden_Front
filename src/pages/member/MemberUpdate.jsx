import React, {useCallback, useState } from 'react';
import { Button, Col, Form, Image, Modal, Row, Stack, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import DaumPostcode from 'react-daum-postcode';
import 'react-datepicker/dist/react-datepicker.css';
import { memberUpdate } from '../../services/api/memberApi';
import { useNavigate} from 'react-router-dom';

const MemberUpdate = ({selectedMember}) => {
  const [memberDetail,setMemberDetail]=useState(
    {
      CLIENT_ID:selectedMember.CLIENT_ID,
      CLIENT_NAME:selectedMember.CLIENT_NAME,
      CLIENT_BIRTH:selectedMember.CLIENT_BIRTH,
      CLIENT_GENDER:selectedMember.CLIENT_GENDER,
      CLIENT_TEL:selectedMember.CLIENT_TEL,
      CLIENT_MANAGER:selectedMember.CLIENT_MANAGER,
      CLIENT_ADDRESS:selectedMember.CLIENT_ADDRESS,
      MOD_ID:selectedMember.MOD_ID
    });

  const navigate = useNavigate();
  const [roadAddress, setRoadAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [birth,setBirth]=useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // 나중에 트러블슈팅: 다른 회원의 정보를 수정하려고 할 때 새로 고치고 다시 내기  
  
  const completeHandler = (data) => {
    console.log(data);
    setRoadAddress(data.address);
    setShow(false);
  };
  
  const changeHandler = (e) => {
    setDetailAddress(e.target.value);
    console.log(detailAddress);
  };

  const handleBirth = useCallback((value) => {
    console.log(value);
    setBirth(value) 
    },[]);
  
  const handleSubmit = async () => {
    const fullAddress = `${roadAddress} ${detailAddress}`;
    const updatedMemberDetail = {
      ...memberDetail,
      CLIENT_ADDRESS: fullAddress
    };
    try {
      const res = await memberUpdate(updatedMemberDetail);
      console.log(res.data);
      alert("회원 정보가 성공적으로 저장되었습니다.");
      navigate("/member");

    } catch (error) {
      console.error("회원 정보 저장 실패:", error);
      alert("회원 정보를 저장하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };
  return (
    <>
      <Row>
        <Col><h2>&nbsp;&nbsp;&nbsp;▶︎&nbsp;이용자정보수정</h2></Col>
        <Col>
          <Stack direction="horizontal" gap={2}>
            <Button variant="success" className="p-2 ms-auto" onClick={handleSubmit}>저장</Button>
            <Button variant="danger" className="p-2">취소</Button>
          </Stack>
        </Col>
      </Row>
      <Stack direction="horizontal" gap={3}>
        <Image width={210} height={180} alt="171x180" src="logo192.png" rounded className='p-2 ms-auto' />
        <Table className='shadow w-100 ms-auto'>
          <tbody>
            <tr>
              <th><strong>이름:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <Form.Control  id='client_name' 
                value={memberDetail.CLIENT_NAME}  onChange={(e) => {setMemberDetail({...memberDetail,CLIENT_NAME:e.target.value}) }}/>
              </td>
              <th><strong>생년월일:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <DatePicker  id="client_birth" dateFormat="yyyy-MM-dd"
                 value={birth} onChange={handleBirth} selected={birth}/>
              </td>
            </tr>
            <tr>
              <th><strong>성별:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <Form.Select aria-label="Default select example" 
                value={memberDetail.CLIENT_GENDER} onChange={(e) => {setMemberDetail({...memberDetail,CLIENT_GENDER:e.target.value}) }}>
                  <option >분류선택</option> 
                  <option value="남">남</option> 
                  <option value="여">여</option>
                </Form.Select>
              </td>
              <th><strong>전화번호:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <Form.Control id="client_tel" 
                 value={memberDetail.CLIENT_TEL}  onChange={(e) => {setMemberDetail({...memberDetail,CLIENT_TEL:e.target.value}) }}/>
                 </td>
            </tr>
            <tr>
              <th><strong>담당자:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <Form.Control id="client_manger"
                 value={memberDetail.CLIENT_MANAGER} onChange={(e) => {setMemberDetail({...memberDetail,CLIENT_MANAGER:e.target.value}) }}/>
              </td>
              <th><strong>주소:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <Stack direction=''>
                  <input id="client_address" value={roadAddress} readOnly placeholder="도로명 주소" />
                  <br />
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>주소검색</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <DaumPostcode onComplete={completeHandler} height="400px" />
                    </Modal.Body>
                  </Modal>
                  <input id="client_sideadress" type="text" onChange={changeHandler} value={detailAddress} placeholder="상세주소" />
                  <br />
                  <button onClick={handleShow}>주소검색</button>
                </Stack>
              </td>
            </tr>
          </tbody>
        </Table>
      </Stack>
    </>
  )
}

export default MemberUpdate;

