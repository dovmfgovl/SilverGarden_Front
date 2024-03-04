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
              <Nav.Link className="mx-2">
                <Link to="/home" style={{textDecoration:"none", color:"black"}}>Home</Link>
              </Nav.Link>
              <Nav.Link className="mx-2">
                <Link to="/approval" style={{textDecoration:"none", color:"black"}}>결재</Link>
              </Nav.Link>
              <Nav.Link className="mx-2">
                <Link to="/empList" style={{textDecoration:"none", color:"black"}}>직원조회</Link>
              </Nav.Link>
              <Nav.Link className="mx-2">
                <Link to="/member" style={{textDecoration:"none", color:"black"}}>이용자관리</Link>
              </Nav.Link>
              <Nav.Link className="mx-2">
                <Link to="/program" style={{textDecoration:"none", color:"black"}}>프로그램관리</Link>
              </Nav.Link>
              <Nav.Link className="mx-2">
                <Link to="/notice" style={{textDecoration:"none", color:"black"}}>공지사항</Link>
              </Nav.Link>
              <Nav.Link className="mx-2">
                <Link to="/admin" style={{textDecoration:"none", color:"black"}}>관리자페이지</Link>
              </Nav.Link>
              <Nav.Link href="/payment" style={{textDecoration:"none", color:"black"}} className="mx-2">
                결제관리
              </Nav.Link>
            </Nav>
            <Nav className="mx-3">
              <Nav.Link >
              <Link to="/message" style={{textDecoration:"none", color:"black"}}>
                <FontAwesomeIcon
                  style={{ margin: "0px" }}
                  className="ms-2"
                  icon={faPaperPlane}
                />
              </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/mypage" style={{textDecoration:"none", color:"black"}}>마이페이지</Link>
              </Nav.Link>
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