import React from 'react';
import CommonTest from './CommonTest';

const TestCalendar = () => {
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
        title: 'PS_NAME',
        start: 'PS_START',
        end: 'PS_END',
        no: 'PS_NO2',
    };

    return (
        <div>
            <h2>Individual Calendar</h2>
            <CommonTest
                onEventAdd={handleIndividualEventAdd}
                onEventUpdate={handleIndividualEventUpdate}
                onEventDelete={handleIndividualEventDelete}
                urls={commonUrls}
                columnNames={columnNames}
            />
        </div>
    );
}

export default TestCalendar;
