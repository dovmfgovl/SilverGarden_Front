import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getShuttleList, shuttleUpdate } from "../services/api/carApi";

export const getCarList = createAsyncThunk(
  'shuttle/getCarList',
  async () => {
    try {
      const response = await getShuttleList();
      return response.data;
    } catch (error) {
      console.error('Error fetching Car list: ', error);
      throw error;
    }
  }
);

export const saveCarDetails = createAsyncThunk(
  'shuttle/saveCarDetails',
  async (updatedCar) => {
    try {
      const response = await shuttleUpdate(updatedCar);
      return response.data;
    } catch (error) {
      console.error('Error updating Car details: ', error);
      throw error;
    }
  }
);

const carSlice = createSlice({
  name: "carSlice",
  initialState: {
    value: [],
    selectedCar: null,

  },
  reducers: {
    setDetail: (state, action) => {
      state.selectedCar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarList.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(saveCarDetails.fulfilled, (state, action) => {
        if (state.selectedCar) { // 선택된 멤버가 있는 경우에만 업데이트
          state.selectedCar = action.payload;
        }
      })
  }
});

export const { setDetail } = carSlice.actions;
export default carSlice.reducer;
