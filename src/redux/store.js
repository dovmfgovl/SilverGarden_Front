import { configureStore } from "@reduxjs/toolkit";
import empInfosSlice from './empInfosSlice';
import userInfoSlice from './userInfoSlice';

const store = configureStore({
  reducer:{
    empInfos: empInfosSlice,
    userInfoSlice:userInfoSlice.reducer
  }
});

export default store;