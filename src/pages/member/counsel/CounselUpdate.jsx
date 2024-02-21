import React, { useCallback, useState }from 'react';
import { Button, Card, Col, Form, Modal, Row, } from 'react-bootstrap';
import { counselUpdate } from '../../../services/api/memberApi';
const CounselUpdate = ({counsel}) => {
  const [counselDetail,setCounselDetail]=useState(
    {
      COUNSEL_NO:counsel.COUNSEL_NO,
      COUNSEL_DATE:counsel.COUNSEL_DATE,
      COUNSEL_HOW: counsel.COUNSEL_HOW,
      COUNSEL_TIME:counsel.COUNSEL_TIME,
      COUNSEL_MANAGER:counsel.COUNSEL_MANAGER,
      COUNSEL_CONTENT:counsel.COUNSEL_CONTENT,
      CLIENT_ID:counsel.CLIENT_ID,
      MOD_ID:counsel.MOD_ID
    }
  )
console.table(counselDetail);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [date,setDate]=useState('')
    const [time,setTime]=useState("")


  const handleDate = useCallback((value) => {
    console.log(value);
    setDate(value) 
    },[]);

    const handleTime= useCallback((value)=>{
      setTime(value);
      console.log(time);
    },[]);

    const handleSubmit = async () => {
      const updatedCounsel = {
        ...counselDetail,
        COUNSEL_DATE: date,
        COUNSEL_TIME: time
      };
      try {
        const res = await counselUpdate(updatedCounsel);
        console.log(res.data);
        alert("회원 정보가 성공적으로 저장되었습니다.");
        window.location.reload(); 
  
      } catch (error) {
        console.error("회원 정보 저장 실패:", error);
        alert("회원 정보를 저장하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    };
  return (
    <>
      <Button gap={2} variant="primary" onClick={handleShow}>
        수정
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>수정하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row xs={1} md={2}>
        <Col>날짜
          <Col>
        <input type='date'  placeholderText={counselDetail.COUNSEL_DATE} dateFormat="yyyy-MM-dd" onChange={handleDate}  
        value={date} selected={date}/>
          </Col>

    </Col>
        <Col>상담형태
        <Card style={{ width: '13rem' }}>
          <Col>
          <Form.Select id='tb_how' value={counselDetail.COUNSEL_HOW}
           onChange={e=>{
            setCounselDetail({...counselDetail,COUNSEL_HOW:e.target.value}) }}>
      <option>분류선택</option>
      <option value="전화통화">전화통화</option>
      <option value="면담">면담</option>
      <option value="카톡 혹은 문자">카톡 혹은 문자</option>
      <option value="기타">기타</option>
    </Form.Select>
          </Col>
       </Card>
       </Col>
        <Col>상담시간
        <Card style={{ width: '13rem' }}>
        <input type='time'  value={time} disableClock={true} locale='ko'
          onChange={handleTime}/>
          <h6>수정전 : {counselDetail.COUNSEL_TIME}</h6>
        </Card>
</Col>
        <Col>상담자
        <Card style={{ width: '13rem' }}>
          <Col>
            <Form.Control id='counsel_manager' 
            value={counselDetail.COUNSEL_MANAGER}
            onChange={e=>{
              setCounselDetail({...counselDetail,COUNSEL_MANAGER:e.target.value}) }}
            >
            </Form.Control>
          </Col>
       </Card></Col>
        <Col>내용
          <Col style={{ width: '28rem' }}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" type="text" rows={3} 
        value={counselDetail.COUNSEL_CONTENT}
                    onChange={e=>{
                      setCounselDetail({...counselDetail,COUNSEL_CONTENT:e.target.value}) }}
        />
      </Form.Group>
          </Col>
    </Col>
      </Row>
           
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
            수정
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
}

export default CounselUpdate