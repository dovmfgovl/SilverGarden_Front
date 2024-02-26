import React from 'react';
import CommonCalendar from './CommonCalendar';
import { useDispatch, useSelector } from 'react-redux';

const TestCalendar = () => {
    //이부분 추가
    const eventData = useSelector((state) => state.calendarAtSlice.events);
    const dispatch = useDispatch();
    
    
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
        listURL: 'at/atList',
        /* addURL: 'at/atInsert', */
        updateURL: 'at/adminAtUpdate',
        /* deleteURL: 'at/delete', */
    };
    // 개별 컴포넌트에서 사용할 데이터의 컬럼명 정의
    const columnNames = {
        no: 'AT_DATE', 
        title: 'E_NAME',
        start: 'AT_START',
        end: 'AT_END',
        color: 'COLOR', //카테고리별로 생성되는 색상
        category: 'AT_STATUS', //색상을 구분하는 카테고리
        content: 'E_NO'
    };
    

    return (
        <div>
            <CommonCalendar
                onEventAdd={handleIndividualEventAdd}
                onEventUpdate={handleIndividualEventUpdate}
                onEventDelete={handleIndividualEventDelete}
                urls={commonUrls}
                columnNames={columnNames}
                eventData={eventData}
            />
        </div>
    );
}


export default TestCalendar;