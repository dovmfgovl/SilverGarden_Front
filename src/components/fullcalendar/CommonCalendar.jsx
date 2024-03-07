import React, { useEffect, useState } from "react";
import CommonCalendarLogic from "./CommonCalendarLogic";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from '@fullcalendar/timeline';
import listPlugin from "@fullcalendar/list";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import CommonCalendarModal from "./CommonCalendarModal";
import moment from "moment-timezone";
import "./FullCalendarContainer.css";
import { useSelector } from "react-redux";
import googleCalendarPlugin from '@fullcalendar/google-calendar';

const CommonCalendar = ({
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  weekendsVisible,
  urls,
  columnNames,
  calendarListOptions, //리스트 캘린더 옵션
  initialView, // 새로운 prop 추가
  eventData,
  handleDispatch,
  filteredEvents,
  defaultCategories
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  
//기본 초기화 세트
  const updateModalState = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };
  const commonEvents = useSelector((state) => state.commoncalendarSlice.events);

  // 일정 조회 로직
  const fetchAndDispatch = async () => {
    try {
      const eventsData = await CommonCalendarLogic.listDB(urls.listURL);
      const formattedEvents = eventsData.map((eventsData) => ({
        title: eventsData[columnNames.title],
        start: eventsData[columnNames.start],
        end: eventsData[columnNames.end],
        no: eventsData[columnNames.no],
        color: eventsData[columnNames.color],
        content: eventsData[columnNames.content],
        category: eventsData[columnNames.category],
      }));
      handleDispatch(formattedEvents); 
      const uniqueCategories = [...new Set(formattedEvents.map(event => event.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      // 에러 처리
    }
  };

  useEffect(() => {
    fetchAndDispatch();
  }, [isModalOpen]);

  //모달 핸들링
  const handleModalAction = (action, event) => {
    setModalAction(action);
    setSelectedEvent(event);
    setIsModalOpen(true);
    const eventCategory = event.extendedProps?.category || '';
    console.log('Selected Event Category:', eventCategory);
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
      await CommonCalendarLogic.updateDB(urls.updateURL, transformedData);
      onEventUpdate(transformedData);
      updateModalState();
    } catch (error) {
      // 에러 처리
    }
  };
  //삭제액션 모달
  const handleEventDelete = async (formData) => {
    console.log("handleModalDelete");
    try {
      // 컬럼명을 변환하여 서버로 데이터 전송
      const transformedData = {
        [columnNames.title]: formData.title,
        [columnNames.start]: formData.start,
        [columnNames.end]: formData.end,
        [columnNames.no]: formData.no,
        [columnNames.content]: formData.content,
      };
      await CommonCalendarLogic.deleteDB(urls.deleteURL, transformedData);
      onEventDelete(transformedData);
      updateModalState();
    } catch (error) {
      console.log(error);
    }
  };
  //모달 닫기
  const handleEventClose = () => {
    updateModalState();
  };

  // FullCalendar 옵션 설정
  const calendarOptions = {
    height: 660,
    eventTimeFormat: { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    },
    selectable: true,
    selectMirror: true,
    locale: "ko",
    expandRows: true, //드래그로 확장
    editable: true,
    weekends: weekendsVisible, // 주말 표시 여부 설정
    dayMaxEventRows: true, 
    dayMaxEvents: 3, 
    headerToolbar: {
      left: calendarListOptions? "prev,next" :"prev,next today",
      center: "title",
      right: calendarListOptions? "today" :"dayGridMonth,timeGridWeek,listWeek",

    },
    eventSources:[ 
      {
        events: filteredEvents ? filteredEvents : eventData,
        color: 'black', // 사용자 정의 이벤트의 배경 색상
        textColor: 'white', // 사용자 정의 이벤트의 텍스트 색상
        borderColor: 'black',
      },
      {
        events: commonEvents.map((event) => ({
          className: "custom-event", // 여기에 CSS 클래스 이름을 추가
          title: event.summary,
          start: event.start.date || event.start.dateTime, // 공휴일 이벤트의 시작 날짜
          end: event.end.date || event.end.dateTime, // 공휴일 이벤트의 종료 날짜
          color: '#FFC0CB', // 공휴일 이벤트의 배경 색상
          // eventTitle : 'red', // 공휴일 이벤트의 텍스트 색상
        })),
      },
    ],
    nowIndicator: false,
    eventOverlap: false,
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    ...calendarListOptions,
    initialView: initialView || "dayGridMonth", // prop 값이 없을 경우 기본값 설정
    eventClick: (info) => {
      handleModalAction("수정", info.event, categories);
    },
    // 이벤트를 드래그해서 이동한 경우
    eventDrop: (info) => {
      handleModalAction("수정", info.event, categories);
    },
    // 날짜가 선택되는경우(하루, 영역)
    selectAllow: () => {
      return true;
    },
    eventResize: ({ event }) => {
      // 일정이 늘어난 경우의 처리 로직
      handleModalAction("수정", event, categories);
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
      <div className="customCalendar">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin,
            bootstrap5Plugin,
            resourceTimelinePlugin,
            timelinePlugin,
            googleCalendarPlugin
          ]}
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
          defaultCategories={defaultCategories}
        />
      )}
    </>
  );
};

export default CommonCalendar;
