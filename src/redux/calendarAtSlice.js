import { createSlice } from "@reduxjs/toolkit";

const calendarAtSlice = createSlice({ //슬기
    name: "calendarAtSlice",
    initialState: {
        events: [],
    },
    reducers: {
        setAtEvents: (state, action) => {
            console.log("calendarAtSlice setAtEvents:", action.payload);
            state.events = action.payload;
        },
    },
});

export const { setAtEvents } = calendarAtSlice.actions;
export default calendarAtSlice.reducer;
