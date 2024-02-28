import React, { useEffect, useState } from "react";
import CarCalendarLogic from "./CarCalendarLogic";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from '@fullcalendar/timeline';
import listPlugin from "@fullcalendar/list";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import moment from "moment-timezone";
import "./FullCalendarContainer.css";
import CarCalendarModal from "./CarCalendarModal";
import { useDispatch, useSelector } from "react-redux";

const CarCalendar = ({
  
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  urls,
  columnNames,
  headerToolbar,
  eventData,
  handleDispatch
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [resources, setResources] = useState([]);
  const [formattedEvents, setFormattedEvents] = useState([]); // 상태값으로 변경
  const [categories, setCategories] = useState([]);
  const userData =useSelector(state => state.userInfoSlice);
  const dispatch=useDispatch();

  const updateModalState = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };
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
          [columnNames.car_no]: formData.car_no,
          [columnNames.user]: formData.user,
          [columnNames.userno]: formData.userno,
          REG_ID: userData.e_no,
          MOD_ID: userData.e_no,
          // 추가 필드들도 필요에 따라 변환
        };
        console.log(transformedData);
        await CarCalendarLogic.addDB(urls.addURL, transformedData);
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
          [columnNames.car_no]: formData.car_no,
          [columnNames.user]: formData.user,
          [columnNames.userno]: formData.userno,
          MOD_ID: userData.e_no
          // 추가 필드들도 필요에 따라 변환
        };
        console.log(transformedData);
        await CarCalendarLogic.updateDB(urls.updateURL, transformedData);
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
        await CarCalendarLogic.deleteDB(urls.deleteURL, transformedData);
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
  
  useEffect(() => {
    const fetchAndDispatch = async () => {
      try {
        const eventsData = await CarCalendarLogic.listDB(urls.listURL);
        const formattedEvents = eventsData.map((eventData) => {
          return {
            resourceId: eventData[columnNames.category], //타임라인 세로값으로 들어가는 이름(예 : 차량1, 차량2, 차량3)
            title: eventData[columnNames.title],         //타임라인 표시제목
            start: eventData[columnNames.start],
            end: eventData[columnNames.end],
            color: eventData[columnNames.color],
          };
        });
        handleDispatch(formattedEvents); //이걸 공통으로 사용하고 있음!!
        const uniqueCategories = [...new Set(formattedEvents.map(event => event.resourceId))]; //모달에 이벤트의 카테고리 목록으로 뜨게하는부분
        setCategories(uniqueCategories);
        console.log(uniqueCategories);
        const resources = eventsData.reduce((resourceArray, eventData) => {
          const id = eventData[columnNames.category]; //위 리소스 아이디와 동일한 값으로 사용함. 
          const existingResource = resourceArray.find((resource) => resource.id === id); //리소스Id = id값들이 매칭처리 -> 타임라인으로 표시 
          if (!existingResource) {
            resourceArray.push({
              id: id,    //테이블의 카테고리로 들어가는 값(예 : 차1, 차2, 차3), 아래 타이틀과 같아도 상관없음. 
              title: id, //리소스의 이름으로 하고 싶은 값(예 : 모닝, 스파크, 스타렉스)
            });
          }
          return resourceArray;
        }, []);
        setResources(resources);
        setFormattedEvents(formattedEvents); // 상태값 업데이트
        console.log(formattedEvents);
        console.log(resources);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAndDispatch();
  }, []);

  // FullCalendar 옵션 설정
  const calendarOptions = {
    height: 660,
    eventTimeFormat: { 
      hour: '2-digit', 
      minute: '2-digit', 
      meridiem: false
    },
    selectable: true,
    selectMirror: true,
    // select: true,
    locale: "ko",
    expandRows: true, //드`래`그로 확장
    editable: true,
    dayMaxEventRows: true, 
    dayMaxEvents: 3, 
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: headerToolbar || "dayGridMonth,timeGridWeek,listWeek",
    },
    events: eventData,
    scrollTime: '08:00',
    aspectRatio: 1.5,
    eventTextColor: "black",
    nowIndicator: false,
    eventOverlap: false,
    select: ({ startStr, endStr }) => {
      const isSingleDay = startStr === endStr;
      let endDate = isSingleDay ? startStr : endStr;
      
      // 종료일이 하루 더해진 경우에는 하루를 빼서 설정
      if (!isSingleDay) {
        const endMoment = moment(endDate).subtract(1, "days");
        endDate = endMoment.format(); // ISO8601 문자열로 변환
      }
    },
    // 타임라인
    eventSources: [
      {
        events: formattedEvents, 
        color: 'black',
        textColor: 'white',
      },
    ],
    views: {
      resourceTimelineDay: {
        buttonText: ':15 slots',
        slotDuration: '00:15',
        slotLabelFormat: {
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: 'short',
        },
      },
      resourceTimelineTenDay: {
        type: 'resourceTimeline',
        duration: { days: 10 },
        buttonText: '10 days',
      },
    },
    resources :resources,
    initialView: 'resourceTimelineDay',
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
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
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin,
            bootstrap5Plugin,
            resourceTimelinePlugin,
            timelinePlugin,
          ]}
          {...calendarOptions}
        />
      </div>
      {isModalOpen && (
        <CarCalendarModal
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

export default CarCalendar;