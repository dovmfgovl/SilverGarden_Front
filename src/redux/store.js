import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from './userInfoSlice';

import programSlice from "./programSlice"
import empInfosSlice from "./empInfosSlice";
import memberReducer from "./memberSlice";


const store = configureStore({
  reducer:{
    programSlice:programSlice.reducer,
    userInfoSlice:userInfoSlice.reducer,
    empInfos:empInfosSlice,
    memberSlice: memberReducer
  }
});

export default store;