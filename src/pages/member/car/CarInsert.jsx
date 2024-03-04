import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getEmpList } from '../../../redux/chooseEmpSlice';
import { shuttleInsert } from '../../../services/api/carApi';
import { getCarList } from '../../../redux/carSlice';

const CarInsert = () => {
  const [show, setShow] = useState(false);
  const empList = useSelector(state => state.chooseEmp.value);
  const userData =useSelector(state => state.userInfoSlice);
  const dispatch = useDispatch();
  const [type,setType]=useState('');
  const [driver,setDriver]=useState('');
  const [carNo,setCarNo]=useState('');
  useEffect(() => {
    dispatch(getEmpList());
  }, [dispatch]);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false)
    setType('')
    setDriver('')
    setCarNo('')
  }; 
      const handleType = useCallback((value) => {
          setType(value);
        }, []);
        const handleCarNo = useCallback((value) => {
            setCarNo(value);
        }, []);
        const handleDriver = useCallback((value) => {
            setDriver(value);
        }, []);
        
        const handleSubmit=async()=>{
            console.log('submit');
            const shuttle={
                SHUTTLE_TYPE:type,
                SHUTTLE_DRIVER:driver,
                SHUTTLE_CARNUM:carNo,
                REG_ID: userData.e_no,
                MOD_ID: userData.e_no,
            }
            try {
                const res = await shuttleInsert(shuttle)
                alert("차량이 등록되었습니다.")
                handleClose()
               dispatch(getCarList());

            } catch (error) {
                   console.error("차량 정보 저장 실패:", error);
      alert("차량 정보를 저장하는 도중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            }
        }
        return (
            <>
    <Button variant='outline-primary' onClick={handleShow}>차량등록</Button>
    <Modal size='lg' show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>차량등록</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form >
      <Col>
          <Form.Label>차량종류</Form.Label>
          <Form.Control   value={type} onChange={e => {handleType(e.target.value)}} />
      </Col>
      <Col>
            <Form.Label>차량번호</Form.Label>
            <Form.Control   value={carNo} onChange={e => {handleCarNo(e.target.value)}} />
      </Col>
      <Col>
      <Form.Label>운전자</Form.Label>
            <Form.Select aria-label="Default select example"    value={driver} onChange={e => {handleDriver(e.target.value)}}>
              <option>담당자 선택</option>
                {empList.map(emp => (
                  emp.DEPT_NAME === "사회복지팀" && emp.E_STATUS !=="퇴직" && (
                    <option key={emp.E_NAME} value={emp.E_NAME}>{emp.E_NAME}</option>
                  )
                ))}
            </Form.Select>
      </Col>
        </Form>
        <Col>
          <Stack direction="horizontal" gap={2}>
            <Button variant="primary" className="p-2 ms-auto" onClick={handleSubmit}>저장</Button>
            <Button variant="secondary" className="p-2" onClick={handleClose}>취소</Button>
          </Stack>
        </Col>
    </Modal.Body>
  </Modal>
    </>
  )
}

export default CarInsert