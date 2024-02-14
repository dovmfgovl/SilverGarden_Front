import React from "react";
import { AdminPage } from "../../services/auth/UserApi";

const Admin = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    AdminPage()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return <div>Admin</div>;
};

export default Admin;
