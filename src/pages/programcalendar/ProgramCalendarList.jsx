import React, { useEffect, useState } from 'react';
import CommonCalendarLogic from '../../components/fullcalendar/CommonCalendarLogic';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import CommonCalendarModal from '../../components/fullcalendar/CommonCalendarModal';
import moment from 'moment-timezone';
import '../../components/fullcalendar/FullCalendarContainer.css';
import { useSelector } from 'react-redux';

const CommonCalendarList = ({ onEventAdd, onEventUpdate, onEventDelete, urls, columnNames}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    //카테고리 관리 -> 모달창에서 카테고리 셀렉트 사용 가능
    const categories=['신체', '교양', '문화', '교육', '여가'];
    //상태 초기화 세트
    const updateModalState = () => {
        setIsModalOpen(false);
        setModalAction(null);
    };
    const eventTest = useSelector((state)=>state.calendarSlice.events);
    console.log(eventTest);


    //모달 핸들링
    const handleModalAction = (action, event) => {
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
        height: 660, //캘린더 높이
        slotMinTime: '08:00', //최소시간
        slotMaxTime: '24:00', //최대시간
        expandRows: true, //드래그로 확장
        navLinks: true, //버튼 링크 사용
        selectable: true,
        selectMirror: true,
        select: true,
        nowIndicator: true,
        initialView: 'timeGridDay',
        locale:'ko',
        editable: true,
        dayMaxEvents: true,
        dayMaxEventRows: true, // for all non-TimeGrid views
        views: {
            timeGrid: {
                dayMaxEventRows: 6 // adjust to 6 only for timeGridWeek/timeGridDay
            }
        },
        eventTimeFormat: { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        },
        titleFormat:{
            month: 'long',
            day: 'numeric'
        },
        events: eventTest,
        eventTextColor: 'black', 
        // 이벤트를 클릭한 경우
        eventClick: (info) => {
            handleModalAction('수정', info.event, categories);
        },
        // 이벤트를 드래그해서 이동한 경우
        eventDrop: (info) => {
            handleModalAction('수정', info.event, categories);
        },
        // 이벤트를 드래그해서 확장(또는 줄이는) 경우
        eventResize: (info) => {
            // 확장(또는 줄이기)한 이벤트의 날짜 정보를 전달
            handleModalAction('수정', info.event, categories);
        },
        // 날짜가 선택되는경우(하루, 영역)
        selectAllow: () => {
            return true;
        },
        select: ({ startStr, endStr }) => {
            const isSingleDay = startStr === endStr;
            let endDate = isSingleDay ? startStr : endStr;
        
        // 종료일이 하루 더해진 경우에는 하루를 빼서 설정
        if (!isSingleDay) {
            const endMoment = moment(endDate).subtract(1, "days");
            endDate = endMoment.toISOString();
        }
        handleModalAction(
            "생성",
            { start: startStr, end: endDate },
            categories
        );
        return true;
        },
    };
    return (
        <>
            <div className="customCalendarList">
                <FullCalendar 
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin]}
                    {...calendarOptions}
                />
            </div>
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

export default CommonCalendarList;