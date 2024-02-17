import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const CalendarModalDetail = ({ modalShow, onHide, selectedEvent, events,  handleDeleteEvent }) => {
    console.log(events);
    const event = selectedEvent || {};
    const options = {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
    };
    console.log(modalShow) //False
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
export default CalendarModalDetail