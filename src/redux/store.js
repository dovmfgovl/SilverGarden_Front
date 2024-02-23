import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from './userInfoSlice';
import programSlice from "./programSlice";
import calendarSlice from "./calendarSlice";
import empInfosSlice from "./empInfosSlice";

const store = configureStore({
  reducer:{
    calendarSlice:calendarSlice, 
    programSlice:programSlice.reducer,
    userInfoSlice:userInfoSlice.reducer,
    empInfos:empInfosSlice,
  }
});

export default store;