import apiInterceptor from "../auth/apiInterceptor";

// export const getShuttleList = (params) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "member/shuttleList",
//         params: params,
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const getShuttleList = async (params) => {
  try {
    const response = await apiInterceptor.get("member/shuttleList", {params});
    return response;
  } catch (error) {
    throw error;
  }
};

// export const shuttleInsert = (shuttle) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "post",
//         url: process.env.REACT_APP_SPRING_IP + "member/shuttleInsert",
//         data: shuttle,
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const shuttleInsert = async (shuttle) => {
  try {
    const response = await apiInterceptor.get("member/shuttleInsert", shuttle);
    return response;
  } catch (error) {
    throw error;
  }
};

// export const shuttleDelete = (shuttle_no) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "member/shuttleDelete",
//         params: {'SHUTTLE_NO': shuttle_no},
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const shuttleDelete = async (shuttle_no) => {
  try {
    const response = await apiInterceptor.get("member/shuttleDelete", {
      params: {'SHUTTLE_NO': shuttle_no},
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// export const shuttleUpdate = (params) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "member/shuttleUpdate",
//         params: params
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const shuttleUpdate = async (params) => {
  try {
    const response = await apiInterceptor.get("member/shuttleUpdate", {params});
    return response;
  } catch (error) {
    throw error;
  }
};