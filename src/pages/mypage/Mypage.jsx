import React, { useEffect, useState } from "react";
import styles from "./mypage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faGroupArrowsRotate,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import MypageMainCon from "./MypageMainCon";
import SidebarCommon from "../../components/sidebar/SidebarCommon";
import ChangePwModal from "./ChangePwModal";

import { useDispatch, useSelector } from "react-redux";
import { getEmpList, setDetail } from "../../redux/chooseEmpSlice";
const Mypage = () => {

  const empList = useSelector((state) => state.chooseEmp.value);
  const empDetail =useSelector((state) => state.chooseEmp.selectedEmployee) || {};
  const dispatch = useDispatch();
  const userData =useSelector(state => state.userInfoSlice);

  useEffect(()=>{
    dispatch(getEmpList())
  },[dispatch])

    const selectedEmp = empList.find((emp) => emp.E_NO === userData.e_no);
    dispatch(setDetail(selectedEmp));
  //토큰과 비교하고 그 토큰에 적힌 정보와 empinfo 리덕스에서 가진 정보가 일치하는지 보는 것

  // 모달 상태 및 핸들러
  const [modal, setModal] = useState("");
  const [showModal, setShowModal] = useState(false); // 모달  추가

  // 마이페이지 사이드바 메뉴 리스트
  const list = [
    //이 리스트를 props를 넣어주면 원하는 목록의 사이드바를 생성 가능
    {
      label: "마이페이지", //목록이름
      icon: faPerson, //fontAwsome 아이콘 명
      isOpen: true,
      subMenuItems: [
        //서브목록 정보
        { label: "비밀번호 변경", icon: faGroupArrowsRotate }, //서브목록이름, 아이콘명, 클릭시넘어갈 url
      ],
    },
  ];
  // 메뉴 클릭 핸들러
  const handleMenu = (menuTitle) => {
    // console.log(showModal);
    if (menuTitle === "비밀번호 변경") {
      setShowModal(true);
      setModal(menuTitle);
    }
  };
  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className={styles.MypageContainerLayout}>
        <div className={styles.mypageTitlebar}>
          <FontAwesomeIcon icon={faCaretRight} /> 마이페이지{" "}
        </div>
        <div className={styles.sidebarLayout}>
          <SidebarCommon list={list} handleMenu={handleMenu}></SidebarCommon>
        </div>
        {/* 모달 렌더링 */}
        {modal && (
          <>
            {modal === "비밀번호 변경" && (
              <ChangePwModal show={showModal} handleClose={handleCloseModal} />
            )}
          </>
        )}
        <div className={styles.innerContentLayout}>
          {/* 직원 선택 컴포넌트 */}
          <MypageMainCon />
        </div>
      </div>
    </>
  );
};


export default Mypage;
