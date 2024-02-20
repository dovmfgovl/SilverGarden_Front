import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment-timezone';

const CommonCalendarModal = ({ action, event, onSave, onUpdate, onDelete, onClose, categories }) => {
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
                title: event.title || '',
                start: formatDateForInput(event.start) || '',
                end: formatDateForInput(event.end) || '',
                no: event.extendedProps?.no || '', 
                category: event.extendedProps?.category || '', // 수정된 부분
                content: event.extendedProps?.content || '',
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
        const confirmAdd = window.confirm("생성하시겠습니까?");
        if(confirmAdd){
            onSave(formData);
            onClose();
        }
        onClose();
    };

    //수정하기
    const handleUpdate = () => {
        const confirmUpdate = window.confirm("수정하시겠습니까?");
        if(confirmUpdate){
            onUpdate(formData);
            onClose();
        }
        onClose();
    };
    
    //삭제하기
    const handleDelete = () => {
        const confirmDelete = window.confirm("삭제하시겠습니까?");
        if(confirmDelete){
            onDelete(formData);
            onClose();
        }
        onClose();
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton style={{backgroundColor:'#E6E6FA'}}>
                <Modal.Title style={{fontWeight:'bolder'}}>{action === '생성' ? '일정 추가' : '일정 수정'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label style={{fontSize:'20px', margin:'15px', fontWeight:'bolder'}}>일정 이름</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="일정 이름을 입력하세요"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formContent">
                        <Form.Label style={{fontSize:'20px', margin:'15px', fontWeight:'bolder'}}>내용</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={1}
                            style={{ height: '80px' }}  // 원하는 높이로 조절
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategory">
                        <Form.Label style={{fontSize:'20px', margin:'15px', fontWeight:'bolder'}}>카테고리</Form.Label>
                        <Form.Control
                            as="select"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="" >카테고리를 선택하세요</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formStart">
                        <Form.Label style={{fontSize:'20px', margin:'15px', fontWeight:'bolder'}}>시작 일시</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="start"
                            value={formData.start}
                            onChange={handleChange}
                            />
                    </Form.Group>
                    <Form.Group controlId="formEnd">
                        <Form.Label style={{fontSize:'20px', margin:'15px', fontWeight:'bolder'}}>종료 일시</Form.Label>
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
            <Modal.Footer style={{backgroundColor:'#E6E6FA'}}>
                <Button style={{fontWeight:'bolder'}} variant="outline-secondary" onClick={onClose}>
                    취소
                </Button>
                <Button style={{fontWeight:'bolder'}} variant="outline-primary"  onClick={action === '생성' ? handleSave : handleUpdate}>
                    {action === '생성' ? '저장' : '수정'}
                </Button>
                {action === '수정' && (
                    <Button style={{fontWeight:'bolder'}} variant="outline-danger" onClick={handleDelete}>
                        삭제
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default CommonCalendarModal;
