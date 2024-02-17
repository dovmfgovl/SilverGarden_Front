// CalendarModalInsert.js
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CalendarModalInsert = ({ modalShow, onHide, onInsert, defaultDate }) => {
    const [formData, setFormData] = useState({
        title: '',
        start: defaultDate || '', // 선택한 날짜를 기본값으로 설정
        end: defaultDate || '', // 선택한 날짜를 기본값으로 설정
    });
    // 모달이 열릴 때마다 선택한 날짜로 초기화
    useEffect(() => {
        setFormData({
        title: '',
        start: defaultDate || '',
        end: defaultDate || '',
        });
    }, [modalShow, defaultDate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleInsert = () => {
        // 여기서 새 일정을 추가하는 로직을 구현합니다.
        // formData를 사용하여 새로운 일정을 생성하거나 API를 호출하여 서버에 저장할 수 있습니다.
        // 예시: onInsert(newEvent);
        
        // onInsert 함수에 새로운 일정 데이터 전달
        onInsert(formData);
    
        // 모달 닫기
        onHide();
    };

    return (
        <Modal show={modalShow} onHide={onHide}>
        <Modal.Header closeButton>
        <Modal.Title>새 일정 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">
            일정 제목
            </label>
            <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="start" className="form-label">
            시작일
            </label>
            <input
            type="datetime-local"
            className="form-control"
            id="start"
            name="start"
            value={formData.start}
            onChange={handleChange}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="end" className="form-label">
            종료일
            </label>
            <input
            type="datetime-local"
            className="form-control"
            id="end"
            name="end"
            value={formData.end}
            onChange={handleChange}
            />
        </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
            닫기
        </Button>
        <Button variant="primary" onClick={handleInsert}>
            추가
        </Button>
        </Modal.Footer>
    </Modal>
    );
};
  
export default CalendarModalInsert;
