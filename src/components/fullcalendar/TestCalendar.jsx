import React from 'react';
import CommonCalendar from './CommonCalendar';

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
        no: 'PS_NO2', 
        title: 'PS_NAME',
        start: 'PS_START',
        end: 'PS_END',
        color: 'COLOR', //카테고리별로 생성되는 색상
        category: 'PS_CATEGORY', //색상을 구분하는 카테고리
        content: 'PS_INFO'
    };

    return (
        <div>
            <h2>공통캘린더 사용(예시)</h2>
            <CommonCalendar
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