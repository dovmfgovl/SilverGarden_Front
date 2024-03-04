import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { memberDelete } from '../../services/api/memberApi';
import { useDispatch, useSelector } from 'react-redux';
import { getMemList } from '../../redux/memberSlice';

const MemberDelete = () => {
  const dispatch = useDispatch();
  const selectedMember = useSelector(state => state.memberSlice.selectedMember) || {};
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete= async()=>{
    const client={
      CLIENT_ID:selectedMember.CLIENT_ID
    }
    const res = await memberDelete(client.CLIENT_ID)
    alert("삭제되었습니다");
    handleClose()
    dispatch(getMemList())
  }
  return (
    <>
    <Button variant="outline-danger" onClick={handleShow}>
    삭제
  </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>이용자삭제</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Row>
              <Col>이용자를 삭제하시겠습니까?</Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          삭제
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default MemberDelete;
