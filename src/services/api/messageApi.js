import axios from "axios";

export const messageReceiveList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/messageReceiveList",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const messageDeletedList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/messageDeletedList",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const messageSendList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/messageSendList",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const messageTempList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/messageTempList",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};