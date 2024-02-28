import { createSlice } from "@reduxjs/toolkit";

const calendarAdminSlice = createSlice({
    name: "calendarAdminSlice",
    initialState: {
        events: [],
    },
    reducers: {
        setAdminEvents: (state, action) => {
            console.log("calendarAdminSlice setAdminEvents", action.payload);
            state.events = action.payload;
        },
    },
});

export const { setAdminEvents } = calendarAdminSlice.actions;
export default calendarAdminSlice.reducer;
