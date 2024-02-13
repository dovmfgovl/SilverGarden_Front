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

export const memberInsert = (client) => {
  return new Promise((resolve, reject) => {
    // ISO 8601 형식에서 시간 부분을 제거하고 적절한 형식으로 변환
    // const isoDateString = formDataToSend.client_birth;
    // const dateWithoutTime = isoDateString.split("T")[0];
    // const formattedDate = new Date(dateWithoutTime);

    // // 변환된 날짜를 formData에 적용
    // formDataToSend.client_birth = formattedDate;

    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "member/memberInsert",
        data: client,
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
        params: {'CLIENT_ID': client_id},
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