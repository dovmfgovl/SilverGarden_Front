import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { memberDelete } from '../../services/api/memberApi';

const MemberDelete = ({ show, handleClose,selectedMember }) => {

  const handleDelete= async()=>{
    const client={
      CLIENT_ID:selectedMember.CLIENT_ID
    }
    const res = await memberDelete(client.CLIENT_ID)
    console.log(res.data);
    alert("삭제되었습니다");
    handleClose()
  }
  return (
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
  );
};

export default MemberDelete;
