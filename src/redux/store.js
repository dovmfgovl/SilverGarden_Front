import { configureStore } from "@reduxjs/toolkit";
import empInfosSlice from './empInfosSlice';
import empInfoSlice from "./empInfoSlice";

const store = configureStore({
  reducer:{
    empInfos: empInfosSlice,
    empInfoSlice:empInfoSlice.reducer
  }
})

export default store;