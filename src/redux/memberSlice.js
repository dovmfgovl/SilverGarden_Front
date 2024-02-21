import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getMemberList, memberUpdate } from "../services/api/memberApi";

export const getMemList = createAsyncThunk(
  'member/getMemList',
  async (params) => {
    try {
      const response = await getMemberList(params);
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
    selectedMember: null,
  },
  reducers: {
    setDetail: (state, action) => {
      state.selectedMember = action.payload;
    },
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

export const { setDetail } = memberSlice.actions;
export default memberSlice.reducer;
