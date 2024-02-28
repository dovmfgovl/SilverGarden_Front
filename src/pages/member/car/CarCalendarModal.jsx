import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getMemList } from '../../../redux/memberSlice';
import { getCarList } from '../../../redux/carSlice';

const CarCalendarModal = ({ action, event, onSave, onUpdate, onDelete, onClose, categories }) => {
    // 날짜 형식을 변환하는 함수
    const dispatch=useDispatch();
    const memberList = useSelector(state => state.memberSlice.value);
    const CarList = useSelector(state => state.carSlice.value);
    useEffect(()=>{
        dispatch(getMemList())
        dispatch(getCarList())
    },[dispatch])

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
        content:'',
        car_no: '',
        user_no: '',
        user: '',
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
                car_no: event.extendedProps?.car_no || '',
                user_no: event.extendedProps?.user_no || '',
                user: event.extendedProps?.user || '',
            });
        } else {
            // 날짜 클릭 시 -> create
            setFormData({
                title: '',
                start: '',
                end: '',
                no: undefined,
                category: '',
                content:'',
                car_no: '',
                user_no: '',
                user: '',
            });
        }
    }, [event]);

    //폼 안의 값이 바뀌는 것 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));

        // 카테고리가 변경될 때 자동차번호 설정
        if (name === 'category') {
            const selectedCar = CarList.find(car => car.SHUTTLE_TYPE === value);
            if (selectedCar) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    car_no: selectedCar.SHUTTLE_NO,
                }));
            }
        }

        // 이용자가 변경될 때 이용자번호 설정
        if (name === 'user') {
            const selectedUser = memberList.find(user => user.CLIENT_NAME === value);
            if (selectedUser) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    user_no: selectedUser.CLIENT_ID,
                }));
            }
        }
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
            <Modal.Header closeButton style={{backgroundColor:'#6e95f796'}}>
                <Modal.Title style={{fontWeight:'bolder', fontSize:'1rem', height:'auto'}}><FontAwesomeIcon icon={faCalendarDays} />  {action === '생성' ? '새로운 일정 추가' : '기존 일정 수정'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle" style={{marginTop:'10px'}}>
                        <Form.Label style={{fontSize:'1rem', fontWeight:'bolder'}}>일정제목</Form.Label>
                        <Form.Control
                            style={{fontSize:'0.8rem'}}
                            type="text"
                            placeholder="일정제목을 입력하세요"
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
                        <Form.Select
                            style={{fontSize:'0.8rem'}}
                            as="select"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option  >카테고리를 선택하세요</option>
                            {CarList.map((category) => (
                                <option key={category.SHUTTLE_NO} value={category.SHUTTLE_TYPE}>
                                    {category.SHUTTLE_TYPE}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formUser" style={{marginTop:'10px'}}>
                        <Form.Label style={{fontSize:'1rem', fontWeight:'bolder'}}>이용자</Form.Label>
                        <Form.Select
                            style={{fontSize:'0.8rem'}}
                            as="select"
                            name="user"
                            value={formData.user}
                            onChange={handleChange}
                        >
                            <option >이용자를 선택하세요</option>
                            {memberList.map((user) => (
                                <option key={user.CLIENT_ID} >
                                    {user.CLIENT_NAME}
                                </option>
                            ))}
                        </Form.Select>
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
                    <Form.Group >
                    <Form.Label style={{fontSize:'1rem', fontWeight:'bolder'}}>이용자와 차번호</Form.Label>
                        <Form.Control
                            style={{fontSize:'0.8rem'}}
                            type="text"
                            disabled
                            placeholder='자동차번호'
                            name="car_no"
                            value={formData.car_no}
                           
                            />
                        <Form.Control
                            style={{fontSize:'0.8rem'}}
                            type="text"
                            disabled
                            placeholder='이용자번호'
                            name="user_no"
                            value={formData.user_no}
                            
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

export default CarCalendarModal;
