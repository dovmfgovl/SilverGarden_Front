// export const DeptListDB = (data) => {

import apiInterceptor from "../auth/apiInterceptor";

//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "dept/deptlist",
//         params : data
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export const DeptListDB = async (data) => {
  try {
    const response = await apiInterceptor.get("dept/deptlist", {params:data});
    return response;
  } catch (error) {
    throw error;
  }
};

// export const DeptCheckDB = (data) => {

//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "dept/deptcheck",
//         params : data
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export const DeptCheckDB = async (data) => {
  try {
    const response = await apiInterceptor.get("dept/deptcheck", {params:data});
    return response;
  } catch (error) {
    throw error;
  }
};

// export const DeptInsertDB = (data) => {

//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "post",
//         url: process.env.REACT_APP_SPRING_IP + "dept/deptinsert",
//         params : data
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export const DeptInsertDB = async (data) => {
  try {
    const response = await apiInterceptor.post("dept/deptinsert", data);
    return response;
  } catch (error) {
    throw error;
  }
};

// export const DeptUpdateDB = (data) => {

//   console.log("===> " + data)
//   console.log(JSON.stringify(data))

//   return new Promise((resolve, reject) => {
//     try {
    
//       const response = axios({
//         method: "put",
//         url: process.env.REACT_APP_SPRING_IP + "dept/deptupdate",
//         params : data
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export const DeptUpdateDB = async (data) => {
  try {
    const response = await apiInterceptor.put("dept/deptupdate", data);
    return response;
  } catch (error) {
    throw error;
  }
};

// export const DeptDeleteDB = (data) => {

//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "put",
//         url: process.env.REACT_APP_SPRING_IP + "dept/deptdelete",
//         params : data
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export const DeptDeleteDB = async (data) => {
  try {
    const response = await apiInterceptor.put("dept/deptdelete", data);
    return response;
  } catch (error) {
    throw error;
  }
};

// export const JobListDB = (data) => {

//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "dept/joblist",
//         params : data
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export const JobListDB = async (data) => {
  try {
    const response = await apiInterceptor.get("dept/joblist", {params:data});
    return response;
  } catch (error) {
    throw error;
  }
};

// export const JobInsertDB = (data) => {

//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "post",
//         url: process.env.REACT_APP_SPRING_IP + "dept/jobinsert",
//         params : data
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export const JobInsertDB = async (data) => {
  try {
    const response = await apiInterceptor.post("dept/jobinsert", data);
    return response;
  } catch (error) {
    throw error;
  }
};

// export const JobDeleteDB = (data) => {

//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "put",
//         url: process.env.REACT_APP_SPRING_IP + "dept/jobdelete",
//         params : data
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });

// }

export const JobDeleteDB = async (data) => {
  try {
    const response = await apiInterceptor.put("dept/jobdelete", data);
    return response;
  } catch (error) {
    throw error;
  }
};


// export const EmpListDB = (data) => {

//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "dept/emplist",
//         params : data
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });

// }

export const EmpListDB = async (data) => {
  try {
    const response = await apiInterceptor.get("dept/emplist", {params:data});
    return response;
  } catch (error) {
    throw error;
  }
};