import axios from "axios";

export const callMypage = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "my/mypage",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const changePw = (updatedPassword) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "my/changePassword",
        params: updatedPassword,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

