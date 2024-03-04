import React, { useEffect, useState } from 'react'
import AtCalendar from './AtCalendar'
import { InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import styles from './atCalendar.module.css'
import WeekendToggle from '../../components/fullcalendar/WeekendToggle';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredEvents, setFilters, setAtEvents } from '../../redux/calendarAtSlice';
import styled from 'styled-components';

const AtCalendarHome = () => {
    const [searchTitle, setSearchTitle] = useState('');
    const [weekendsVisible, setWeekendsVisible] = useState(true); // 주말 표시 여부 상태 추가
    const [selectedCategory, setSelectedCategory] = useState('');

    const dispatch = useDispatch();
    const handleDispatch = (events)=>dispatch(setAtEvents(events));         //이벤트 리덕스 스토어 저장
    const handleFiltersChange = (filters) => dispatch(setFilters(filters)); //필터값 리덕스 스토어 저장

    const eventData = useSelector((state)=> state.calendarAtSlice.events);                //이벤트 데이터 가져오기
    const filters = useSelector((state) => state.calendarAtSlice.filters);               //필터값 가져오기
    const filteredEvents = useSelector((state) => state.calendarAtSlice.filteredEvents); //필터 데이터 가져오기

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(setFilteredEvents());
            console.log(eventData);
            console.log(filteredEvents);
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
        dispatch(setAtEvents(eventData.slice()));
        dispatch(setFilteredEvents());
        console.log(eventData);
        console.log(filteredEvents);
    };



    return (
        <div className={styles.atCalWrap}>
            <div className={styles.headerWrap }>
                <div className={styles.searchDropdownWrap}>
                    <InputGroup className="mb-3" style={{height:'20px', width:'250px'}}>
                        <FormControl
                            placeholder="사원명을 입력하세요"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            value={searchTitle}
                            onChange={handleSearchChange}
                            style={{textAlign:'center', fontSize:'0.85rem'}}
                        />
                        <Button onClick={handleRefresh} variant="outline-secondary" id="button-addon2" style={{backgroundColor:'#5C27FE', color:'white', height:'auto', border:'none'}}>
                            전체조회
                        </Button>
                    </InputGroup>
                    <DropdownButton id="dropdown-basic-button" title={selectedCategory || '전체'} onSelect={handleCategorySelect} variant="dark" style={{width:'100px'}}>
                        <Dropdown.Item eventKey="결근">결근</Dropdown.Item>
                        <Dropdown.Item eventKey="휴가">휴가</Dropdown.Item>
                        <Dropdown.Item eventKey="정상출근">정상출근</Dropdown.Item>
                        <Dropdown.Item eventKey="조퇴">조퇴</Dropdown.Item>
                        <Dropdown.Item eventKey="지각">지각</Dropdown.Item>
                    </DropdownButton>
                    <WeekendToggle weekendsVisible={weekendsVisible} setWeekendsVisible={setWeekendsVisible} />
                </div>
            </div>
            <div className={styles.monthWrap}>
                <AtCalendar
                    weekendsVisible={weekendsVisible}
                    eventData={eventData}
                    selectedCategory={selectedCategory}
                    handleDispatch={handleDispatch}
                    filteredEvents={filteredEvents} //title로 필터 검색을 사용한다면 사용
                />
            </div>
        </div>
    );
}


export default AtCalendarHome