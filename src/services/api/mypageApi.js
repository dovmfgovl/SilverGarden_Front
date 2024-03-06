
// export const callMypage = (params) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "my/mypage",
//         params: params,
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

import apiInterceptor from "../auth/apiInterceptor";

export const callMypage = async (params) => {
  try {
    const response = await apiInterceptor.get("my/mypage", {params});
    return response;
  } catch (error) {
    throw error;
  }
};

// export const changePw = (updatedPassword) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "post",
//         url: process.env.REACT_APP_SPRING_IP + "my/changePassword",
//         data: updatedPassword,
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const changePw = async (updatedPassword) => {
  try {
    const response = await apiInterceptor.post("my/changePassword", updatedPassword);
    return response;
  } catch (error) {
    throw error;
  }
};