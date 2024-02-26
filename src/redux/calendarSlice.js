import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
    name: "calendarSlice",
    initialState: {
        events: [],
        filters: {
            searchTitle: "",
            selectedCategory: "",
        },
    },
    reducers: {
        setPgEvents: (state, action) => {
            state.events = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
    },
});

export const { setPgEvents, setFilters } = calendarSlice.actions;
export default calendarSlice.reducer;
