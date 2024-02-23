import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  empListDB, empUpdateDB } from "../services/api/empInfoApi";

// 비동기 작업을 처리하는 thunk 액션 정의
export const getEmpList = createAsyncThunk(
  'choose/getEmpList',
  async () => {
    try {
      const response = await empListDB(); // API 호출로 직원 목록 가져오기
      return response.data; // API 응답에서 데이터만 변환
    } catch (error) {
      // 에러 발생 시 처리
      console.error('Error fetching employee list: ', error);
      throw error; // 에러를 잡아 상위로 전파
    }
  }
);

export const saveEmpDetails = createAsyncThunk(
  'choose/saveEmpDetails',
  async (updatedEmployee) => {
    try {
      const response = await empUpdateDB(updatedEmployee); // API 호출로 직원 정보 업데이트
      return response.data; // API 응답에서 데이터만 변환
    } catch (error) {
      // 에러 발생 시 처리
      console.error('Error updating employee details: ', error);
      throw error; // 에러를 잡아 상위로 전파
    }
  }
);


const chooseEmpSlice = createSlice({
  name: "chooseEmp",
  initialState: { 
    value: [],
    selectedEmployee: null
  },
  reducers: {
    setDetail: (state, action) => {
      state.selectedEmployee = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmpList.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(saveEmpDetails.fulfilled, (state, action) => {
        state.selectedEmployee = action.payload; // 선택된 직원 정보 업데이트
      })   
  }
});

// 액션과 리듀서 내보내기
export const  {setDetail} = chooseEmpSlice.actions;
export default chooseEmpSlice.reducer;