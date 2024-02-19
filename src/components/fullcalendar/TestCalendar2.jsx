import React from 'react';
import CommonTest from './CommonCalendar';

const TestCalendar2 = () => {
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
        listURL: 'program/pgList',
        addURL: 'program/pgInsert',
        updateURL: 'program/pgUpdate',
        deleteURL: 'program/pgDelete',
    };
      // 개별 컴포넌트에서 사용할 데이터의 컬럼명 정의
    const columnNames = {
        title: 'PG_NAME',
        start: 'PG_START',
        end: 'PG_END',
        no: 'PG_NO',
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

export default TestCalendar2;