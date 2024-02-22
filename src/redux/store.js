import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from './userInfoSlice';

import programSlice from "./programSlice"
import empInfosSlice from "./empInfosSlice";
import deptDetail from "./deptSlice";

const store = configureStore({
  reducer:{
    programSlice:programSlice.reducer,
    userInfoSlice:userInfoSlice.reducer,
    empInfos:empInfosSlice,
    deptDetail:deptDetail.reducer,
  }
});

export default store;