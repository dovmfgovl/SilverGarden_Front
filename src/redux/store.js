import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userInfoSlice from './userInfoSlice';
import programSlice from "./programSlice"
import empInfosSlice from "./empInfosSlice";
import memberReducer from "./memberSlice";
import deptDetail from "./deptSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";


const persistConfig ={//persist redux를 사용하고자 할 때 필요한 설정
  key: "root",
  version: 1,
  storage,
}

//로컬스토리지에서 영구적으로 사용하고 싶은 리듀서는 다음과같이 선언
const persisteduserInfoReducer = persistReducer(persistConfig, userInfoSlice.reducer);


//리듀서 목록을 아래에 관리함. persistReducer 처리하지 않은 리듀서들은 로컬스토리지에서 관리되지 않음
const rootReducer = combineReducers({
  programSlice:programSlice.reducer,
  userInfoSlice:persisteduserInfoReducer,
  empInfos:empInfosSlice,
  memberSlice: memberReducer,
  deptDetail:deptDetail.reducer,
});

const store = configureStore({
  reducer:   rootReducer,
  
});



export default store;