import axios from "axios";

export const AuthApi = axios.create({
  baseURL : process.env.REACT_APP_SPRING_IP,
  headers : {
    'Content-Type' : 'application/json',
  }
})

export const SigninTokenAPI = async({e_no, e_password}) => {
  const data = {e_no, e_password};
  const response = await AuthApi.post(`/api/v1/auth/signin`, data);
console.log(response.data)
  return response.data;
}