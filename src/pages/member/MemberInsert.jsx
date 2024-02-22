import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';
import { memberInsert } from '../../services/api/memberApi';
import { useNavigate } from 'react-router-dom';
import { Descriptions, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getEmpList } from '../../redux/empInfosSlice';

const MemberInsert = () => {
  
  const [name,setName]=useState('');
  const [birth,setBirth]=useState('');
  const [gender,setGender]=useState('');
  const [tel,setTel]=useState('');
  const [age,setAge]=useState(0);
  const [manager, setManager] = useState('');
  const [photo,setPhoto]=useState('');

  const empList = useSelector(state => state.empInfos.value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmpList());
  }, [dispatch]);

  const navigate = useNavigate();
  const [roadAddress, setRoadAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setName('');
    setBirth('');
    setGender('');
    setTel('');
    setAge('');
    setManager('');
    setRoadAddress('');
    setDetailAddress('');
    setShow(false)};
  const handleShow = () => setShow(true);
  const [subShow,setSubShow]=useState(false);
  const handleSubShow=()=> setSubShow(true);
  const handleSubClose=()=> setSubShow(false);
  
  const handleName = useCallback((value) => {
    setName(value);
  }, []);
  
  const handleBirth = useCallback((value) => {
    setBirth(value);
    // 생년월일을 받아와서 현재 연도에서 뺀 후 나이를 설정
    const birthYear = new Date(value).getFullYear();
    const currentYear = new Date().getFullYear();
    setAge(currentYear - birthYear);
  }, []);
  
  const handleGender = useCallback((value) => {
    setGender(value);
  }, []);
  
  const handleManager = useCallback((value) => {
    setManager(value);
  }, []);
  
  const handleTel = useCallback((value) => {
    setTel(value);
  }, []);

  const handlePhoto = useCallback((value) => {
    setPhoto(value);
  }, []);



  const completeHandler = (data) => {
    setRoadAddress(data.address);
    setSubShow(false);
  };
  
  const changeHandler = (e) => {
    setDetailAddress(e.target.value);
  };

  const handleSubmit = async () => {
    const fullAddress = `${roadAddress} ${detailAddress}`;
    const client = {
      CLIENT_NAME: name,
      CLIENT_BIRTH: birth,
      CLIENT_GENDER: gender,
      CLIENT_TEL: tel,
      CLIENT_ADDRESS: fullAddress,
      CLIENT_MANAGER: manager,
      CLIENT_AGE: age,
      REG_ID: '202402-00000008',
      MOD_ID: '202402-00000008',
    };
    try {
      console.table(client);
      const res = await memberInsert(client);
      const responseData = JSON.parse(res.data);
      console.log(responseData);
      alert("회원 정보가 성공적으로 저장되었습니다.");
      window.location.reload(); // 화면 리로드
    } catch (error) {
      console.error("회원 정보 저장 실패:", error);
      alert("회원 정보를 저장하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };
  
  return (
    <>
      <Button variant="outline-primary" onClick={handleShow} >
        신규등록
      </Button>
      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>이용자등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Stack direction="horizontal" gap={2}>
                <Button variant="success" className="p-2 ms-auto" onClick={handleSubmit}>저장</Button>
                <Button variant="danger" className="p-2" onClick={handleClose}>취소</Button>
              </Stack>
            </Col>
          </Row>
            <Descriptions bordered>
              <Descriptions.Item label="이름"> 
                <Form.Control id='client_name'  value={name} onChange={e => {handleName(e.target.value)}} />
              </Descriptions.Item>
              <Descriptions.Item label="생년월일" span={2} > 
                <Input
                  
                  type='date'
                  placeholder=''
                  onChange={e => {handleBirth(e.target.value)}}
                />
              </Descriptions.Item>
              <Descriptions.Item label="성별">
                <Form.Select aria-label="Default select example"   value={gender} onChange={e => {handleGender(e.target.value)}}>
                  <option>분류선택</option> 
                  <option value="남">남</option> 
                  <option value="여">여</option>
                </Form.Select>
              </Descriptions.Item>
              <Descriptions.Item label="담당자" span={2}> 
                <Form.Select aria-label="Default select example"    value={manager} onChange={e => {handleManager(e.target.value)}}>
                  {empList.map(emp=>(
                    <option value={emp.E_NAME}>{emp.E_NAME}</option> 
                  ))}
                </Form.Select>
              </Descriptions.Item>
              <Descriptions.Item label="전화번호">
                <Form.Control id="client_tel"  value={tel} onChange={e => {handleTel(e.target.value)}} placeholder='010-0000-0000' />
              </Descriptions.Item>
              <Descriptions.Item label="나이" span={2}> 
                <Input
                  placeholder="나이"
                  value={age}
                  disabled // 나이는 입력하지 않고 자동 계산되므로 disabled 처리
                />
              </Descriptions.Item>
              <Descriptions.Item  label="주소" span={3}>
                <Input.Group compact>
                  <Input 
                    
                    style={{ width: '70%' }}
                    value={roadAddress}
                    readOnly
                  />
                  <Button onClick={() => setSubShow(true)}>주소검색</Button>
                  <Modal show={subShow} onHide={handleSubClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>주소검색</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <DaumPostcode onComplete={completeHandler} height="400px" />
                    </Modal.Body>
                  </Modal>
                </Input.Group>
                <Input
                  
                  placeholder="상세주소"
                  value={detailAddress}
                  onChange={changeHandler}
                />
              </Descriptions.Item>
            </Descriptions>
    
        </Modal.Body>
      </Modal>
    </>


  )
}

export default MemberInsert;

