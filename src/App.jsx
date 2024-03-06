import BootInclude from "./components/include/BootInclude";
import AppRouter from "./components/rourter/AppRouter";
import styles from "./app.module.css";
import NavigationBar from "./components/header/NavigationBar";
import FootBar from "./components/footer/FootBar";
import { useEffect, useState } from "react";
import useCheckTokenExpiration from "./pages/login/CheckTokenExpiration";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import userInfoSlice from "./redux/userInfoSlice";
function App() {
  console.log("App실행");
  //const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const token = localStorage.getItem("accessToken");
  const isTokenExpired = useCheckTokenExpiration(token);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTokenExpired) {
      // 토큰이 만료되었을 경우의 로직
      console.log("Token is expired. Redirecting to login page...");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(userInfoSlice.actions.setEmpInfo({}));
      alert("토큰이 만료되어 로그아웃됩니다.");
      navigation("/");
    }
  }, [isTokenExpired]);
  return (
    <div className="App">
      {/* 리덕스 툴킷을 사용하기 위해 선언 */}
      <BootInclude />
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
    </div>
  );
}

export default App;
