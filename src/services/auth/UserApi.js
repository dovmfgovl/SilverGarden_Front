import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

export const AdminPage = async() => {
  const navigate = useNavigate();
  
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_SPRING_IP + "api/v1/admin",
    headers: { 
      'Authorization': `Bearer ${accessToken}`
    },
  };

  axios.request(config)
  .then((response) => {
    console.log("요청 성공")
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
   
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // 토큰이 만료된 경우 처리
      // 로그아웃 등의 작업 수행
      //alert("토큰이 만료되어 자동로그아웃됩니다")
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/")
    } else if (status === 403) {
      // 권한이 없는 경우 처리
      // 권한 에러 메시지 표시 등의 작업 수행
      console.error('Error:', error);
      alert("해당 페이지에 대한 권한이 없습니다")
      navigate("/home")
    } else {
      // 기타 에러 처리
      console.error('Error:', error);
      //alert("해당 페이지에 대한 권한이 없습니다")
      navigate("/home")
    }
  });
}

export const UserAPage = async() => {
  const navigate = useNavigate();
  
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_SPRING_IP + "api/v1/usera",
    headers: { 
      'Authorization': `Bearer ${accessToken}`
    },
  };

  axios.request(config)
  .then((response) => {
    console.log("요청 성공")
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // 토큰이 만료된 경우 처리
      // 로그아웃 등의 작업 수행
      console.error('Error:', error);
      alert("토큰이 만료되어 자동로그아웃됩니다")
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/")
    } else if (status === 403) {
      // 권한이 없는 경우 처리
      // 권한 에러 메시지 표시 등의 작업 수행
      console.error('Error:', error);
      alert("해당 페이지에 대한 권한이 없습니다")
      navigate("/home")
    } else {
      // 기타 에러 처리
      console.error('Error:', error);
      //alert("해당 페이지에 대한 권한이 없습니다")
      navigate("/home")
    }
  });
}

export const UserBPage = async() => {
  const navigate = useNavigate();
  
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_SPRING_IP + 'api/v1/userb',
    headers: { 
      'Authorization': `Bearer ${accessToken}`
    },
  };

  axios.request(config)
  .then((response) => {
    console.log("요청 성공")
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // 토큰이 만료된 경우 처리
      // 로그아웃 등의 작업 수행
      console.error('Error:', error);
      alert("토큰이 만료되어 자동로그아웃됩니다")
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/")
    } else if (status === 403) {
      // 권한이 없는 경우 처리
      // 권한 에러 메시지 표시 등의 작업 수행
      console.error('Error:', error);
      alert("해당 페이지에 대한 권한이 없습니다")
      navigate("/home")
    } else {
      // 기타 에러 처리
      console.error('Error:', error);
      //alert("해당 페이지에 대한 권한이 없습니다")
      navigate("/home")
    }
  });
}