import React, { useCallback, useState } from 'react';
import { Button, Col, Form, Image, InputGroup, Modal, Row, Stack, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import DaumPostcode from 'react-daum-postcode';
import 'react-datepicker/dist/react-datepicker.css';
import { memberInsert } from '../../services/api/memberApi';

const MemberUpdate = () => {
  const [formData, setFormData] = useState({
    client_name: '',
    client_birth: '',
    client_gender: '',
    client_tel: '',
    client_address: '',
    client_manager: '',
    client_photo: '',
    client_pageid: '',
    client_pw: '',
    e_no: '',
  });

  const [roadAddress, setRoadAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");    // 추가
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeDate = useCallback((value) => {
    setFormData(prevState => ({
      ...prevState,
      client_birth: value
    }));
  }, []);

  const completeHandler = (data) => {
    setRoadAddress(data.address);
    setShow(false);
  };
  
  const changeHandler = (e) => {
    setDetailAddress(e.target.value);
  };

  const handleSubmit = async () => {
    const fullAddress = `${roadAddress} ${detailAddress}`; // 도로명주소와 상세주소를 합침
    const birthDate = new Date(formData.client_birth).toISOString().split("T")[0];
  
    const formDataToSend = {
      ...formData,
      address: fullAddress,
      client_birth: birthDate,
    };
    try {
      const response = await memberInsert(formDataToSend);
      const responseData = JSON.parse(response.data); // 응답 데이터 추출
      alert("회원 정보가 성공적으로 저장되었습니다.");
      // 저장 후 필요한 리다이렉트나 화면 전환 등의 작업을 수행할 수 있습니다.
  
    } catch (error) {
      console.error("회원 정보 저장 실패:", error);
      alert("회원 정보를 저장하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };
  console.log(typeof formData.client_name); // string
  console.log(typeof formData.client_birth); // string
  console.log(typeof formData.client_gender); // string
  console.log(typeof formData.client_tel); // string
  console.log(typeof formData.client_address); // string
  console.log(typeof formData.client_manager); // string
  console.log(typeof formData.client_photo); // string
  console.log(typeof formData.client_pageid); // string
  console.log(typeof formData.client_pw); // string
  console.log(typeof formData.e_no); // string

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
        <Image width={210}
          height={180}
          alt="171x180" src="logo192.png" rounded
          className='p-2 ms-auto' />
        <Table className='shadow w-100 ms-auto'>
          <tbody>
            <tr>
              <th><strong>이름:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <Form.Control value={formData.client_name} onChange={e => setFormData({ ...formData, client_name: e.target.value })} />
              </td>
              <th><strong>생년월일:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <DatePicker id="tb_date" placeholderText='ex)1923-02-03 입력'
                  dateFormat="yyyy-MM-dd" onChange={changeDate} selected={formData.client_birth && new Date(formData.client_birth)} />
              </td>
            </tr>
            <tr>
              <th><strong>성별:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <Form.Select aria-label="Default select example" value={formData.client_gender} onChange={e => setFormData({ ...formData, client_gender: e.target.value })}>
                  <option>성별 선택</option>
                  <option value="남">남</option>
                  <option value="여">여</option>
                </Form.Select>
              </td>
              <th><strong>전화번호:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <Form.Control value={formData.client_tel} onChange={e => setFormData({ ...formData, client_tel: e.target.value })} placeholder='010-0000-0000' />
              </td>
            </tr>
            <tr>
              <th><strong>담당자:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <Form.Control value={formData.client_manager} onChange={e => setFormData({ ...formData, client_manager: e.target.value })} placeholder='ex)복지사' />
              </td>
              <th><strong>주소:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <Stack direction=''>
                  <input value={roadAddress} readOnly placeholder="도로명 주소" />
                  <br />
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>주소검색</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <DaumPostcode onComplete={completeHandler} height="400px" />
                    </Modal.Body>
                  </Modal>
                  <input type="text" onChange={changeHandler} value={detailAddress} placeholder="상세주소" />
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
