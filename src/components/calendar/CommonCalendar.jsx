// CommonCalendar.js
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import rrulePlugin from '@fullcalendar/rrule';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import { formatScheduleToEvent, getBackgroundColor } from './CalendarUtils';
import CalendarModalDetail from './CalendarModal';
import CalendarModalInsert from './CalendarModalInsert';

//사용하는 캘린더에서 가져온 값을 공통처리
const CommonCalendar = ({ events }) => {
  // console.log(events); 
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [calendarEvents, setCalendarEvents] = useState(events);
  const [modalShow, setModalShow] = useState('True');
  const [insertModalShow, setInsertModalShow] = useState(false);
  const [newEvent, setNewEvent] = useState(null);  // 새로운 일정을 저장할 상태 추가
  
  useEffect(() => {
    // 컴포넌트가 렌더링될 때 formattedEvents 실행
    setCalendarEvents(formattedEvents(events));
  }, [events]);
  
  const formattedEvents = (events) => {
    const formatted = events.map(eventData => formatScheduleToEvent(eventData));
    console.log('Formatted Events:', formatted);
    return formatted;
  }

  //주말 표시, 미표시
  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };
  
  const handleDeleteEvent = () => {
    const updatedEvents = calendarEvents.filter(event => event.id !== selectedEvent.id);
    setCalendarEvents(updatedEvents);
    setSelectedEvent(null);
    setModalShow(false); // 모달을 닫습니다.
  };

  const handleInsertEvent = (newEvent) => {
    // 여기서 새 일정을 추가하는 로직을 구현합니다.
    // newEvent를 calendarEvents에 추가하거나 API를 호출하여 서버에 저장할 수 있습니다.
    // 예시: setCalendarEvents([...calendarEvents, newEvent]);
    setCalendarEvents([...calendarEvents, newEvent]);

    // 모달 닫기
    setInsertModalShow(false);
  
    console.log('새 일정 추가:', newEvent);
  };

  return (
    <div>
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
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, rrulePlugin, listPlugin, bootstrap5Plugin]}
        themeSystem="bootstrap4"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        initialView="dayGridMonth"
        editable={true}
        dayMaxEvents={true}
        events={events}
        nowIndicator={true}
        select={(info) => {
          // 빈 영역을 클릭하여 새로운 일정을 추가할 때의 동작
          setInsertModalShow(true);
          setNewEvent({
            start: info.startStr,
            end: info.endStr,
          });
        }}
        selectable={true}
        selectMirror={true}
        weekends={weekendsVisible} 
        locale={'ko'}
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
        eventClick={(info) => setSelectedEvent(formatScheduleToEvent(info.event))}
        eventContent={(eventInfo) => {
          return {
            html: `<div style="background-color: ${getBackgroundColor(eventInfo.event.extendedProps.pgCategory)}; color: white;">${eventInfo.event.title}</div>`,
          };
        }}
      /> 
      {selectedEvent && (
        <CalendarModalDetail
          modalShow={modalShow === 'True'}  // 'True' 문자열이면 true, 아니면 false로 설정
          onHide={() => setModalShow(false)}
          selectedEvent={selectedEvent}
          events={calendarEvents}
          onDelete={handleDeleteEvent}
          setCalendarEvents={setCalendarEvents}
          setSelectedEvent={setSelectedEvent}
        />
      )}
        <CalendarModalInsert
          modalShow={insertModalShow}
          onHide={() => setInsertModalShow(false)}
          onInsert={handleInsertEvent}
          defaultDate={selectedEvent ? selectedEvent.start : null}
          />
    </div>
  );
};
export { CommonCalendar};