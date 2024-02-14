import React from "react";
import { UserBPage } from "../../services/auth/UserApi";

const Program = () => {
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
  return <div>Program</div>;
};

export default Program;
