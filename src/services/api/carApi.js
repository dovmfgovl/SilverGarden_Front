import axios from "axios";

export const getCarList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "shuttle/shuttleList",
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
        url: process.env.REACT_APP_SPRING_IP + "shuttle/shuttleInsert",
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
        url: process.env.REACT_APP_SPRING_IP + "shuttle/shuttleDelete",
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
        url: process.env.REACT_APP_SPRING_IP + "shuttle/shuttleUpdate",
        params: params
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
