import { Provider } from "react-redux";
import BootInclude from "./components/include/BootInclude";
import store from "./redux/store";
import AppRouter from "./components/rourter/AppRouter";
import styles from "./app.module.css";
import NavigationBar from "./components/header/NavigationBar";
import FootBar from "./components/footer/FootBar";
import { useState } from "react";
import LoginForm from "./pages/login/LoginForm";
import { Route, Routes } from "react-router-dom";

function App() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  return (
    <div className="App">
      <Provider store={store}>
        {/* 리덕스 툴킷을 사용하기 위해 선언 */}
        <BootInclude />
        {!accessToken && !refreshToken ? (
          <LoginForm />
        ) : (
          <div className={styles.appWrap}>
            <div className={styles.appHeaderWrap}>
              <NavigationBar />
            </div>
            <div className={styles.appContentWrap}>
              <AppRouter></AppRouter>
              {/* 사용자 정의 라우터  components/router안에 있음*/}
            </div>
            <div className={styles.appFooterWrap}>
              <FootBar />
            </div>
          </div>
        )}
      </Provider>
    </div>
  );
}

export default App;
