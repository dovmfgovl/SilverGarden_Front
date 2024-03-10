// export const getMemberList = (params) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "member/memberList",
//         params: params,
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

import apiInterceptor from "../auth/apiInterceptor";

export const getMemberList = async (params) => {
  try {
    const response = await apiInterceptor.get("member/memberList", {params});
    return response;
  } catch (error) {
    throw error;
  }
};

// export const memberInsert = (client) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "post",
//         url: process.env.REACT_APP_SPRING_IP + "member/memberInsert",
//         data: client,
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const memberInsert = async (client) => {
  try {
    const response = await apiInterceptor.post("member/memberInsert", client);
    return response;
  } catch (error) {
    throw error;
  }
};

// export const memberDelete = (client_id) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "member/memberDelete",
//         params: {'CLIENT_ID': client_id},
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const memberDelete = async (client_id) => {
  try {
    const response = await apiInterceptor.get("member/memberDelete", {
      params: {'CLIENT_ID': client_id},
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// export const memberUpdate = (params) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "member/memberUpdate",
//         params: params
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const memberUpdate = async (params) => {
  try {
    const response = await apiInterceptor.get("member/memberUpdate", {params});
    return response;
  } catch (error) {
    throw error;
  }
};

// export const getCounselList = (params) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "member/counselList",
//         params: params,
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const getCounselList = async (params) => {
  try {
    const response = await apiInterceptor.get("member/counselList", {params});
    return response;
  } catch (error) {
    throw error;
  }
};

// export const counselInsert = (params) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "post",
//         url: process.env.REACT_APP_SPRING_IP + "member/counselInsert",
//         data: params,
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const counselInsert = async (params) => {
  try {
    const response = await apiInterceptor.post("member/counselInsert", params);
    return response;
  } catch (error) {
    throw error;
  }
};

// export const counselDelete = (COUNSEL_NO) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "member/counselDelete",
//         params: {'COUNSEL_NO': COUNSEL_NO},
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const counselDelete = async (COUNSEL_NO) => {
  try {
    const response = await apiInterceptor.get("member/counselDelete", {
      params: {'COUNSEL_NO': COUNSEL_NO},
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// export const counselUpdate = (params) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "member/counselUpdate",
//         params: params
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const counselUpdate = async (params) => {
  try {
    const response = await apiInterceptor.get("member/counselUpdate", {params});
    return response;
  } catch (error) {
    throw error;
  }
};