import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CustomModal = ({ action, event, onSave, onUpdate, onDelete, onClose }) => {
    // 날짜 형식을 변환하는 함수
    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const isoString = date.toISOString();
        return isoString.slice(0, isoString.length - 8); // 끝의 'Z'를 제외한 부분을 반환
    };
    const [formData, setFormData] = useState({
        title: '',
        start: '',
        end: '',
        no: undefined,
    });

    useEffect(() => {
        if (event) {
            // 이벤트 클릭 시
            setFormData({
                title: event.title,
                start: formatDateForInput(event.start),
                end: formatDateForInput(event.end),
                no: event.extendedProps.no,
            });
        } else {
            // 날짜 클릭 시
            setFormData({
                title: '',
                start: '',
                end: '',
                no: undefined,
            });
        }
    }, [event]);

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    const handleUpdate = () => {
        onUpdate(formData);
        onClose();
    };

    const handleDelete = () => {
        onDelete();
        onClose();
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
                            value={formData.start}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEnd">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="end"
                            value={formData.end}
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
