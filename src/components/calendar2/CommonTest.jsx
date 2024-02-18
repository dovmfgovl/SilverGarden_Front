import React, { useEffect, useState } from 'react';
import TestLogic from './TestLogic';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import CustomModal from './CommonModal';

const CommonTest = ({ onEventAdd, onEventUpdate, onEventDelete, urls, columnNames }) => {
    const [events, setEvents] = useState([]);
    console.log(urls);//{listURL: 'calendar/list', addURL: 'calendar/add', updateURL: 'calendar/update', deleteURL: 'calendar/delete'}
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    //기본 초기화 세트
    const updateModalState = () => {
        setIsModalOpen(false);
        setModalAction(null);
        fetchEvents();
    };
    // 일정 조회 로직
    const fetchEvents = async () => {
        console.log('fetchEvents'); 
        try {
            const eventsData = await TestLogic.listDB(urls.listURL);
            const formattedEvents = eventsData.map(event => ({
                title: event[columnNames.title],
                start: event[columnNames.start],
                end: event[columnNames.end],
                no: event[columnNames.no],
                // 추가 필드들도 필요에 따라 변환
            }));
            setEvents(formattedEvents);
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
        console.log(action);  
        console.log(event);  
        setModalAction(action);
        setSelectedEvent(event);
        setIsModalOpen(true);
    }; 
    
    //저장 모달
    const handleEventAdd = async (formData) => {
        console.log(formData); //{title: 'aaa', start: '2024-02-01T22:50', end: '2024-02-02T22:50', no: undefined}
        try {
            const transformedData = {
                [columnNames.title]: formData.title,
                [columnNames.start]: formData.start,
                [columnNames.end]: formData.end,
                // 추가 필드들도 필요에 따라 변환
            };
            console.log(transformedData);//{PS_NAME: 'aaaaa', PS_START: '2024-02-01T22:51', PS_END: '2024-02-02T22:51'}
            await TestLogic.addDB(urls.addURL, transformedData);
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
                // 추가 필드들도 필요에 따라 변환
            };
            console.log(transformedData);
            await TestLogic.updateDB(urls.updateURL,transformedData);
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
            await TestLogic.deleteDB(urls.deleteURL,transformedData);
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
        selectable: true,
        selectMirror: true,
        initialView: 'dayGridMonth',
        events: events,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        locale:'ko',
        editable: true,
        // 날짜를 클릭한 경우, 새로운 이벤트를 생성하는 모달 열기 로직 추가
        dateClick: (info) => {
            handleModalAction('create', null);
        },
        // 이벤트를 클릭한 경우
        eventClick: (info) => {
            handleModalAction('update', info.event);
        },
        // 이벤트를 드래그해서 이동한 경우
        eventDrop: (info) => {
            handleModalAction('update', info.event);
        },
    };
    
    return (
        <>
            <FullCalendar 
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin]}
                {...calendarOptions}
                
            />
            {isModalOpen && (
                <CustomModal
                    show={isModalOpen}
                    action={modalAction}
                    event={selectedEvent}
                    onSave={handleEventAdd}  
                    onUpdate={handleEventUpdate}
                    onDelete={handleEventDelete}
                    onClose={handleEventClose}
                />
            )}
        </>
    );
};

export default CommonTest;