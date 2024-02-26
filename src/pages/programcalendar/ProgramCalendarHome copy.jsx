import React, { useState } from 'react'
import ProgramCalendar from './ProgramCalendar'
import { InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import styles from './programcalendarhome.module.css'
import ProgramListCalendar from './ProgramListCalendar'
import { useSelector } from 'react-redux';
import WeekendToggle from '../../components/fullcalendar/WeekendToggle';

const ProgramCalendarHome = () => {
    const [searchTitle, setSearchTitle] = useState('');
    const [weekendsVisible, setWeekendsVisible] = useState(true); // 주말 표시 여부 상태 추가
    const [selectedCategory, setSelectedCategory] = useState('');


    const handleSearchChange = (e) => {
        setSearchTitle(e.target.value);
    };

    const eventData = useSelector((state)=>state.calendarSlice.events);
    console.log(eventData);
    
    const handleCategorySelect = (category) => {
        setSelectedCategory(category); // '신체', '교양' 등의 카테고리 값을 설정
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
                    <div className="btn-group">
                        <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            {selectedCategory || '전체 카테고리'}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#" onClick={() => handleCategorySelect('전체 카테고리')}>전체 카테고리</a></li>
                            <li><hr className="dropdown-divider"></hr></li>
                            <li><a className="dropdown-item" href="#" onClick={() => handleCategorySelect('신체')}>신체</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => handleCategorySelect('교양')}>교양</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => handleCategorySelect('문화')}>문화</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => handleCategorySelect('교육')}>교육</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => handleCategorySelect('여가')}>여가</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.subTitleWrap }>
                <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '5px', fontSize:'1.5rem'}} />
                오늘의 일정
            </div>
            <div className={styles.monthWrap }>
                <ProgramCalendar eventData={eventData} selectedCategory={selectedCategory} weekendsVisible={weekendsVisible}/>
            </div>
            <div className={styles.listWrap }>
                <ProgramListCalendar eventData={eventData} />
            </div>
        </div>
    );
}


export default ProgramCalendarHome