import React, { useEffect, useRef, useState } from "react";
import styles from "./programboard.module.css";
import Print from "../../components/print/Print";
import ProgramChart from "./ProgramChart";
import CommonCalendarLogic from "../../components/fullcalendar/CommonCalendarLogic";
import ProgramProgressChart from "./ProgramProgressChart";
import ProgramCalChart from "./ProgramCalChart";
import { useDispatch } from "react-redux";
import { setPgEvents } from "../../redux/calendarSlice";

const ProgramDashboardHome = ({ programList }) => {
  const componentRef = useRef();
  const [pgCalList, setPgCalList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CommonCalendarLogic.listDB("calendar/list");
        setPgCalList(response);
      } catch (error) {
        console.error("Error fetching member list:", error);
      }
    };
    fetchData();
  }, []);
  const dispatch = useDispatch();
  dispatch(setPgEvents(pgCalList));
  return (
    <>
      <div className={styles.dashboardWrap}>
        <div style={{ padding: "10px" }}>
          <Print componentRef={componentRef} className={styles.btn} />
        </div>
        <div ref={componentRef} className="d-flex justify-content-center">
          <div className={styles.chartWrap}>
            <h4>분야별 프로그램 갯수</h4>
            <ProgramChart programList={programList} />
          </div>
          <div className={styles.chartWrap}>
            <h4>월별 프로그램 진행 횟수</h4>
            <ProgramProgressChart pgCalList={pgCalList} />
          </div>
          <div className={styles.chartWrap}>
            <h4>프로그램별 진행 횟수</h4>
            <ProgramCalChart pgCalList={pgCalList} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramDashboardHome;
