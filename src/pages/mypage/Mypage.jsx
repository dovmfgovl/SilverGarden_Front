import React from "react";
import { UserAPage } from "../../services/auth/UserApi";

const Mypage = () => {
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
  return <div>Mypage</div>;
};

export default Mypage;
