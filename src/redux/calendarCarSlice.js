import { createSlice } from "@reduxjs/toolkit";



const calendarCarSlice = createSlice({ //태규
    name: "calendarCarSlice",
    initialState: {
        events: [],
    },
    reducers: {
        setCarEvents: (state, action) => {
            console.log("calendarCarSlice setAtEvents:", action.payload);
            state.events = action.payload;
        },
    },
});

export const { setCarEvents } = calendarCarSlice.actions;
export default calendarCarSlice.reducer;
