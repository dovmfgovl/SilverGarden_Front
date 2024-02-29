import {
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import Roboto from "../../assets/fonts/Roboto";
import styles from "./navigation.module.css";
import { Link, useNavigate } from "react-router-dom";
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
        <Navbar collapseOnSelect expand="lg" className={styles.navbar}>
          <img
            src={logofile}
            alt="description"
            className="your-custom-class"
            style={{ width: "60px", height: "auto", margin: "0 0 0 10px" }}
          />
          <Navbar.Brand className="ms-2">SilverGarden</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className={styles.linkWrap}>
              <Nav.Link href="/home" className="mx-4">
                Home
              </Nav.Link>
              <Nav.Link href="/approval" className="mx-4">
                결재
              </Nav.Link>
              <Nav.Link href="/empList" className="mx-4">
                직원조회
              </Nav.Link>
              <Nav.Link href="/member" className="mx-4">
                이용자관리
              </Nav.Link>
              <Nav.Link href="/program" className="mx-4">
                프로그램관리
              </Nav.Link>
              <Nav.Link href="/notice" className="mx-4">
                공지사항
              </Nav.Link>
              <Nav.Link href="/admin" className="mx-4">
                관리자페이지
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto" style={{ marginLeft: '540px', fontSize: '0.9rem' }}>
              <Nav.Link href="/message">
                <FontAwesomeIcon
                  style={{ margin: "0px" }}
                  className="ms-2"
                  icon={faPaperPlane}
                />
              </Nav.Link>
              <Nav.Link>
                <Link to="/mypage" style={{textDecoration:"none", color:"black"}}>마이페이지</Link>
              </Nav.Link>
              <Nav.Link className="mx-3" href="/mypage">마이페이지</Nav.Link>
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
  position: relative; /* ::after 가상 요소를 포함하는 요소를 상대 위치로 설정 */
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #b69ff7;
    transform: scaleX(0);
    transition: transform 0.2s ease-in-out;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;
