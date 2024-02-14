import React, { useCallback, useState } from 'react';
import { Button, Col, Form, Image, Modal, Row, Stack, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import DaumPostcode from 'react-daum-postcode';
import 'react-datepicker/dist/react-datepicker.css';
import { memberInsert } from '../../services/api/memberApi';
import { useNavigate} from 'react-router-dom';

const MemberInsert = () => {
  const [name,setName]=useState('')
  const [birth,setBirth]=useState('')
  const [gender,setGender]=useState('')
  const [tel,setTel]=useState('')
  const [manager,setManager]=useState('')
  const [photo,setPhoto]=useState('')
  const [pageid,setPageId]=useState('')
  const [pw,setPw]=useState('')

  const navigate = useNavigate();
  const [roadAddress, setRoadAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleName = useCallback((value) => {
    console.log(value);
    setName(value);
  }, []);
  const handleBirth = useCallback((value) => {
    console.log(value);
    setBirth(value) 
    },[]);
  const handleGender = useCallback((value) => {
    console.log(value);
    setGender(value);
  }, []);
  const handleTel = useCallback((value) => {
    console.log(value);
    setTel(value);
  }, []);
  const handleManager = useCallback((value) => {
    console.log(value);
    setManager(value);
  }, []);
  const handlePhoto = useCallback((value) => {
    console.log(value);
    setPhoto(value);
  }, []);
  const handlePageId = useCallback((value) => {
    console.log(value);
    setPageId(value);
  }, []);
  const handlePw = useCallback((value) => {
    console.log(value);
    setPw(value);
  }, []);

  const completeHandler = (data) => {
    console.log(data);
    setRoadAddress(data.address);
    setShow(false);
  };
  
  const changeHandler = (e) => {
    setDetailAddress(e.target.value);
    console.log(detailAddress);
  };

  const handleSubmit = async () => {
    const fullAddress = `${roadAddress} ${detailAddress}`;
   // const birthDate = new Date(formData.client_birth).toISOString().split("T")[0];
   const client = {
            CLIENT_NAME: name,
            CLIENT_BIRTH: birth,
            CLIENT_GENDER: gender,
            CLIENT_TEL: tel,
            CLIENT_ADDRESS: fullAddress,
            CLIENT_MANAGER: manager,
            REG_ID: '202402-00000008',
            MOD_ID: '202402-00000008',
        };
    try {
      console.table(client);
      const res = await memberInsert(client);
      const responseData = JSON.parse(res.data);
      console.log(responseData);
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
        <Col><h2>&nbsp;&nbsp;&nbsp;▶︎&nbsp;이용자정보입력</h2></Col>
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
                <Form.Control id='client_name' value={name} onChange={e => {handleName(e.target.value)}} />
              </td>
              <th><strong>생년월일:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <DatePicker id="client_birth" placeholderText='ex)1923-02-03 입력' dateFormat="yyyy-MM-dd" value={birth} onChange={handleBirth} selected={birth} />
              </td>
            </tr>
            <tr>
              <th><strong>성별:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <Form.Select aria-label="Default select example"  id="client_gender" value={gender} onChange={e => {handleGender(e.target.value)}}>
                  <option >분류선택</option> 
                  <option value="남">남</option> 
                  <option value="여">여</option>
                </Form.Select>
              </td>
              <th><strong>전화번호:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <Form.Control id="client_tel" value={tel} onChange={e => {handleTel(e.target.value)}} placeholder='010-0000-0000' />
              </td>
            </tr>
            <tr>
              <th><strong>담당자:</strong></th>
              <td style={{ width: '20%' }} className='px-2'>
                <Form.Control id="client_manger" value={manager} onChange={e => {{handleManager(e.target.value)}}} placeholder='ex)복지사' />
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

export default MemberInsert;

