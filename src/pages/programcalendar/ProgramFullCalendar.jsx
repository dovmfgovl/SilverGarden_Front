// ProgramFulCalendar.js
import React, { useState, useEffect } from 'react';
import { CommonCalendar, getWeekdayNumber } from '../../components/calendar/CommonCalendar';
import { scheduleListDB } from '../../services/api/programApi';
import styles from './pgcalendar.module.css';

const ProgramFullCalendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await scheduleListDB();
            const data = response.data;
            const initialEvents = data.map((schedule) => formatScheduleToEvent(schedule));
            setEvents(initialEvents);
        } catch (error) {
            console.error(error);
        }
    };

    const formatScheduleToEvent = (schedule) => {
        const start = new Date(schedule.PG_START);
        const end = schedule.PG_END ? new Date(schedule.PG_END) : start;

        return {
            title: schedule.PG_NAME,
            start: formatDateToShortString(start),
            end: formatDateToShortString(end),
            content: schedule.PG_CONTENT,
            rrule: {
                freq: getFrequency(schedule.PG_REPEAT_TYPE),
                dtstart: start.toISOString(),
                until: end.toISOString(),
            },
            pgCategory: schedule.PG_CATEGORY,
        };
    };

    const formatDateToShortString = (date) => {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        return date.toLocaleString('ko-KR', options);
    };

    const getFrequency = (repeatType) => {
        switch (repeatType) {
            case '매주':
                return 'weekly';
            case '매월':
                return 'monthly';
            default:
                return 'weekly';
        }
    };

    return (
        <div className={styles['pg-calendar-main']}>
            <CommonCalendar
                events={events}
                getWeekdayNumber={getWeekdayNumber}
            />
        </div>
    );
};

export default ProgramFullCalendar;
