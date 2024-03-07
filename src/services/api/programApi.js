// export const programListDB = (program) => {
//     return new Promise((resolve,reject)=>{
//     try {
//         // console.log(program);
//         const response = axios({
//             method: "get",
//             url: process.env.REACT_APP_SPRING_IP + "program/pgList",
//             params: program
//         });
//         resolve(response);
//     }catch (error){
//     reject(error);
//     }
//     })
// };

import apiInterceptor from "../auth/apiInterceptor";

export const programListDB = async (program) => {
    try {
      const response = await apiInterceptor.get("program/pgList", {params: program});
      return response;
    } catch (error) {
      throw error;
    }
  };

// export const programDetailDB = async (program) => {
//     try {
//         // console.log(program)
//         const response = await axios({
//             method: "get",
//             url: process.env.REACT_APP_SPRING_IP + "program/pgDetail",
//             params: program
//         });
//         return response.data; // 프로그램 상세 정보만 반환하도록 수정
//     } catch (error) {
//         throw error;
//     }
// };

export const programDetailDB = async (program) => {
    try {
      const response = await apiInterceptor.get("program/pgDetail", {params: program});
      return response;
    } catch (error) {
      throw error;
    }
  };


// export const ProgramDeleteDB = async (program) => {
//     try {
//         console.log(program) //42(눌린 pg_no값)
//         // 수정 시작
//         const response = await axios({
//             method: "delete",
//             url: process.env.REACT_APP_SPRING_IP + "program/pgDelete",
//             params: program
//         });
//         return response.data; // 프로그램 상세 정보만 반환하도록 수정
//     } catch (error) {
//         throw error;
//     }
// };

export const ProgramDeleteDB = async (program) => {
    try {
      const response = await apiInterceptor.delete("program/pgDelete", {params: program});
      return response;
    } catch (error) {
      throw error;
    }
  };

// export const programInsertDB = (program) => {
//     // console.log(program); //
//     return new Promise((resolve, reject) => {
//         try {
//             const response = axios({
//                 method: "post", //@RequestBody
//                 url: process.env.REACT_APP_SPRING_IP + "program/pgInsert",
//                 data: program,
//             });
//             resolve(response);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

export const programInsertDB = async (program) => {
    try {
      const response = await apiInterceptor.delete("program/pgInsert", program);
      return response;
    } catch (error) {
      throw error;
    }
  };

// export const ProgramUpdateDB = (params) => {
//     // console.log(params); 
//     return new Promise((resolve, reject) => {
//         axios({
//             method: "put",
//             url: process.env.REACT_APP_SPRING_IP + "program/pgUpdate",
//             data: params, 
//         })
//         .then(response => {
//             console.log(response);
//             resolve(response);
//         })
//         .catch(error => {
//             console.error(error);
//             reject(error);
//         });
//     });
// };

export const ProgramUpdateDB = async (params) => {
    try {
      const response = await apiInterceptor.delete("program/pgUpdate", {params});
      return response;
    } catch (error) {
      throw error;
    }
  };

// export const scheduleListDB = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const response = await axios({
//                 method: 'get',
//                 url: process.env.REACT_APP_SPRING_IP + 'program/scheduleList',
//                 // 필요한 경우 params 추가
//             });
//             // console.log(response);
//             resolve(response);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

export const scheduleListDB = async () => {
    try {
      const response = await apiInterceptor.get("program/scheduleList");
      return response;
    } catch (error) {
      throw error;
    }
  };

// export const updateEventDB = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const response = await axios({
//                 method: 'get',
//                 url: process.env.REACT_APP_SPRING_IP + 'program/scheduleUpdate',
//                 // 필요한 경우 params 추가
//             });
//             // console.log(response);
//             resolve(response);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

export const updateEventDB = async () => {
    try {
      const response = await apiInterceptor.get("program/scheduleUpdate");
      return response;
    } catch (error) {
      throw error;
    }
  };