import { createSlice } from "@reduxjs/toolkit";

const programSlice = createSlice({
    name : "detailInfo",
    initialState:{value: null },
    reducers : 
    {
    setDetail:(state, action)=> {
        state.value = action.payload
        }
    },
    insertDetail: (state, action) => {
        state.value = action.payload;
    },
})
export const { setDetail, insertDetail } = programSlice.actions
export default programSlice;
