import React, { useCallback, useEffect, useState }from 'react';
import { Button, Card, Col, Form, Modal, Row, } from 'react-bootstrap';
import { counselInsert } from '../../../services/api/memberApi';
import { useDispatch, useSelector } from 'react-redux';
import { getEmpList } from '../../../redux/empInfosSlice';

const CounselCreate = ({selectedMember}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
      setDate('')
      setHow('')
      setTime('')
      setManager('')
      setContent('')
      setShow(false)
    };
    const handleShow = () => setShow(true);

    //등록 항목
  const [date,setDate]=useState("");
  const [how,setHow]=useState("")
  const [time,setTime]=useState("")
  const [manager,setManager]=useState("")
  const [content,setContent]=useState("")
  

    const changeDate= useCallback((value)=>{
      console.log(value);
      setDate(value);
    },[]);

    const handleTime= useCallback((value)=>{
      setTime(value);
      console.log(time);
    },[]);
    const handleHow=useCallback((value)=>{
      console.log(value);
      setHow(value)
    },[])
    const handleManager = useCallback((value) => {
      console.log(value);
      setManager(value);
    }, []);
    
      
    const handleContent= useCallback((value)=>{
      setContent(value);
      console.log(content);
    },[]);


  const empList = useSelector(state => state.empInfos.value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmpList());
}, [dispatch]);

    const handleSubmit = async () => {
     const counsel= {
              CLIENT_ID: selectedMember.CLIENT_ID,
              COUNSEL_DATE: date,
              COUNSEL_HOW: how,
              COUNSEL_TIME: time,
              COUNSEL_MANAGER: manager,
              COUNSEL_CONTENT: content,
              REG_ID: '202402-00000008',
              MOD_ID: '202402-00000008',
          };
      try {
        // console.table(counsel);
        const res = await counselInsert(counsel);
        const responseData = JSON.parse(res.data);
        console.log(responseData);
        alert("회원 정보가 성공적으로 저장되었습니다.");
        window.location.reload(); 
  
      } catch (error) {
        console.error("회원 정보 저장 실패:", error);
        alert("회원 정보를 저장하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    };
  
  return (
    <>
   {Object.keys(selectedMember).length > 0 ? (
        <Button gap={2} variant="outline-primary" onClick={handleShow}>
          상담일지 작성
        </Button>
      ) : (
        <Button disabled>상담일지 작성</Button>
      )}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>상담일지 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row xs={1} md={2}>
        <Col>날짜
          <Col>
        <input type='date'  id="tb_date"  dateFormat="yyyy-MM-dd" onChange={e=>{changeDate(e.target.value)}}  value={date} selected={date}/>
          </Col>

    </Col>
        <Col>상담형태
        <Card style={{ width: '13rem' }}>
          <Col>
          <Form.Select id='tb_how' value={how}
           onChange={e=>{
            handleHow(e.target.value)}}>
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
        <input type='time'  onChange={e =>{handleTime(e.target.value)}} disableClock={true} locale='ko'/>
        </Card>
</Col>
        <Col>상담자
        <Card style={{ width: '13rem' }}>
          <Col>
            <Form.Select aria-label="Default select example"   value={manager} onChange={e => {handleManager(e.target.value)}}>
                      {empList.map(emp=>(
                        <option value={emp.E_NAME}>{emp.E_NAME}</option> 
                      ))}
                    </Form.Select>
          </Col>
       </Card></Col>
        <Col>내용
          <Col style={{ width: '28rem' }}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" type="text" rows={3} 
                    onChange={(e)=>{handleContent(e.target.value); }}
        />
      </Form.Group>
          </Col>
    </Col>
      </Row>
           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit} >
            저장
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
}

export default CounselCreate