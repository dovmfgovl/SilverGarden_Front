import React, { useState } from 'react'
import ProgramCalendar from './ProgramCalendar'
import { InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import styles from './programcalendarhome.module.css'
import ProgramListCalendar from './ProgramListCalendar'

const ProgramCalendarHome = () => {
    const [searchTitle, setSearchTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const handleSearchChange = (e) => {
        setSearchTitle(e.target.value);
    };
    
    const handleCategorySelect = (category) => {
        setSelectedCategory(category); // '신체', '교양' 등의 카테고리 값을 설정
    };

    const [sharedEvent, setSharedEvent] = useState([]);

    const handleEvents = (events) =>{
        console.log("받아옴:"+events);
        setSharedEvent(events)
    }
    
    return (
        <div className={styles.programCalWrap}>
            <div className={styles.headerWrap }>
                <div className={styles.mainTitleWrap}>
                    <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '5px', fontSize:'1.5rem'}} />
                    월간 일정
                </div>
                <div className={styles.searchDropdownWrap}>
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
                    <DropdownButton id="dropdown-basic-button" title="카테고리" onSelect={handleCategorySelect}>
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
                <ProgramCalendar handleEvents={handleEvents}/>
            </div>
            <div className={styles.listWrap }>
                <ProgramListCalendar sharedEvent={sharedEvent} />
            </div>
        </div>
    );
}


export default ProgramCalendarHome