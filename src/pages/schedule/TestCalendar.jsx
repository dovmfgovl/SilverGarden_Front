import React from "react";
import CommonCalendar from "../../components/fullcalendar/CommonCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const AdminCalendar = () => {
  const handleIndividualEventAdd = (event) => {
    console.log("Individual Calendar: Event Added", event);
    // 개별 캘린더에서 추가 이벤트 처리
  };

  const handleIndividualEventUpdate = (event) => {
    console.log("Individual Calendar: Event Updated", event);
    // 개별 캘린더에서 업데이트 이벤트 처리
  };

  const handleIndividualEventDelete = (event) => {
    console.log("Individual Calendar: Event Deleted", event);
    // 개별 캘린더에서 삭제 이벤트 처리
  };
  //스프링 컨트롤러 url 입력(기본 CRUD)
  const commonUrls = {
    listURL: "schedule/schedulelist",
    addURL: "schedule/scheduleinsert",
    updateURL: "schedule/scheduleupdate",
    deleteURL: "schedule/scheduledelete",
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
      <div style={{ marginRight: "5px", fontSize: "1.5rem" }}>
        <FontAwesomeIcon
          icon={faCalendar}
          style={{ marginRight: "5px", fontSize: "1.5rem" }}
        />
        전사일정
      </div>
      <CommonCalendar
        onEventAdd={handleIndividualEventAdd}
        onEventUpdate={handleIndividualEventUpdate}
        onEventDelete={handleIndividualEventDelete}
        urls={commonUrls}
        columnNames={columnNames}
      />
    </div>
  );
};

export default AdminCalendar;
