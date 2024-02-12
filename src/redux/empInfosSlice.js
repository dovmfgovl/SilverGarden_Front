import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { empListDB } from "../services/api/empInfoApi";

// 비동기 작업을 처리하는 thunk 액션 정의
export const getEmpList = createAsyncThunk(
  'empInfos/getEmpList',
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

const empInfosSlice = createSlice({
  name: "empInfos",
  initialState: { 
    value: [],
    searchKeyword: '',
    includeResigned: false,
    selectedEmployee: null
  },
  reducers: {
    setDetail: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    setSearchKeywords: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setShowAll: (state) => {
      state.searchKeyword = '';
      state.includeResigned = false;
    },
    toggleIncludeResigned: (state) => {
      state.includeResigned = !state.includeResigned;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getEmpList.fulfilled, (state, action) => {
      state.value = action.payload;
    })
  }
});

// 액션과 리듀서 내보내기
export const { setDetail, setSearchKeywords, setShowAll, toggleIncludeResigned } = empInfosSlice.actions;
export default empInfosSlice.reducer;