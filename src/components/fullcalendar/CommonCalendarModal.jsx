import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment-timezone';

const CustomModal = ({ action, event, onSave, onUpdate, onDelete, onClose }) => {
    // 날짜 형식을 변환하는 함수
    const formatDateForInput = (dateString) => {
        const momentDate = moment.tz(dateString, 'Asia/Seoul');
        return momentDate.format('YYYY-MM-DDTHH:mm');
    };
    //일단 빈값으로 초기화해두기
    const [formData, setFormData] = useState({
        title: '',
        start: '',
        end: '',
        no: undefined,
        category: '',
        content:''
    });
    //event가 바뀔때 실행->이벤트클릭, 날짜클릭 나눠서 초기값 재세팅
    useEffect(() => {
        if (event) {
            // 이벤트 클릭 시 -> update, delete
            setFormData({
                title: event.title,
                start: formatDateForInput(event.start),
                end: formatDateForInput(event.end),
                no: event.extendedProps.no,
                category: event.extendedProps.category,
                content: event.extendedProps.content,
            });
        } else {
            // 날짜 클릭 시 -> create
            setFormData({
                title: '',
                start: '',
                end: '',
                no: undefined,
                category:'',
                content:'',
            });
        }
    }, [event]);

    //폼 안의 값이 바뀌는 것 처리
    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    //저장하기
    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    //수정하기
    const handleUpdate = () => {
        onUpdate(formData);
        onClose();
    };
    
    //삭제하기
    const handleDelete = () => {
        // 삭제 로직 수행
        onDelete(formData);
        console.log(formData);
        onClose();
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{action === '생성' ? 'New 일정 추가' : '일정 수정'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>일정 이름</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="일정 이름을 입력하세요"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formContent">
                        <Form.Label>내용</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formStart">
                        <Form.Label>시작 일시</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="start"
                            value={formData.start}
                            onChange={handleChange}
                            />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="formEnd">
                        <Form.Label>종료 일시</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="end"
                            value={formData.end}
                            onChange={handleChange}
                            />
                    </Form.Group>
                    <br/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    취소
                </Button>
                <Button variant="primary" onClick={action === '생성' ? handleSave : handleUpdate}>
                    {action === '생성' ? '저장' : '수정'}
                </Button>
                {action === '수정' && (
                    <Button variant="danger" onClick={handleDelete}>
                        삭제
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
