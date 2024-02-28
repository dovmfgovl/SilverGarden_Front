import React, { useState } from 'react'
import ProgramCalendar from './ProgramCalendar'
import { InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import styles from './programcalendarhome.module.css'
import ProgramListCalendar from './ProgramListCalendar'
import WeekendToggle from '../../components/fullcalendar/WeekendToggle';
import { useDispatch, useSelector } from 'react-redux';
import { setPgEvents } from '../../redux/calendarSlice';

const ProgramCalendarHome = () => {
    const [searchTitle, setSearchTitle] = useState('');
    const [weekendsVisible, setWeekendsVisible] = useState(true); // 주말 표시 여부 상태 추가
    const [selectedCategory, setSelectedCategory] = useState('');
    const [originData, setOriginData] = useState([]);

    const eventData = useSelector((state)=>state.calendarSlice.events);
    console.log(eventData);
    const dispatch = useDispatch();
    const handleDispatch = (events)=>dispatch(setPgEvents(events)); 
    
    const handleSearchChange = (e) => {
        setSearchTitle(e.target.value);
    };
    const handleCategorySelect = (category) => {
        setSelectedCategory(category); // '신체', '교양' 등의 카테고리 값을 설정
        const newData = [...eventData.filter((element)=> element.category === category)]
        dispatch(setPgEvents(newData))
    };
    
    return (
        <div className={styles.programCalWrap}>
            <div className={styles.headerWrap }>
                <div className={styles.subTitleWrap }>
                    <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '5px', fontSize:'1.5rem'}}/>
                    월간 일정
                </div>
                <div className={styles.searchDropdownWrap}>
                    <WeekendToggle weekendsVisible={weekendsVisible} setWeekendsVisible={setWeekendsVisible} />
                    <InputGroup className="mb-3" style={{height:'20px', width:'250px'}}>
                        <FormControl
                            placeholder="검색어를 입력하세요"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            value={searchTitle}
                            onChange={handleSearchChange}
                            style={{textAlign:'center'}}
                        />
                        <Button variant="outline-secondary" id="button-addon2" style={{backgroundColor:'#4a6bff96', color:'white', height:'auto'}}>
                            검색
                        </Button>
                    </InputGroup>
                    <DropdownButton id="dropdown-basic-button" title={selectedCategory || '전체 카테고리'} onSelect={handleCategorySelect} style={{width:'100px'}}>
                        <Dropdown.Item eventKey="전체">전체 카테고리</Dropdown.Item>
                        <Dropdown.Item eventKey="신체">신체</Dropdown.Item>
                        <Dropdown.Item eventKey="교양">교양</Dropdown.Item>
                        <Dropdown.Item eventKey="문화">문화</Dropdown.Item>
                        <Dropdown.Item eventKey="교육">교육</Dropdown.Item>
                        <Dropdown.Item eventKey="여가">여가</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            <div className={styles.subTitleWrap }>
                <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '5px', fontSize:'1.5rem'}} />
                오늘의 일정
            </div>
            <div className={styles.monthWrap }>
                <ProgramCalendar eventData={eventData} selectedCategory={selectedCategory} weekendsVisible={weekendsVisible} handleDispatch={handleDispatch}/>
            </div>
            <div className={styles.listWrap }>
                <ProgramListCalendar eventData={eventData} />
            </div>
        </div>
    );
}


export default ProgramCalendarHome