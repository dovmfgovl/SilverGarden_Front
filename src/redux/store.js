import { configureStore } from "@reduxjs/toolkit";
import empInfoSlice from "./empInfoSlice";

const store = configureStore({
  reducer:{
    empInfoSlice:empInfoSlice.reducer
  }
})
export default store;