import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
    name: "calendarSlice",
    initialState: {
        events: [],
        filteredEvents: [],
        filters: {
            searchTitle: "",
            selectedCategory: "",
        },
    },
    reducers: {
        setPgEvents: (state, action) => {
            console.log("calendarSlice setPgEvents", action.payload);
            state.events = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        setFilteredEvents: (state, action) => {
            // 새로운 액션으로 filteredEvents 업데이트
            const { events, filters } = state;
            const filteredData = events.filter((event) => {
                const isSearchMatch = !filters.searchTitle || event.title.includes(filters.searchTitle);
                const isCategoryMatch = !filters.selectedCategory || event.category === filters.selectedCategory;
                return isSearchMatch && isCategoryMatch;
            });

            state.filteredEvents = filteredData;
        },
    },
});

export const { setPgEvents, setFilters,setFilteredEvents } = calendarSlice.actions;
// 새로운 액션 추가
export const setCalendarEvents = (events) => (dispatch) => {
    dispatch(setPgEvents(events));
    // 필요하다면 setFilteredEvents 등 다른 액션들을 디스패치할 수도 있음
};

export default calendarSlice.reducer;