import { createSlice } from "@reduxjs/toolkit";

const paymentClientDetail = createSlice({
  name : "paymentClientDetail",
  initialState:{
value : 0
  },
  reducers : {
    setClientDetail:(state, action) => {
      state.value = action.payload
    }
  }
})
export default paymentClientDetail;
export const {setClientDetail} = paymentClientDetail.actions