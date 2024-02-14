// ProgramFulCalendar.js
import React, { useState, useEffect, useRef } from 'react';
import { CommonCalendar, getWeekdayNumber, getBackgroundColor } from '../../components/calendar/CommonCalendar';
import { scheduleListDB, updateEventDB } from '../../services/api/programApi';
import styles from './pgcalendar.module.css'

const ProgramFullCalendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const modalRef = useRef(null);

    useEffect(() => {
        if (isModalOpen) {
            modalRef.current.addEventListener('click', handleModalClickOutside);
        }

        return () => {
            if (isModalOpen) {
                modalRef.current.removeEventListener('click', handleModalClickOutside);
            }
        };
    }, [isModalOpen]);

    const handleModalClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const openModal = (event) => {
        setIsModalOpen(true);
        setSelectedEvent(event);
    };

    const fetchEvents = async () => {
        try {
            const response = await scheduleListDB();
            const data = response.data;
            const initialEvents = data.map((schedule) => {
                // 시작 날짜의 날짜 부분은 시작 주기로, 시간 부분은 캘린더에 자세하게 표시되는 시간으로 변환
                const start = new Date(schedule.PG_START);
                const end = new Date(schedule.PG_END);

                return {
                    title: schedule.PG_NAME,
                    start: formatDate(start), // 시작 날짜를 ISO 문자열로 변환
                    end: formatDate(end), // 종료 날짜를 ISO 문자열로 변환
                    allDay: isAllDayEvent(start, end),
                    content: schedule.PG_CONTENT,
                    rrule: {
                        freq: getFrequency(schedule.pg_repeat_type),
                        byweekday: getWeekdayNumber(schedule.PG_DAYSOFWEEK),
                        dtstart: start.toISOString(),
                        until: end.toISOString(),
                    },
                    pgCategory: schedule.PG_CATEGORY,
                };
            });
            setEvents(initialEvents);
        } catch (error) {
            console.error(error);
        }
    };

    // 날짜를 원하는 형식으로 포맷팅하는 함수
    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        return date.toLocaleString('en-US', options);
    };
    //주기에 따른 표시 설정
    const getFrequency = (repeatType) => {
        switch (repeatType) {
            case '매주':
                return 'weekly';
            case '격주':
                return { freq: 'weekly', interval: 2 }; // 격주의 경우 주기를 2로 설정
            case '매월':
                return 'monthly';
            case '격월':
                return { freq: 'monthly', interval: 2 }; // 격월의 경우 주기를 2로 설정
            default:
                return 'weekly';
        }
    };

    const handleEventClick = (arg) => {
        console.log('이벤트 클릭:', arg);
        openModal(arg.event);
    };

    const handleEventDrop = async (arg) => {
        console.log('이벤트 드롭:', arg);
        try {
            await updateEventDB(arg.event.id, {
                start: arg.event.start,
                end: arg.event.end,
                // ... (기타 필요한 업데이트 정보)
            });
        } catch (error) {
            console.error('이벤트 업데이트 실패:', error);
        }
    };

    // 추가된 함수
    const isAllDayEvent = (start, end) => {
        // 시작 시간과 종료 시간이 같다면 종일 이벤트로 처리
        return start === end;
    };

    const handleDayClick = (date) => {
        const newEvent = {
            title: '새 이벤트',
            start: date.toISOString(),
            end: date.toISOString(),
            allDay: true,
            content: '',
            rrule: null,
            pgCategory: '', // 새 이벤트의 카테고리 지정 필요
        };

        openModal(newEvent);
    };

    return (
        <div className={styles['pg-calendar-main']}>
            <CommonCalendar
                events={events} // 프로그램 리스트를 CommonCalendar로 전달
                handleEventClick={handleEventClick}
                handleEventDrop={handleEventDrop}
                handleDayClick={handleDayClick}
                getBackgroundColor={(pgCategory) => getBackgroundColor(pgCategory)}
                selectedEvent={selectedEvent}
                closeModal={closeModal}
            />
        </div>
    );
};
export default ProgramFullCalendar;
