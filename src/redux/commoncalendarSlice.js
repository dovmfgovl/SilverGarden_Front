import { createSlice } from "@reduxjs/toolkit";

const commoncalendarSlice = createSlice({
    name: "commoncalendarSlice",
    initialState: {
        events: [],
    },
    reducers: {
        setCommonEvents: (state, action) => {
            state.events = action.payload;
        },
    },
});

export const { setCommonEvents } = commoncalendarSlice.actions;

export default commoncalendarSlice.reducer;
