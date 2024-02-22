import BootInclude from "./components/include/BootInclude";
import AppRouter from "./components/rourter/AppRouter";
import styles from "./app.module.css";
import NavigationBar from "./components/header/NavigationBar";
import FootBar from "./components/footer/FootBar";

function App() {
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
