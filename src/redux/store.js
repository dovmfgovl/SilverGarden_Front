import { configureStore } from "@reduxjs/toolkit";
import empInfoSlice from "./userInfoSlice";

const store = configureStore({
  reducer:{
    empInfoSlice:empInfoSlice.reducer
  }
})
export default store;