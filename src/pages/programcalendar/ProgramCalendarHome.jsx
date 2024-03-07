import React, { useEffect, useState } from 'react'
import ProgramCalendar from './ProgramCalendar'
import { InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import styles from './programcalendarhome.module.css'
import ProgramListCalendar from './ProgramListCalendar'
import WeekendToggle from '../../components/fullcalendar/WeekendToggle';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredEvents, setFilters, setPgEvents } from '../../redux/calendarSlice';

const ProgramCalendarHome = () => {
    const [searchTitle, setSearchTitle] = useState('');
    const [weekendsVisible, setWeekendsVisible] = useState(true); // 주말 표시 여부 상태 추가
    const [selectedCategory, setSelectedCategory] = useState('');

    const dispatch = useDispatch();
    const handleDispatch = (events)=> {
        console.log("디스패치")
        dispatch(setPgEvents(events))
    };         //이벤트 리덕스 스토어 저장
    const handleFiltersChange = (filters) => dispatch(setFilters(filters)); //필터값 리덕스 스토어 저장

    const eventData = useSelector((state)=>state.calendarSlice.events);                //이벤트 데이터 가져오기
    const filters = useSelector((state) => state.calendarSlice.filters);               //필터값 가져오기
    const filteredEvents = useSelector((state) => state.calendarSlice.filteredEvents); //필터 데이터 가져오기
    
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(setFilteredEvents());
            // console.log(eventData);
            // console.log(filteredEvents);
        };
    
        fetchData();
    }, [filters, eventData]);
    
    //카테고리 선택시
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        
        let newFilters = { ...filters, selectedCategory: category };
    
        if (category === '전체') {
            newFilters = { ...newFilters, searchTitle: '' };
        }
    
        dispatch(setFilters(newFilters));
        dispatch(setFilteredEvents());
    };
    
    // handleSearchChange 함수에도 선택된 카테고리가 '전체'인 경우의 처리를 추가
    const handleSearchChange = (e) => {
        setSearchTitle(e.target.value);
    
        const newFilters = { ...filters, searchTitle: e.target.value };
    
        if (selectedCategory === '전체') {
            handleRefresh();
        } else {
            dispatch(setFilters(newFilters));
        }
    
        dispatch(setFilteredEvents());
    };
    //초기화(필터초기, 이벤트데이터 가져오기)
    const handleRefresh = () => {
        setSearchTitle('');
        setSelectedCategory('전체');
        dispatch(setFilters({ searchTitle: '', selectedCategory: '' }));
        dispatch(setPgEvents(eventData.slice())); 
        dispatch(setFilteredEvents()); 
        console.log(eventData);
        console.log(filteredEvents);
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
                            placeholder="일정을 입력하세요"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            value={searchTitle}
                            onChange={handleSearchChange}
                            style={{textAlign:'center'}}
                        />
                        <Button onClick={handleRefresh} variant="outline-secondary" id="button-addon2" style={{backgroundColor:'#006BFF', color:'white', height:'auto'}}>
                            전체조회
                        </Button>
                    </InputGroup>
                    <DropdownButton id="dropdown-basic-button" title={selectedCategory || '전체'} onSelect={handleCategorySelect} style={{width:'100px'}}>
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
                <ProgramCalendar 
                    weekendsVisible={weekendsVisible} 
                    eventData={eventData} 
                    selectedCategory={selectedCategory} 
                    handleDispatch={handleDispatch} //양쪽 캘린더 동기화됨
                    filteredEvents={filteredEvents} //title로 필터 검색을 사용한다면 사용
                    />
            </div>
            <div className={styles.listWrap }>
                <ProgramListCalendar
                    filteredEvents={filteredEvents} //title로 필터 검색을 사용한다면 사용
                    eventData={eventData} 
                    handleDispatch={handleDispatch} //양쪽 캘린더 동기화됨
                />
            </div>
        </div>
    );
}


export default ProgramCalendarHome