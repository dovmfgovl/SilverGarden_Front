import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name:"userInfoSlice",
  initialState:{},
  reducers:{
    setEmpInfo:(state, action) =>{
      state.e_no = action.payload.e_no;
      state.e_name = action.payload.e_name;
      state.e_profile = action.payload.e_profile;
      state.dept_name = action.payload.dept_name;
      state.e_rank = action.payload.e_rank;
    }
  }
})

export default userInfoSlice;