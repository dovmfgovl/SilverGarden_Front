import React, { useCallback, useState } from 'react';
import { Button, Col, Image, Modal, Row, Stack } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';
import { memberInsert } from '../../services/api/memberApi';
import { useNavigate} from 'react-router-dom';
import { DatePicker, Form, Input,List,Select } from 'antd';

const MemberInsert = () => {
  const [name,setName]=useState('')
  const [birth,setBirth]=useState('')
  const [gender,setGender]=useState('')
  const [tel,setTel]=useState('')
  const [age,setAge]=useState(0)
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
    console.log(birth);
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
<Row>
  <List bordered>
    
        <Form  >
          <List.Item>
          <Form.Item label="이름"  name={name} rules={[{ required: true, message: 'Please input!' }]}>
                <Input id='client_name' value={name} onChange={e => {handleName(e.target.value)}} />
          </Form.Item>
          </List.Item>
          <List.Item>
                  <Form.Item label="성별" rules={[{ required: true, message: 'Please input!' }]}>
                    <Select style={{width:'300%'}}>
                      <Select.Option value="남">남</Select.Option>
                      <Select.Option value="여">여</Select.Option>
                    </Select>
             </Form.Item>
          </List.Item>
          <List.Item>
          <Form.Item label="담당자" name="Input" rules={[{ required: true, message: 'Please input!' }]}>
                <Input />
            </Form.Item>
          </List.Item>
            </Form>
  </List>
</Row>
<List bordered>
<Form  >
  <List.Item>
            <Form.Item label="생년월일" name="Input" rules={[{ required: true, message: 'Please input!' }]}>
                <DatePicker id="client_birth"  dateFormat="yyyy-MM-dd" value={birth} onChange={handleBirth} selected={birth} />
            </Form.Item>
  </List.Item>
  <List.Item>
            <Form.Item label="전화번호" name="Input" rules={[{ required: true, message: 'Please input!' }]}>
                <Input />
            </Form.Item>
  </List.Item>
  <List.Item>
            <Form.Item label="나이">
                <Input />
            </Form.Item>

  </List.Item>
        </Form>
</List>
      </Stack>
        <Row>
          <List>
            <List.Item>
                  <Form className='w-75 ms-auto' layout='vertical' >
                  <Form.Item label='주소' name="Input" rules={[{ required: true, message: 'Please input!' }]}>
                            <Input id="client_address" value={roadAddress} readOnly placeholder="도로명 주소" />
                            <Input id="client_sideadress" type="text" onChange={changeHandler} value={detailAddress} placeholder="상세주소" />
                            <Button onClick={handleShow}>주소검색</Button>
                                      <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                          <Modal.Title>주소검색</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                          <DaumPostcode onComplete={completeHandler} height="400px" />
                                        </Modal.Body>
                                      </Modal>
                      </Form.Item>
                  </Form>
            </List.Item>
          </List>
        </Row>
</>

  )
}

export default MemberInsert;

