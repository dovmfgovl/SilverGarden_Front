import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const CalendarModal = ({show, onHide, event}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>일정 상세 정보</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>일정 제목: {event.title}</p>
                <p>시작일: {event.start.toISOString()}</p>
                <p>종료일: {event.end ? event.end.toISOString() : '없음'}</p>
                {/* 추가적인 일정 정보 표시 가능 */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                닫기
                </Button>
                <Button variant="danger" onClick={() => console.log('삭제 로직 추가')}>
                삭제
                </Button>
            </Modal.Footer>
            </Modal>
        );
    };
export default CalendarModal