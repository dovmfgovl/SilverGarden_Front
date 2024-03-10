import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import Approval from "../../pages/approval/Approval";
import Notice from "../../pages/notice/Notice";
import Emplist from "../../pages/emplist/Emplist";
import Member from "../../pages/member/Member";
import Admin from "../../pages/admin/Admin";
import Program from "../../pages/program/Program";
import Mypage from "../../pages/mypage/Mypage";
import Message from "../../pages/message/Message";
import ErrorPage from "../../pages/error/ErrorPage";
import Payment from "../../pages/payment/Payment";
import { useSelector } from "react-redux";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  const empData = useSelector((state) => state.userInfoSlice);

  return (
    <Routes>
      <Route path="/home" exact={true} element={<Home />}></Route>
      <Route path="/approval" exact={true} element={<Approval />}></Route>
      <Route path="/emplist" exact={true} element={<Emplist />}></Route>
      <Route
        path="/member"
        exact={true}
        element={
          <PrivateRouter
            role={empData.e_auth}
            allowedRoles={["ADMIN", "USERB"]}
          >
            <Member />
          </PrivateRouter>
        }
      ></Route>
      <Route
        path="/program"
        exact={true}
        element={
          <PrivateRouter
            role={empData.e_auth}
            allowedRoles={["ADMIN", "USERB"]}
          >
            <Program />
          </PrivateRouter>
        }
      ></Route>
      <Route path="/notice" exact={true} element={<Notice />}></Route>
      <Route
        path="/admin"
        exact={true}
        element={
          <PrivateRouter role={empData.e_auth} allowedRoles={["ADMIN"]}>
            <Admin />
          </PrivateRouter>
        }
      ></Route>
      <Route path="/mypage" exact={true} element={<Mypage />}></Route>
      <Route path="/message" exact={true} element={<Message />}></Route>
      <Route path="/error" exact={true} element={<ErrorPage />}></Route>
      <Route
        path="/payment"
        exact={true}
        element={
          <PrivateRouter
            role={empData.e_auth}
            allowedRoles={["ADMIN", "USERB"]}
          >
            <Payment />
          </PrivateRouter>
        }
      ></Route>
    </Routes>
  );
};

export default AppRouter;
