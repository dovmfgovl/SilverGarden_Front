import { createSlice } from "@reduxjs/toolkit";

const deptDetail = createSlice({
  name : "deptDetail",
  initialState:{
value : 0
  },
  reducers : {
    setDeptDetail:(state, action) => {
      state.value = action.payload
    }
  }
})
export default deptDetail;
export const {setDeptDetail} = deptDetail.actions

