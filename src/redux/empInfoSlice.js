import { createSlice } from "@reduxjs/toolkit";

const empInfoSlice = createSlice({
  name:"empInfoSlice",
  initialState:{
    e_no: "202402_00000008",
    e_name: "이슬기",
    e_profile: "https://picsum.photos/200/200",
    dept_name: "간호부",
    e_rank: "대리"
  },
  reducer:{
    setEmpInfo:(state, action) =>{
      state.e_no = action.payload.e_no;
      state.e_name = action.payload.e_name;
      state.e_profile = action.payload.e_profile;
      state.dept_name = action.payload.dept_name;
      state.e_rank = action.payload.e_rank;
    }
  }
})

export default empInfoSlice;