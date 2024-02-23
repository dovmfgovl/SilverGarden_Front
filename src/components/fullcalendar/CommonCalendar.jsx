import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {setPgEvents} from '../../redux/calendarSlice'

const CommonCalendar = ({
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  urls,
  columnNames,
}) => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  //카테고리 관리 -> 모달창에서 카테고리 셀렉트 사용 가능
  const [categories, setCategories] = useState([]);
  //기본 초기화 세트
  const dispatch = useDispatch();
  
  const updateModalState = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };
  
  // 일정 조회 로직
  useEffect(() => {
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
        //setEvents(formattedEvents);
        dispatch(setPgEvents(formattedEvents)); // 이 부분을 여기로 이동
      } catch (error) {
        // 에러 처리
      }
    };
    fetchAndDispatch();
  }, []);

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

  const calendarRef = useRef(null);

  const handleEventAddOrUpdate = () => {
    // 이벤트 추가 또는 수정 로직 수행
    // 변경 사항 적용을 위해 캘린더 이벤트를 새로고침
    const calendarApi = calendarRef.current.getApi();
    calendarApi.refetchEvents();
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
    select: true,
    initialView: "dayGridMonth",
    locale: "ko",
    expandRows: true, //드`래`그로 확장
    editable: true,
    weekends: weekendsVisible, // 주말 표시 여부 설정
    dayMaxEventRows: true, 
    dayMaxEvents: 3, 
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,listWeek",
    },
    events: eventTest,
    eventTextColor: "black",
    nowIndicator: false,
    eventOverlap: false,
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
          key={eventTest.size} // 이벤트 배열의 길이를 키로 사용
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
