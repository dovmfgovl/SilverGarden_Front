import React from 'react';
import CommonCalendar2 from './CommonCalendar2';

const TestTimeLine = () => {
    const handleIndividualEventAdd = (event) => {
        console.log('Individual Calendar: Event Added', event);
        // 개별 캘린더에서 추가 이벤트 처리
    };
    
    const handleIndividualEventUpdate = (event) => {
        console.log('Individual Calendar: Event Updated', event);
        // 개별 캘린더에서 업데이트 이벤트 처리
    };
    
    const handleIndividualEventDelete = (event) => {
        console.log('Individual Calendar: Event Deleted', event);
        // 개별 캘린더에서 삭제 이벤트 처리
    };
    //스프링 컨트롤러 url 입력(기본 CRUD)
    const commonUrls = {
        listURL: 'calendar/list',
        addURL: 'calendar/add',
        updateURL: 'calendar/update',
        deleteURL: 'calendar/delete',
    };
      // 개별 컴포넌트에서 사용할 데이터의 컬럼명 정의
    const columnNames = {
        no: 'PG_NO',       //구분값
        title: 'PS_NAME',  //타임라인에 표시되는 이름(예 : 병원동행, 은행방문 등)
        start: 'PS_START', //예약 시작일시
        end: 'PS_END',     //예약 종료일시
        color: 'COLOR',           //카테고리별로 생성되는 색상
        category: 'PS_CATEGORY',  ////타임라인 세로값으로 들어가는 이름(예 : 차량1, 차량2, 차량3) & 색상을 구분하는 카테고리, 
        content: 'PS_INFO'        //클릭시 세부내용값(예 : content)
    };
    
    //타임라인용
    const headerToolbarRight = 'resourceTimelineDay,resourceTimelineTenDay,resourceTimelineMonth,resourceTimelineYear'; //타임라인용
    //참고 : https://fullcalendar.io/docs/resourceAreaColumns
    return (
        <div>
            <CommonCalendar2
                onEventAdd={handleIndividualEventAdd}
                onEventUpdate={handleIndividualEventUpdate}
                onEventDelete={handleIndividualEventDelete}
                urls={commonUrls}
                columnNames={columnNames}
                //타임라인 사용시
                headerToolbar={headerToolbarRight}
            />
        </div>
    );
}

export default TestTimeLine;