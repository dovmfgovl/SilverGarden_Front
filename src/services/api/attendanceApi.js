import apiInterceptor from "../auth/apiInterceptor";

// export const atListDB = (at) => {
//     return new Promise((resolve, reject) => {
//         try {
//             console.log(at);
//             const response = axios({
//                 method: "get",
//                 url: process.env.REACT_APP_SPRING_IP + "at/atList",
//                 params: at,
//             });
//             resolve(response);
//             console.log(response);

//         } catch (error) {
//             reject(error); 
//         }
//     });
// };

export const atListDB = async (params) => {
    try {
      const response = await apiInterceptor.get("at/atList", { params });
      return response;
    } catch (error) {
      throw error;
    }
  };

// export const atDetailDB = (E_NO) => {
//     return new Promise((resolve, reject) => {
//         try {
//             console.log(E_NO);
//             const response = axios({
//                 method: "get",
//                 url: process.env.REACT_APP_SPRING_IP + "at/atDetail",
//                 params: {E_NO: E_NO},
//             });
//             resolve(response);
//             console.log(response);
            
//         } catch (error) {
//             reject(error); 
//         }
//     });
// };

export const atDetailDB = async (E_NO) => {
    try {
      const response = await apiInterceptor.get("at/atDetail", { params: {E_NO: E_NO} });
      return response;
    } catch (error) {
      throw error;
    }
  };

// export const atInsertDB = (at) => {
//     console.log(at); 
//     return new Promise((resolve, reject) => {
//         try {
//             const response = axios({
//                 method: "post", //@RequestBody
//                 url: process.env.REACT_APP_SPRING_IP + "at/atInsert",
//                 data: at,
//             });
//             resolve(response);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

export const atInsertDB = async (at) => {
    try {
      const response = await apiInterceptor.post("at/atInsert", {data: at});
      return response;
    } catch (error) {
      throw error;
    }
  };

// export const atUpdateDB = (at) => {
//     console.log(at); 
//     return new Promise((resolve, reject) => {
//         try {
//             const response = axios({
//                 method: "put", //@RequestBody
//                 url: process.env.REACT_APP_SPRING_IP + "at/atUpdate",
//                 data: at,
//             });
//             resolve(response);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

export const atUpdateDB = async (at) => {
    try {
      const response = await apiInterceptor.put("at/atUpdate", {data: at});
      return response;
    } catch (error) {
      throw error;
    }
  };

// export const adminAtUpdateDB = (at) => {
//     console.log(at); 
//     return new Promise((resolve, reject) => {
//         try {
//             const response = axios({
//                 method: "put", //@RequestBody
//                 url: process.env.REACT_APP_SPRING_IP + "at/adminAtUpdate",
//                 data: at,
//             });
//             resolve(response);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

export const adminAtUpdateDB = async (at) => {
    try {
      const response = await apiInterceptor.put("at/adminAtUpdate", {data: at});
      return response;
    } catch (error) {
      throw error;
    }
  };

// export const atDeleteDB = (at) => {
//     console.log(at);
//     return new Promise((resolve, reject) => {
//         try {
//             const response = axios({
//                 method: "get",
//                 url: process.env.REACT_APP_SPRING_IP + "at/atDelete",
//                 params: at,
//             });
//             resolve(response);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

export const atDeleteDB = async (at) => {
    try {
      const response = await apiInterceptor.get("at/atDelete", at);
      return response;
    } catch (error) {
      throw error;
    }
  };