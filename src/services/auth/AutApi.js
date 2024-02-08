import axios from "axios";

let ACCESS_TOKEN = localStorage.getItem("token")

export const AuthApi = axios.create({
  baseURL : process.env.REACT_APP_SPRING_IP,
  headers : {
    'Content-Type' : 'application/json',
  }
})

export const SigninTokenAPI = async({email, password}) => {
  const data = {email, password};
  const response = await AuthApi.post(`/api/v1/auth/signin`, data);
console.log(response.data)
  return response.data;
}