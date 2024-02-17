import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CustomModal = ({ action, event, onSave, onUpdate, onDelete, onClose }) => {
    // 날짜 형식을 변환하는 함수
    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const isoString = date.toISOString();
        return isoString.slice(0, isoString.length - 8); // 끝의 'Z'를 제외한 부분을 반환
    };
    //개별 컴포넌트 값으로 통일시켜주기
    const [formData, setFormData] = useState({
        title: event ? event.title : '',
        start: event ? event.start : '',// "start": "2024-02-01T23:52:00+09:00",
        end: event ? event.end : '',
        no: event && event.extendedProps ? event.extendedProps.no : undefined,
    });
    useEffect(() => {
        setFormData({
            title: event ? event.title : '',
            start: event ? event.start : '',
            end: event ? event.end : '',
            no: event && event.extendedProps ? event.extendedProps.no : undefined,
        });
    }, [event]);

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose(); // 저장 후에 모달을 닫도록 추가
    };

    const handleUpdate = () => {
        onUpdate(formData);
        onClose(); // 저장 후에 모달을 닫도록 추가
    };

    const handleDelete = () => {
        onDelete();
        onClose(); // 저장 후에 모달을 닫도록 추가
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{action === 'create' ? 'Create Event' : 'Edit Event'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formStart">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="start"
                            value={formatDateForInput(formData.start)}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEnd">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="end"
                            value={formatDateForInput(formData.end)}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={action === 'create' ? handleSave : handleUpdate}>
                    {action === 'create' ? 'Save' : 'Update'}
                </Button>
                {action === 'update' && (
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;