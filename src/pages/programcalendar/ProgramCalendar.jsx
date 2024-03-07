import React from 'react';
import CommonCalendar from '../../components/fullcalendar/CommonCalendar';

const ProgramCalendar = ({eventData, weekendsVisible, handleDispatch, filteredEvents}) => {
    //기본설정 카테고리 있을때! 사용////////
    // const defaultCategories = ["1", "2", "3"];
    
    //스프링 컨트롤러 url 입력(기본 CRUD)
    const commonUrls = {
        listURL: 'calendar/list',
        addURL: 'calendar/add',
        updateURL: 'calendar/update',
        deleteURL: 'calendar/delete',
    };
      // 개별 컴포넌트에서 사용할 데이터의 컬럼명 정의
    const columnNames = {
        no: 'PS_NO',
        title: 'PS_NAME',
        start: 'PS_START',
        end: 'PS_END',
        color: 'COLOR', 
        category: 'PS_CATEGORY', 
        content: 'PS_INFO'
    };
        
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
    

    return (
        <div>
            <CommonCalendar
                onEventAdd={handleIndividualEventAdd}
                onEventUpdate={handleIndividualEventUpdate}
                onEventDelete={handleIndividualEventDelete}
                urls={commonUrls}
                columnNames={columnNames}
                eventData={eventData}
                weekendsVisible={weekendsVisible}
                handleDispatch={handleDispatch}
                filteredEvents={filteredEvents}
                // defaultCategories={defaultCategories}
            />
        </div>
    );
}

export default ProgramCalendar;