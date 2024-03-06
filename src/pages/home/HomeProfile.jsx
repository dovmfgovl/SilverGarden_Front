import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./home.module.css";
import AtStart from "./AtStart";
import AtEnd from "./AtEnd";
import { atListDB } from "../../services/api/attendanceApi";
import { empListDB } from "../../services/api/empInfoApi";

const HomeProfile = () => {
  const empData = useSelector((state) => state.userInfoSlice);
  const [atList, setAtList] = useState({});
  const [empProfile, setEmpProfile] = useState({});
  console.log(empProfile);

  const today = new Date();
  const [date, setDate] = useState([today.getFullYear(), `0${today.getMonth() + 1}`.slice(-2), `0${today.getDate()}`.slice(-2)].join("-"));

  const at = {
    E_NO : empData.e_no,
    AT_DATE: date,
    AT_START: '',
    AT_END: '',
    AT_STATUS: ''
  }
  console.log("at e_no===>", at.E_NO)

  const empAtList = async () => {
    try {
      const response = await atListDB(at);
      const data = response.data;
      console.log("근태 데이터=======>",data);

      // 특정한 E_NO와 AT_DATE의 근태 데이터 객체 찾기
      const targetData = data.find(item => item.E_NO === empData.e_no && item.AT_DATE === date);

      // 해당 객체가 존재하면 AT_START와 AT_END 값을 업데이트
      if(targetData) {
        setAtList({
          AT_START: targetData.AT_START,
          AT_END: targetData.AT_END,
          AT_STATUS: targetData.AT_STATUS
        });
      } else {
        console.log("해당하는 근태데이터가 없습니다.")
      }
    } catch (error) {
      console.error("근태리스트 에러: ", error);
    }
  }

  useEffect(() => {
    empAtList(); // atList 상태가 변경될 때마다 데이터를 가져옴
  }, [empData.e_no]); // empData.e_no가 변경될 때마다 useEffect가 호출

  const emp = {
    E_NO : empData.e_no,
    E_PROFILE : ''
  }
  const empList = async () => {
    try {
      const response = await empListDB(emp);
      const data = response.data;
      console.log("직원 데이터 ===========>", data);

      // 특정한 E_NO 찾기
      const targetData = data.find(item => item.E_NO === empData.e_no);

      if (targetData) {
        setEmpProfile({
          E_PROFILE: targetData.E_PROFILE
        });
      } else {
        console.log("해당하는 직원데이터가 없습니다.")
      }
    } catch (error) {
      console.error("직원리스트 에러: ", error);
    }
  }

  useEffect(() => {
    empList();
  }, [empData.e_no]);
  
  return (
    <>
      <div>
        <img src={empProfile.E_PROFILE ? empProfile.E_PROFILE : "https://picsum.photos/200/200"} alt="프로필" />
      </div>
      <div className={styles.eName}>
        {empData.e_name}
      </div>
      <div className={styles.eNo}>
        {empData.e_no}
      </div>
      <div className={styles.atTimeWrap}>
        <div className={styles.atTimeStart}>
          출근: {atList.AT_START ? atList.AT_START : '-'}
        </div>
        <div className={styles.atTimeEnd}>
          퇴근: {atList.AT_END ? atList.AT_END : '-'}
        </div>
        <div className={styles.atTimeEnd}>
          근태현황: {atList.AT_STATUS ? atList.AT_STATUS : '-'}
        </div>
      </div>
      <div className={styles.atContainer}>
        <div className={styles.at1}>
          <AtStart empAtList={empAtList}/>
        </div>
        <div className={styles.at2}>
          <AtEnd empAtList={empAtList}/>
        </div>
      </div>
    </>
  );
};

export default HomeProfile;
