import { createSlice } from "@reduxjs/toolkit";

const calendarAtSlice = createSlice({ //슬기
    name: "calendarAtSlice",
    initialState: {
        events: [],
        filteredEvents: [],
        filters: {
            searchTitle: "",
            selectedCategory: "",
        },
    },
    reducers: {
        setAtEvents: (state, action) => {
            console.log("calendarAtSlice setAtEvents:", action.payload);
            state.events = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        setFilteredEvents: (state, action) => {
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

export const { setAtEvents, setFilters, setFilteredEvents } = calendarAtSlice.actions;

// 새로운 액션 추가
export const setCalendarEvents = (events) => (dispatch) => {
    dispatch(setAtEvents(events));
    // 필요하다면 setFilteredEvents 등 다른 액션들을 디스패치할 수도 있음
};
export default calendarAtSlice.reducer;
