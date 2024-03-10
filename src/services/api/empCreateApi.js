
// export const AuthApi = axios.create({
//   baseURL : process.env.REACT_APP_SPRING_IP,
//   headers : {
//     'Content-Type' : 'application/json',
//   }
// })

import apiInterceptor from "../auth/apiInterceptor";

// export const SignupAPI = async(data)=> {
//   const response = await AuthApi.post(`/empcreate/signup`, data);
//   console.log(response.data)
//   return response.data
// }

export const SignupAPI = async (data) => {
  try {
    const response = await apiInterceptor.post("empcreate/signup", data, {
      headers : {
        'Content-Type' : 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const DeptNameDB = async() => {
//   const response = await AuthApi.get(`/empcreate/deptname`)
//   console.log(response.data)
//   return response.data
// }

export const DeptNameDB = async (data) => {
  try {
    const response = await apiInterceptor.get("empcreate/deptname");
    return response.data;
  } catch (error) {
    throw error;
  }
};