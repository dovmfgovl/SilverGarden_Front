import React from "react";
import { UserAPage } from "../../services/auth/UserApi";

const Emplist = () => {
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
  return <div>Emplist</div>;
};

export default Emplist;
