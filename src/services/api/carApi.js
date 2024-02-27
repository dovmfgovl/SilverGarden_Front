import axios from "axios";

export const getShuttleList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/shuttleList",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const shuttleInsert = (shuttle) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "member/shuttleInsert",
        data: shuttle,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const shuttleDelete = (shuttle_no) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/shuttleDelete",
        params: {'SHUTTLE_NO': shuttle_no},
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const shuttleUpdate = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/shuttleUpdate",
        params: params
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
