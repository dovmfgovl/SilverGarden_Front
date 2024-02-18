import axios from "axios";

export const getAllApprovalList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/allApprovalList",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDeptData = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/getDeptData",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getApprovalDetail = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/getApprovalDetail",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const approvalInsert = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "approval/approvalInsert",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const approvalWaitList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/approvalWaitList",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const passOrDeny = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "put",
        url: process.env.REACT_APP_SPRING_IP + "approval/passOrDeny",
        headers: { 
          'Content-Type': 'application/json'
        },
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};