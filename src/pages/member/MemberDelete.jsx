import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const MemberDelete = ({ show, handleClose }) => {
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
        <Button variant="primary" onClick={() => {
          // 삭제 처리 로직 추가
          handleClose(); // 모달 닫기
        }}>
          삭제
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MemberDelete;
