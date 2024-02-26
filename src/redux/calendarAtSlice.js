import { createSlice } from "@reduxjs/toolkit";

const calendarAtSlice = createSlice({
    name: "calendarSlice",
    initialState: {
        events: [],
    },
    reducers: {
        setAtEvents: (state, action) => {
            state.events = action.payload;
        },
    },
});

export const { setAtEvents } = calendarAtSlice.actions;
export default calendarAtSlice.reducer;
