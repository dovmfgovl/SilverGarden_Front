import {
  faBusinessTime,
  faCalendarDay,
  faCaretRight,
  faCheckDouble,
  faCubesStacked,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import styles from "./admin.module.css";
import SidebarCommon from "../../components/sidebar/SidebarCommon";
import EmpInfos from "./EmpInfos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AtCalendarHome from "./AtCalendarHome";
import Dept from "../dept/Dept";
import { AdminPage } from "../../services/auth/UserApi";
import AdminCalendar from "../schedule/TestCalendar";

const Admin = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    AdminPage()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const sidebarList = [
    //이 리스트를 props를 넣어주면 원하는 목록의 사이드바를 생성 가능
    {
      label: "관리자페이지", //목록이름
      icon: faCheckDouble, //fontAwsome 아이콘 명
      isOpen: true, // 시작 시 열려있도록 함
      subMenuItems: [
        //서브목록 정보
        { label: "인적사항관리", icon: faUserPlus }, //서브목록이름, 아이콘명, 클릭시넘어갈 url
        { label: "근태관리", icon: faBusinessTime },
        { label: "부서관리", icon: faCubesStacked },
        { label: "일정관리", icon: faCalendarDay },
      ],
    },
  ];
  const handleMenu = (menuTitle) => {
    //사이드바 메뉴를 클릭했들 때 해당 페이지를 렌더링하기 위해 함수를 선언
    setPage(menuTitle);
  };

  const [adminPage, setPage] = useState("인적사항관리"); // 초기에 진입했을 때 어떤 화면 진입하고 싶은지

  return (
    <div className={styles.empListWrap}>
      <div className={styles.empSidebarWrap}>
        <SidebarCommon list={sidebarList} handleMenu={handleMenu} />
      </div>
      <div className={styles.empTitleBar}>
        <FontAwesomeIcon icon={faCaretRight} /> {adminPage}
      </div>
      <div className={styles.innerContentWrap}>
        {adminPage === "인적사항관리" && <EmpInfos handleMenu={handleMenu} />}{" "}
        {/* 조건부 렌더링 - Home.jsx 참고 */}
        {adminPage === "근태관리" && <AtCalendarHome handleMenu={handleMenu} />}
        {adminPage === "부서관리" && <Dept handleMenu={handleMenu} />}{" "}
        {adminPage === "일정관리" && <AdminCalendar handleMenu={handleMenu} />}{" "}
      </div>
    </div>
  );
};

export default Admin;
