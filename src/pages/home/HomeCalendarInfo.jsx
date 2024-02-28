import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAtEvents } from "../../redux/calendarAtSlice";
import HomeCalendar from "./HomeCalendar";

const HomeCalendarInfo = () => {
  //이부분 추가 & 프롭전달 추가///////////////////////////////////////////
  const eventData = useSelector((state) => state.calendarAtSlice.events);
  console.log(eventData);
  const dispatch = useDispatch();
  const handleDispatch = (events) => dispatch(setAtEvents(events));
  //이부분 추가/////////////////////////////////////////////////////////

  //스프링 컨트롤러 url 입력(기본 CRUD)
  const commonUrls = {
    listURL: "schedule/schedulelist",
    /* addURL: "schedule/scheduleinsert",
    updateURL: "schedule/scheduleupdate",
    deleteURL: "schedule/scheduledelete", */
  };
  // 개별 컴포넌트에서 사용할 데이터의 컬럼명 정의
  const columnNames = {
    no: "SC_NO",
    title: "SC_NAME",
    start: "SC_START",
    end: "SC_END",
    color: "COLOR", //카테고리별로 생성되는 색상
    category: "SC_CATEGORY", //색상을 구분하는 카테고리
    content: "SC_INFO",
  };

  return (
    <div>
      <HomeCalendar
        urls={commonUrls}
        columnNames={columnNames}
        //이부분 추가///////////////////////////////
        eventData={eventData}
        handleDispatch={handleDispatch}
        //이부분 추가///////////////////////////////
      />
    </div>
  );
};

export default HomeCalendarInfo;
