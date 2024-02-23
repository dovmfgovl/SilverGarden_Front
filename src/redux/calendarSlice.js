import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
    name: "calendarSlice",
    initialState: {
        events: [],
    },
    reducers: {
        setPgEvents: (state, action) => {
            state.events = action.payload;
        },
        // 다른 액션들 추가 가능
    },
});

export const { setPgEvents } = calendarSlice.actions;
export default calendarSlice.reducer;