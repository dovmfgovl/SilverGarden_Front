import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import styles from "./fullcalendar.module.css";

const CommonCalendarModal = ({ action, event, onSave, onUpdate, onDelete, onClose, categories, defaultCategories }) => {
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
                end: formatDateForInput(event.end) || moment.tz(event.start, 'Asia/Seoul').add(1, 'hour').format('YYYY-MM-DDTHH:mm'),
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
        <div>
        <Modal show={true} onHide={onClose} className="modalForm" style={{height:'auto', alignItems:'center', fontSize:'0.5rem'}}>
            <Modal.Header closeButton style={{backgroundColor:'#794ff7', color:'white'}}>
                <Modal.Title style={{fontWeight:'bolder', fontSize:'1rem', height:'auto'}}><FontAwesomeIcon icon={faCalendarDays} />  {action === '생성' ? '새로운 일정 추가' : '기존 일정 수정'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle" style={{marginTop:'10px'}}>
                        <Form.Label style={{fontSize:'1rem', fontWeight:'bolder'}}>이름</Form.Label>
                        <Form.Control
                            style={{fontSize:'0.8rem'}}
                            type="text"
                            placeholder="내용을 입력하세요"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formContent" style={{marginTop:'10px'}}>
                        <Form.Label style={{fontSize:'1rem', fontWeight:'bolder'}}>내용</Form.Label>
                        <Form.Control
                            style={{fontSize:'0.8rem', height: '50px' }}
                            as="textarea"
                            rows={1}
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategory" style={{marginTop:'10px'}}>
                        <Form.Label style={{fontSize:'1rem', fontWeight:'bolder'}}>카테고리</Form.Label>
                        <Form.Control
                            style={{fontSize:'0.8rem'}}
                            as="select"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="" >카테고리를 선택하세요</option>
                            {defaultCategories ? (
                                defaultCategories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))
                                ) : (
                                //개별 사전설정 카테고리 없을때
                                categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formStart" style={{marginTop:'10px'}}>
                    <Form.Label style={{ fontSize: '1rem', fontWeight: 'bolder', marginRight: '10px' }}>시작 일시</Form.Label>
                        <Form.Control
                            style={{fontSize:'0.8rem'}}
                            type="datetime-local"
                            name="start"
                            value={formData.start}
                            onChange={handleChange}
                            />
                    </Form.Group>
                    <Form.Group controlId="formEnd" style={{marginTop:'10px'}}>
                        <Form.Label style={{fontSize:'1rem', fontWeight:'bolder'}}>종료 일시</Form.Label>
                        <Form.Control
                            style={{fontSize:'0.8rem'}}
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
                <Button style={{fontWeight:'bolder', fontSize:'0.8rem'}} variant="outline-secondary" onClick={onClose}>
                    취소
                </Button>
                <Button style={{fontWeight:'bolder', fontSize:'0.8rem'}} variant="outline-primary"  onClick={action === '생성' ? handleSave : handleUpdate}>
                    {action === '생성' ? '저장' : '수정'}
                </Button>
                {action === '수정' && (
                <Button style={{fontWeight:'bolder', fontSize:'0.8rem'}} variant="outline-danger" onClick={handleDelete}>
                    삭제
                </Button>
                )}
            </Modal.Footer>
        </Modal>
        </div>
    );
};

export default CommonCalendarModal;
