import { configureStore } from "@reduxjs/toolkit";
import empInfosSlice from './empInfosSlice';

const store = configureStore({
  reducer:{
    empInfos: empInfosSlice
  }
})
export default store;