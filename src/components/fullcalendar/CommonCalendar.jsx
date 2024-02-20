import React, { useEffect, useState } from 'react';
import CommonCalendarLogic from './CommonCalendarLogic';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import CommonCalendarModal from './CommonCalendarModal';
import styles from './calendar.module.css';
import moment from 'moment-timezone';

const CommonCalendar = ({ onEventAdd, onEventUpdate, onEventDelete, urls, columnNames }) => {
    // console.log(urls);//컨트롤러 Url 확인 가능
    const [weekendsVisible, setWeekendsVisible] = useState(true);
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    //카테고리 관리 -> 모달창에서 카테고리 셀렉트 사용 가능
    const [categories, setCategories] = useState([]);

    //기본 초기화 세트
    const updateModalState = () => {
        setIsModalOpen(false);
        setModalAction(null);
        fetchEvents();
    };

      //주말 표시, 미표시
    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible);
    };

    // 일정 조회 로직
    const fetchEvents = async () => {
        // console.log('fetchEvents'); 
        try {
            const eventsData = await CommonCalendarLogic.listDB(urls.listURL);
            const formattedEvents = eventsData.map(event => ({
                title: event[columnNames.title],
                start: event[columnNames.start],
                end: event[columnNames.end],
                no: event[columnNames.no],
                color: event[columnNames.color],
                content: event[columnNames.content],
                category: event[columnNames.category],
                // 추가 필드들도 필요에 따라 변환
            }));
            setEvents(formattedEvents);
            // console.log(formattedEvents);
            // 카테고리 값 추출 및 상태로 관리
            const uniqueCategories = Array.from(new Set(formattedEvents.map(event => event.category)));
            setCategories(uniqueCategories);
            // console.log(uniqueCategories);
        } catch (error) {
            // 에러 처리
        }
    };
    //최초 한 번 이벤트 조회해서 띄우기
    useEffect(() => {
        fetchEvents();
    }, []);

    //모달 핸들링
    const handleModalAction = (action, event) => {
        console.log('Opening modal');  
        // console.log(action);  
        // console.log(event);  
        setModalAction(action);
        setSelectedEvent(event);
        setIsModalOpen(true);
    }; 
    
    //저장 모달
    const handleEventAdd = async (formData) => {
        console.log(formData); 
        try {
            const transformedData = {
                [columnNames.title]: formData.title,
                [columnNames.start]: formData.start,
                [columnNames.end]: formData.end,
                [columnNames.category]: formData.category,
                [columnNames.content]: formData.content,
                // 추가 필드들도 필요에 따라 변환
            };
            console.log(transformedData);
            await CommonCalendarLogic.addDB(urls.addURL, transformedData);
            onEventAdd(transformedData);
            updateModalState();
        } catch (error) {
            // 에러 처리
        }
    };
    //업데이트 모달
    const handleEventUpdate = async (formData) => {
        try {
            // 컬럼명을 변환하여 서버로 데이터 전송
            const transformedData = {
                [columnNames.title]: formData.title,
                [columnNames.start]: formData.start,
                [columnNames.end]: formData.end,
                [columnNames.no]: formData.no,
                [columnNames.category]: formData.category,
                [columnNames.content]: formData.content,
                // 추가 필드들도 필요에 따라 변환
            };
            console.log(transformedData);
            await CommonCalendarLogic.updateDB(urls.updateURL,transformedData);
            onEventUpdate(transformedData);
            updateModalState();
        } catch (error) {
            // 에러 처리
        }
    };
    //삭제액션 모달 
    const handleEventDelete = async (formData) => {
        console.log('handleModalDelete');
        try {
            // 컬럼명을 변환하여 서버로 데이터 전송
            const transformedData = {
                [columnNames.title]: formData.title,
                [columnNames.start]: formData.start,
                [columnNames.end]: formData.end,
                [columnNames.no]: formData.no,
                // 추가 필드들도 필요에 따라 변환
            };
            console.log(transformedData);//{PS_NAME: '진짜??', PS_START: '2024-01-31T16:03', PS_END: '2024-01-31T18:03', PS_NO2: 7}
            await CommonCalendarLogic.deleteDB(urls.deleteURL,transformedData);
                onEventDelete(transformedData);
                updateModalState();
        } catch (error) {
            // 에러 처리
        }
    };
    //모달 닫기  
    const handleEventClose = () => {
        updateModalState();
    };
    // FullCalendar 옵션 설정
    const calendarOptions = {
        height: '80vh',
        selectable: true,
        selectMirror: true,
        selectInfo: true,
        initialView: 'dayGridMonth',
        events: events,
        locale:'ko',
        timezone: 'local',
        editable: true,
        weekends: weekendsVisible, // 주말 표시 여부 설정
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        color:'{color}', //카테고리별 색상
        eventTextColor: 'black', 
        // 이벤트를 클릭한 경우
        eventClick: (info) => {
            handleModalAction('수정', info.event, categories);
        },
        // 이벤트를 드래그해서 이동한 경우
        eventDrop: (info) => {
            handleModalAction('수정', info.event, categories);
        },
        // 날짜가 선택되는경우(하루, 영역)
        selectAllow: () => {
            return true;
        },
        select: (selectInfo) => {
            const isSingleDay = selectInfo.startStr === selectInfo.endStr;
            let endDate = isSingleDay ? selectInfo.startStr : selectInfo.endStr;
        
            // 종료일이 하루 더해진 경우에는 하루를 빼서 설정
            if (!isSingleDay) {
                const endMoment = moment(endDate).subtract(1, 'days');
                endDate = endMoment.toISOString();
            }
            handleModalAction('생성', { start: selectInfo.startStr, end: endDate }, categories);
            return true; // 
        },
    };
    return (
        <>
            <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={weekendsVisible}
                onChange={handleWeekendsToggle}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                {weekendsVisible ? '주말 표시' : '주말 미표시'}
            </label>
            </div>
            <FullCalendar 
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin]}
                {...calendarOptions}
                className={styles.customCalendar}
            />
            {isModalOpen && (
                <CommonCalendarModal
                    show={isModalOpen}
                    action={modalAction}
                    event={selectedEvent}
                    onSave={handleEventAdd}  
                    onUpdate={handleEventUpdate}
                    onDelete={handleEventDelete}
                    onClose={handleEventClose}
                    categories={categories} 
                />
            )}
        </>
    );
};

export default CommonCalendar;