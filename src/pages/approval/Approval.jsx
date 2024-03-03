import { UserAPage } from "../../services/auth/UserApi";
import {
  faCaretRight,
  faCheck,
  faCircleUp,
  faNewspaper,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import styles from "./approval.module.css";
import SidebarCommon from "../../components/sidebar/SidebarCommon";
import ApprovalWaitList from "./ApprovalWaitList";
import ApprovalProgList from "./ApprovalProgList";
import ApprovalDenyList from "./ApprovalDenyList";
import ApprovalCompleteList from "./ApprovalCompleteList";
import ApprovalDocWrite from "./approvalwrite/ApprovalDocWrite";
import ApprovalTempList from "./ApprovalTempList";
import ApprovalUpList from "./ApprovalUpList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import ApprovalDocDetail from "./approvaldetail/ApprovalDocDetail";
import ApprovalDocUpdate from "./approvalupdate/ApprovalDocUpdate";

const Approval = () => {
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

  const list = [
    //이 리스트를 props를 넣어주면 원하는 목록의 사이드바를 생성 가능
    {
      label: "결재", //목록이름
      icon: faCheck, //fontAwsome 아이콘 명
      isOpen: true,
      subMenuItems: [
        //서브목록 정보
        { label: "결재대기함", icon: faNewspaper }, //서브목록이름, 아이콘명, 클릭시넘어갈 url
        { label: "결재진행함", icon: faNewspaper },
        { label: "반려문서함", icon: faNewspaper },
        { label: "결재완료문서함", icon: faNewspaper },
      ],
    },
    {
      label: "기안",
      icon: faCircleUp,
      isOpen: true,
      subMenuItems: [
        { label: "결재문서작성", icon: faPen },
        { label: "임시보관함", icon: faNewspaper },
        { label: "결재요청함", icon: faNewspaper },
      ],
    },
  ];
  const [approvalPage, setPage] = useState("결재대기함"); //기본페이지 결재대기함
  const empData = useSelector((state) => state.userInfoSlice); //empData내 데이터 형태는 아래와 같음
  // {
  //   e_no: "202402_00000027",
  //   e_name: "정호성",
  //   e_profile: "https://picsum.photos/200/200",
  //   dept_name: "간호팀",
  //   e_rank: "대리"
  // }
  const [docNo, setDocNo] = useState(-1); //-1번 결재문서는 없음

  const handleMenu = (menuTitle, d_no) => {
    //사이드바 메뉴를 조작하는 함수
    setPage(menuTitle);
    if (d_no) {
      //만약 d_no가 있다면(결재문서 상세조회라면)
      setDocNo(d_no);
    }
  };

  return (
    <div className={styles.approvalWrap}>
      <div className={styles.approvalSidebarWrap}>
        <SidebarCommon list={list} handleMenu={handleMenu} />
      </div>
      <div className={styles.approvalTitleBar}>
        <FontAwesomeIcon icon={faCaretRight} />
        {" "+approvalPage}
      </div>
      <div className={styles.approvalContentWrap}>
        {approvalPage === "결재대기함" && (
          <ApprovalWaitList handleMenu={handleMenu} empData={empData} />
        )}
        {approvalPage === "결재진행함" && (
          <ApprovalProgList handleMenu={handleMenu} empData={empData} />
        )}
        {approvalPage === "반려문서함" && (
          <ApprovalDenyList handleMenu={handleMenu} empData={empData} />
        )}
        {approvalPage === "결재완료문서함" && (
          <ApprovalCompleteList handleMenu={handleMenu} empData={empData} />
        )}
        {approvalPage === "결재문서작성" && (
          <ApprovalDocWrite handleMenu={handleMenu} empData={empData} />
        )}
        {approvalPage === "임시보관함" && (
          <ApprovalTempList handleMenu={handleMenu} empData={empData} />
        )}
        {approvalPage === "결재요청함" && (
          <ApprovalUpList handleMenu={handleMenu} empData={empData} />
        )}
        {approvalPage === "결재문서상세" && (
          <ApprovalDocDetail
            handleMenu={handleMenu}
            empData={empData}
            docNo={docNo}
          />
        )}
        {approvalPage === "결재문서수정" && (
          <ApprovalDocUpdate
            handleMenu={handleMenu}
            empData={empData}
            docNo={docNo}
          />
        )}
      </div>
    </div>
  );
};

export default Approval;
