import {
  faBusinessTime,
  faCalendarDay,
  faCaretRight,
  faCheck,
  faCheckDouble,
  faComment,
  faCreditCard,
  faCrosshairs,
  faCubesStacked,
  faFile,
  faList,
  faPlay,
  faUserPlus,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import styles from "./payment.module.css";
import SidebarCommon from "../../components/sidebar/SidebarCommon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserBPage } from "../../services/auth/UserApi";
import PaymentInfo from "./PaymentInfo";

const Payment = () => {
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
  useEffect(() => {}, [accessToken]);
  const sidebarList = [
    //이 리스트를 props를 넣어주면 원하는 목록의 사이드바를 생성 가능
    {
      label: "결제관리", //목록이름
      icon: faList, //fontAwsome 아이콘 명
      isOpen: true, // 시작 시 열려있도록 함
      subMenuItems: [
        //서브목록 정보
        { label: "결제목록", icon: faCreditCard }, //서브목록이름, 아이콘명, 클릭시넘어갈 url
      ],
    },
  ];
  const handleMenu = (menuTitle) => {
    //사이드바 메뉴를 클릭했들 때 해당 페이지를 렌더링하기 위해 함수를 선언
    setPage(menuTitle);
  };

  const [paymentPage, setPage] = useState("결제목록"); // 초기에 진입했을 때 어떤 화면 진입하고 싶은지

  return (
    <div className={styles.paymentListWrap}>
      <div className={styles.paymentSidebarWrap}>
        <SidebarCommon list={sidebarList} handleMenu={handleMenu} />
      </div>
      <div className={styles.paymentTitleBar}>
        <FontAwesomeIcon icon={faCaretRight} /> {paymentPage}
      </div>
      <div className={styles.innerContentWrap}>
        {paymentPage === "결제목록" && <PaymentInfo handleMenu={handleMenu} />}{" "}
      </div>
    </div>
  );
};

export default Payment;
