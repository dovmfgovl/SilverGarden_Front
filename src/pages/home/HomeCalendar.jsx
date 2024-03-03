import React, { useEffect } from "react";
import CommonCalendarLogic from "../../components/fullcalendar/CommonCalendarLogic";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from '@fullcalendar/timeline';
import listPlugin from "@fullcalendar/list";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

const HomeCalendar = ({
  urls,
  columnNames,
  calendarListOptions, //리스트 캘린더 옵션
  initialView, // 새로운 prop 추가
  eventData,
  handleDispatch
}) => {
  
  // 일정 조회 로직
  useEffect(() => {
    const fetchAndDispatch = async () => {
      try {
        const eventsData = await CommonCalendarLogic.listDB(urls.listURL);
        const formattedEvents = eventsData.map(eventData => {
          const formattedEvent = {};
          Object.keys(columnNames).forEach(key => {
            formattedEvent[key] = eventData[columnNames[key]];
          });
          return formattedEvent;
        });
        handleDispatch(formattedEvents); //이걸 공통으로 사용하고 있음!!
        const uniqueCategories = [...new Set(formattedEvents.map(event => event.category))];
        console.log(uniqueCategories);
      } catch (error) {
        // 에러 처리
        console.error("일정 조회 에러: ", error);
      }
    };
    fetchAndDispatch();
}, []);

  // FullCalendar 옵션 설정
  const calendarOptions = {
    height: 390,
    eventTimeFormat: { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    },
    selectMirror: true,
    select: true,
    locale: "ko",
    dayMaxEventRows: true, 
    dayMaxEvents: 3, 
    headerToolbar: {
      left: calendarListOptions? "prev,next" :"prev,next today",
      center: "title",
      right: calendarListOptions? null :"dayGridMonth,timeGridWeek,listWeek",
    },
    events: eventData,
    eventTextColor: "black",
    nowIndicator: false,
    eventOverlap: false,
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    ...calendarListOptions,
    initialView: initialView || "dayGridMonth", // prop 값이 없을 경우 기본값 설정
  };
  return (
    <>
      <div className="customCalendar">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin,
            bootstrap5Plugin,
            resourceTimelinePlugin,
            timelinePlugin
          ]}
          {...calendarOptions}
        />
      </div>
    </>
  );
};

export default HomeCalendar;
