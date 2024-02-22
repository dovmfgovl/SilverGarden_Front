import React, { useEffect, useState } from "react";
import CommonCalendarLogic from "./CommonCalendarLogic";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import CommonCalendarModal from "./CommonCalendarModal";
import moment from "moment-timezone";
import "./FullCalendarContainer.css";

const CommonCalendar = ({
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  urls,
  columnNames,
  handleEvents,
}) => {
  // console.log(urls);//컨트롤러 Url 확인 가능
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  //카테고리 관리 -> 모달창에서 카테고리 셀렉트 사용 가능
  const [categories, setCategories] = useState([]);

  //기본 초기화 세트
  const updateModalState = () => {
    setIsModalOpen(false);
    setModalAction(null);
    fetchEvents();
  };

  // 일정 조회 로직
  const fetchEvents = async () => {
    try {
      const eventsData = await CommonCalendarLogic.listDB(urls.listURL);
      const formattedEvents = eventsData.map((event) => ({
        title: event[columnNames.title],
        start: event[columnNames.start],
        end: event[columnNames.end],
        no: event[columnNames.no],
        color: event[columnNames.color],
        content: event[columnNames.content],
        category: event[columnNames.category],
        // 추가 필드들도 필요에 따라 변환
      }));
      setEvents(formattedEvents);
      // 카테고리 값 추출 및 상태로 관리
      const uniqueCategories = Array.from(
        new Set(formattedEvents.map((event) => event.category))
      );
      setCategories(uniqueCategories);
    } catch (error) {
      // 에러 처리
    }
    //handleEvents(events)
  };
  //최초 한 번 이벤트 조회해서 띄우기
  useEffect(() => {
    fetchEvents();
    //handleEvents(events)
  }, []);

  //모달 핸들링
  const handleModalAction = (action, event) => {
    console.log("Opening modal");
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
        // 추가 필드들도 필요에 따라 변환
      };
      await CommonCalendarLogic.deleteDB(urls.deleteURL, transformedData);
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
    height: 600,
    selectable: true,
    selectMirror: true,
    selectInfo: true,
    initialView: "dayGridMonth",
    locale: "ko",
    expandRows: true, //드래그로 확장
    timezone: "local",
    editable: true,
    dayMaxEvents: true,
    weekends: weekendsVisible, // 주말 표시 여부 설정
    dayMaxEventRows: true, // for all non-TimeGrid views
    views: {
      timeGrid: {
        dayMaxEventRows: 6, // adjust to 6 only for timeGridWeek/timeGridDay
      },
    },
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,listWeek",
    },
    events: events,
    textColor: "black",
    color: "{color}", //카테고리별 색상
    eventTextColor: "black",
    nowIndicator: false,
    eventOverlap: false,
    eventMargin: "1",
    // 이벤트를 클릭한 경우
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
    select: (selectInfo) => {
      const isSingleDay = selectInfo.startStr === selectInfo.endStr;
      let endDate = isSingleDay ? selectInfo.startStr : selectInfo.endStr;

      // 종료일이 하루 더해진 경우에는 하루를 빼서 설정
      if (!isSingleDay) {
        const endMoment = moment(endDate).subtract(1, "days");
        endDate = endMoment.toISOString();
      }
      handleModalAction(
        "생성",
        { start: selectInfo.startStr, end: endDate },
        categories
      );
      return true; //
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
        />
      )}
    </>
  );
};

export default CommonCalendar;
