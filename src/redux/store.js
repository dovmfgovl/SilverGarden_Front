import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./userInfoSlice";

import programSlice from "./programSlice"

const store = configureStore({
  reducer:{
    programSlice:programSlice.reducer,
    userInfoSlice:userInfoSlice.reducer
  }
})
export default store;