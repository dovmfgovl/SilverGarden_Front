import {
  faPaperPlane,
  faPersonShelter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import Roboto from "../../assets/fonts/Roboto";
import styles from "./navigation.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import userInfoSlice from "../../redux/userInfoSlice";
import styled from "styled-components";
import logofile from "../../assets/images/silvergarden.png";

const NavigationBar = ({ isLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(userInfoSlice.actions.setEmpInfo({}));
    navigate("/");
  };
  return (
    <>
      <Roboto></Roboto>
      <div className={styles.navigationWrap}>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <img
            src={logofile}
            alt="description"
            className="your-custom-class"
            style={{ width: "60px", height: "auto", margin: "0 0 0 10px" }}
          />
          <Navbar.Brand className="ms-2">SilverGarden</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home" className="mx-2">
                Home
              </Nav.Link>
              <Nav.Link href="/approval" className="mx-2">
                결재
              </Nav.Link>
              <Nav.Link href="/empList" className="mx-2">
                직원조회
              </Nav.Link>
              <Nav.Link href="/member" className="mx-2">
                이용자관리
              </Nav.Link>
              <Nav.Link href="/program" className="mx-2">
                프로그램관리
              </Nav.Link>
              <Nav.Link href="/notice" className="mx-2">
                공지사항
              </Nav.Link>
              <Nav.Link href="/admin" className="mx-2">
                관리자페이지
              </Nav.Link>
              <Nav.Link href="/payment" className="mx-2">
                결제관리
              </Nav.Link>
            </Nav>
            <Nav className="mx-3">
              <Nav.Link href="/message">
                <FontAwesomeIcon
                  style={{ margin: "0px" }}
                  className="ms-2"
                  icon={faPaperPlane}
                />
              </Nav.Link>
              <Nav.Link href="/mypage">마이페이지</Nav.Link>
              <LogoutBtn onClick={handleSignOut}>로그아웃</LogoutBtn>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavigationBar;

const LogoutBtn = styled.button`
  border-radius: 10px;
  text-align: center;
  border: 0px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #666666;
  background-color: transparent;
`;
