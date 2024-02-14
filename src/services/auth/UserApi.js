import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

export const AdminPage = async() => {
  
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:8000/api/v1/admin',
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
      alert(error)
    } else if (status === 403) {
      // 권한이 없는 경우 처리
      // 권한 에러 메시지 표시 등의 작업 수행
      console.error('Error:', error);
      alert(error)
    } else {
      // 기타 에러 처리
      console.error('Error:', error);
      alert(error)
    }
  });
}

export const UserAPage = async() => {
  
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:8000/api/v1/usera',
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
      alert(error)
    } else if (status === 403) {
      // 권한이 없는 경우 처리
      // 권한 에러 메시지 표시 등의 작업 수행
      console.error('Error:', error);
      alert(error)
    } else {
      // 기타 에러 처리
      console.error('Error:', error);
      alert(error)
    }
  });
}

export const UserBPage = async() => {
  
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:8000/api/v1/usera',
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
   console.log(error)
  });
}