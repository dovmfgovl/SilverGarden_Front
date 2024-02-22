import { faHome } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styles from "./home.module.css";
import SidebarCommon from "../../components/sidebar/SidebarCommon";
import HomeProfile from "./HomeProfile";
import { UserAPage } from "../../services/auth/UserApi";
import Loading from "../login/Loading";

const Home = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    UserAPage()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const sidebarList = [
    {
      label: "홈",
      icon: faHome,
      isOpen: true, //시작시 열려있도록 함
    },
  ];

  return (
    <>
      {accessToken ? (
        <div className={styles.homeWrap}>
          <div className={styles.profileWrap}>
            <HomeProfile />
          </div>
          <div className={styles.sidebarWrap}>
            <SidebarCommon list={sidebarList} />
          </div>
          <div className={styles.homeInnerContentWrap}>Home 화면</div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
