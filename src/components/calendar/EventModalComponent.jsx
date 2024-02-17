// EventModalComponent.jsx
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const EventModalComponent = ({ selectedEvent, show, handleClose, event  }) => {
    const [formData, setFormData] = useState({
        title: selectedEvent ? selectedEvent.title : '',
        start: selectedEvent ? selectedEvent.start : '',
        end: selectedEvent ? selectedEvent.end : '',
});

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
    ...formData,
    [name]: value,
    });
};

const handleSubmit = () => {
    // 폼 데이터를 사용하여 이벤트 생성 또는 수정
    // 서버에 데이터 전송
    // 성공 후 모달 닫기
};

const handleDelete = () => {
    // 선택한 이벤트 삭제
    // 서버에 데이터 전송
    // 성공 후 모달 닫기
};

return (
    <Modal show={modalShow} onHide={onHide}>
    <Modal.Header closeButton>
        <Modal.Title>일정 상세 정보</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p>일정 제목: {event.title}</p>
        <p>시작일: {event.start.toString('ko-KR',options)}</p>
        <p>종료일: {event.end.toString('ko-KR',options)}</p>
        {/* 추가적인 일정 정보 표시 가능 */}
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
        닫기
        </Button>
        <Button variant="danger" onClick={handleDeleteEvent}>
        삭제
        </Button>
    </Modal.Footer>
    </Modal>
    );
};

export default EventModalComponent;
