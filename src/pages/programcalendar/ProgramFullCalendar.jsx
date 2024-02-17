import React, { useState, useEffect } from 'react';
import { scheduleListDB } from '../../services/api/programApi';
import styles from './pgcalendar.module.css';
import { CommonCalendar } from '../../components/calendar/CommonCalendar';

const ProgramFullCalendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await scheduleListDB();  // 예시 함수, 실제 데이터를 가져오는 함수로 교체
            console.log(response);
            const scheduleData = response.data;  // 적절한 데이터로 교체
            console.log(scheduleData);
            const events = scheduleData.map((scheduleData) => ({
                title: scheduleData.PG_NAME,
                start: scheduleData.PG_START,
                end: scheduleData.PG_END,
                content: scheduleData.PG_CONTENT,
                repeatType: scheduleData.PG_REPEAT_TYPE,
                category: scheduleData.PG_CATEGORY,
                daysofweek: scheduleData.PG_DAYSOFWEEK,
            }));
            console.log(events);
            setEvents(events);
        } catch (error) {
            console.error(error);
        }
    }; 
    return (
        <div className={styles['pg-calendar-main']}>
            <CommonCalendar events={events}/>
        </div>
    );
};

export default ProgramFullCalendar;
