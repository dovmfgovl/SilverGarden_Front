import { configureStore } from "@reduxjs/toolkit";
import programSlice from "./programSlice"
import empInfoSlice from "./empInfoSlice"

const store = configureStore({
  reducer:{
    programSlice:programSlice.reducer,
    empInfoSlice:empInfoSlice.reducer
  }
})
export default store;