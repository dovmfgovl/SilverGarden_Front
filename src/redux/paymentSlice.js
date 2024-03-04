import { createSlice } from "@reduxjs/toolkit";

const paymentDetail = createSlice({
  name : "paymentDetail",
  initialState:{
value : 0
  },
  reducers : {
    setPaymentDetail:(state, action) => {
      state.value = action.payload
    }
  }
})
export default paymentDetail;
export const {setPaymentDetail} = paymentDetail.actions