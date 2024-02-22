import React, { useEffect, useState } from "react";
import styles from "./programhome.module.css";
import SidebarCommon from "../../components/sidebar/SidebarCommon";
import {
  faBook,
  faCalendar,
  faChartPie,
  faFile,
  faServer,
} from "@fortawesome/free-solid-svg-icons";
import { programListDB } from "../../services/api/programApi";
import { useDispatch } from "react-redux";
import ProgramInfo from "./ProgramInfo";
import { setDetail } from "../../redux/programSlice";
import TestCalendar from "../../components/fullcalendar/TestCalendar";
import ProgramCalendarHome from "../programcalendar/ProgramCalendarHome";
import ProgramDashboard from "../programdashboard/ProgramDashboard";

const Program = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    UserBPage()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const list = [
    //이 리스트를 props를 넣어주면 원하는 목록의 사이드바를 생성 가능
    {
      label: "프로그램 관리", //목록이름
      icon: faServer, //fontAwsome 아이콘 명
      isOpen: true,
      subMenuItems: [
        //서브목록 정보
        { label: "현황", icon: faChartPie }, //서브목록이름, 아이콘명, 클릭시넘어갈 url
        { label: "프로그램 정보", icon: faBook },
        { label: "일정", icon: faCalendar },
        { label: "일정테스트(공통)", icon: faCalendar },
      ],
    },

    {
      label: "프로그램 기록",
      icon: faFile,
      isOpen: false, //열린 상태, 닫힌 상태
      subMenuItems: [{ label: "기록물 관리", icon: faFile }],
    },
  ];
  //사이드바 조작 함수
  const handleMenu = (menuTitle) => {
    setPage(menuTitle);
  };
  const [page, setPage] = useState("일정"); //기본 페이지
  const [programList, setProgramList] = useState([]);
  const [programDetail, setProgramDetail] = useState(null);
  const dispatch = useDispatch();
  const getProgramList = async () => {
    const response = await programListDB();
    const data = response.data;
    // console.log(data);
    setProgramList(data);
  };
  const onRowClick = async (program) => {
    if (program) {
      dispatch(setDetail(program));
      console.log(program);
      const detail = programList.find((item) => item.PG_NO === program.PG_NO);
      setProgramDetail(detail);
      console.log(programDetail);
    } else {
      setProgramDetail(null);
    }
  };
};

useEffect(() => {
  getProgramList();
  console.log(programList); //{PG_NO: 163, PG_TEACHER: '124', PG_CONTENT: '343333', PG_CATEGORY: '신체', COLOR: '#E0FFFF', …}
}, []);

return (
  <div className={styles.programWrap}>
    <div className={styles.programSidebarWrap}>
      <SidebarCommon list={list} handleMenu={handleMenu} />
    </div>
    <div className={styles.programTitleBar}> {page}</div>
    <div className={styles.innerContentLayout}>
      {page === "현황" && (
        <ProgramDashboard
          programList={programList}
          getProgramList={getProgramList}
        />
      )}
      {page === "프로그램 정보" && (
        <ProgramInfo
          programList={programList}
          getProgramList={getProgramList}
          onRowClick={onRowClick}
          setProgramDetail={setProgramDetail}
        />
      )}
      {page === "일정" && <ProgramCalendarHome programList={programList} />}
      {page === "일정테스트(공통)" && <TestCalendar />}
    </div>
  </div>
);

export default Program;
