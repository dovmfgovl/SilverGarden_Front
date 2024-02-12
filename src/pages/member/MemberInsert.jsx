import React, { useCallback, useState } from 'react';
import { Button, Col, Form, Image, InputGroup, Modal, Row, Stack, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import DaumPostcode from 'react-daum-postcode';
import 'react-datepicker/dist/react-datepicker.css';

const MemberInsert = () => {
  const [name,setName]=useState("");
  const [birth, setBirth] = useState("");
  const [age, setAge] = useState("");
  const [tel, setTel]=useState("")
  const [address, setAddress] = useState("");
  const [manager, setManager] = useState("");
  const [photo, setPhoto] = useState("");
////////화면처리 관련/////////////////////////////
  const [roadAddress, setRoadAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");    // 추가
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //////////////연세 관련/////////////////////////
  const changeDate = useCallback((value) => {
    setBirth(value);
    // 시스템 연령 계산
    const birthYear = new Date(value).getFullYear();
    const currentYear = new Date().getFullYear();
    const systemage = currentYear - birthYear;
    setAge(systemage);
  }, []);
  // 나이는 현재연도 - 생년월일의 연도 
  //////////////연세 관련/////////////////////////

  //////////////주소관련///////////////////////
  const completeHandler = (data) => {
    setRoadAddress(data.address);
    setShow(false);
  };
  
  const changeHandler = (e) => {
    setDetailAddress(e.target.value);
  };
  //////////////주소관련///////////////////////


  const InsertMember= async() => {
    const client ={

    }
  }

  return (
    <>
      <Row>
        <Col><h2>&nbsp;&nbsp;&nbsp;▶︎&nbsp;이용자정보입력</h2></Col>
        <Col>
          <Stack direction="horizontal" gap={2}>
            <Button variant="success" className="p-2 ms-auto">저장</Button>
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
                <Form.Control />
              </td>
              <th><strong>생년월일:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <DatePicker id="tb_date" placeholderText='ex)1923-02-03 입력'
                  dateFormat="yyyy-MM-dd" onChange={changeDate} value={birth} selected={birth} />
              </td>
            </tr>
            <tr>
              <th><strong>나이:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <InputGroup>
                  <Form.Control value={age} placeholder='자동계산됩니다' readOnly />
                  <InputGroup.Text >세</InputGroup.Text>
                </InputGroup>
              </td>
              <th><strong>성별:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <Form.Select aria-label="Default select example">
                  <option>성별 선택</option>
                  <option value="남">남</option>
                  <option value="여">여</option>
                </Form.Select>
              </td>
            </tr>
            <tr>
              <th><strong>담당자:</strong></th>
              <Form.Control placeholder='ex)복지사'/>
              <th><strong>전화번호:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <Form.Control placeholder='010-0000-0000'/>
              </td>
            </tr>
            <tr>
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

export default MemberInsert;
