import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCounselList, getMemberList, memberUpdate } from "../services/api/memberApi";

export const getMemList = createAsyncThunk(
  'member/getMemList',
  async () => {
    try {
      const response = await getMemberList();
      return response.data;
    } catch (error) {
      console.error('Error fetching member list: ', error);
      throw error;
    }
  }
);


export const saveMemDetails = createAsyncThunk(
  'member/saveMemDetails',
  async (updatedMember) => {
    try {
      const response = await memberUpdate(updatedMember);
      return response.data;
    } catch (error) {
      console.error('Error updating member details: ', error);
      throw error;
    }
  }
);

const memberSlice = createSlice({
  name: "memberSlice",
  initialState: {
    value: [],
    searchKeyword: '',
    selectedMember: null,
    searchResult: [] // 새로운 상태 추가: 검색 결과를 저장
  },
  reducers: {
    setDetail: (state, action) => {
      state.selectedMember = action.payload;
    },
    setSearchKeywords: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setShowAll: (state) => {
      state.searchKeyword = '';
      state.searchResult = []; // 모두 보기를 클릭하면 검색 결과 초기화
    },
    updateSearchResult: (state, action) => {
      state.searchResult = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMemList.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(saveMemDetails.fulfilled, (state, action) => {
        if (state.selectedMember) { // 선택된 멤버가 있는 경우에만 업데이트
          state.selectedMember = action.payload;
        }
      })
  }
});

export const { setDetail, setSearchKeywords, setShowAll, updateSearchResult } = memberSlice.actions;
export default memberSlice.reducer;
