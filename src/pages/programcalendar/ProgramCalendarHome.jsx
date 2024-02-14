import React from 'react'
import styles from './pgcalendar.module.css'
import ProgramFullCalendar from './ProgramFullCalendar'

const ProgramCalendarHome = () => {
    return (
        <div className={styles['pg-calendar']}>
            <ProgramFullCalendar />
        </div>
    )
}

export default ProgramCalendarHome