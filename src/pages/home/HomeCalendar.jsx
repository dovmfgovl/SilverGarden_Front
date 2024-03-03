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
import { useDispatch, useSelector } from "react-redux";
import { setCommonEvents } from "../../redux/commoncalendarSlice";

const HomeCalendar = ({
  urls,
  columnNames,
  calendarListOptions, //리스트 캘린더 옵션
  initialView, // 새로운 prop 추가
  eventData,
  handleDispatch,
}) => {
  const dispatch = useDispatch();
  // 공휴일 처리
  const commonEvents = useSelector((state) => state.commoncalendarSlice.events);
  console.log(commonEvents);
  const calendarAPIKey = process.env.REACT_APP_GOOGLE_CALENDAR_APIKEY;
  const calendarID = 'ko.south_korea#holiday@group.v.calendar.google.com';
  
  const fetchHolidays =  async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarID)}/events?key=${calendarAPIKey}`
        );
        if (!response.ok) {
        throw new Error(`Error fetching holidays: ${response.statusText}`);
      }
      console.log(response)
      const data = await response.json();
      const holidaysData = data.items;
      // 리덕스 액션을 호출하여 스토어에 공휴일 정보 저장
      dispatch(setCommonEvents(holidaysData));
      // console.log(data);
      console.log("api 요청");
      
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  }
  
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
      handleDispatch(formattedEvents);
      // fetchHolidays 함수 호출을 await으로 처리하여 기다림
    } catch (error) {
      // 에러 처리
      console.error("일정 조회 에러: ", error);
    }
  };
  
  // 일정 조회 로직
  useEffect(() => {
    // useEffect 함수를 async로 선언
    fetchAndDispatch();
    fetchHolidays();
    console.log(commonEvents);
  }, []);
  
  // commonEvents가 업데이트될 때마다 콘솔에 출력
  // useEffect(() => {
  //   console.log(commonEvents);
  // }, [commonEvents]);

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
    eventSources:[ 
      {
        events: eventData,
        color: 'black', // 사용자 정의 이벤트의 배경 색상
        textColor: 'white', // 사용자 정의 이벤트의 텍스트 색상
        borderColor: 'black',
      },
      {
        events: commonEvents.map((event) => ({
          title: event.summary,
          start: event.start.date || event.start.dateTime, // 공휴일 이벤트의 시작 날짜
          end: event.end.date || event.end.dateTime, // 공휴일 이벤트의 종료 날짜
          color: '#FFC0CB', // 공휴일 이벤트의 배경 색상
        })),
      },
    ],
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
