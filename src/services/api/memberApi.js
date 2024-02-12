import axios from "axios";

export const getMemberList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/memberList",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberInsert = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "member/memberInsert",
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberDelete = (client_id) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/memberDelete",
        params: {'client_id': client_id},
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberUpdate = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/memberUpdate",
        params: params
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};