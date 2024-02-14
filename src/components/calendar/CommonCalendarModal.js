import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CommonCalendarModal = ({ show, handleClose, event }) => {
    if (!event) {
        // event가 null인 경우에 대한 처리 (예: 모달을 감추거나 특정 메시지 표시)
        return null;
    }
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{event.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>시작 시간: {event.start}</p>
            <p>종료 시간: {event.end}</p>
            <p>내용: {event.content}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            닫기
            </Button>
        </Modal.Footer>
        </Modal>
    );
};

export default CommonCalendarModal;
