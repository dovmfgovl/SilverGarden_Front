
// export const getEmpList = (params) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "emplist/all",
//         params: params,
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

import apiInterceptor from "../auth/apiInterceptor";

export const getEmpList = async (params) => {
  try {
    const response = await apiInterceptor.get("emplist/all", {params});
    return response;
  } catch (error) {
    throw error;
  }
};

