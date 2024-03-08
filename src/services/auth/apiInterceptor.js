import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userInfoSlice from '../../redux/userInfoSlice';

const apiInterceptor = axios.create({
  baseURL: "/proxy/",
});

apiInterceptor.interceptors.request.use(
  config => {
    // 요청 인터셉터 로직
    const token = localStorage.getItem('accessToken');
    if (token) {
      // 헤더에 토큰 추가
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

apiInterceptor.interceptors.response.use(
  response => {
    // 성공 응답 처리 로직
    return response;
  },
  error => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    // 에러 응답 처리 로직
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 예: 인증 실패 (토큰 만료 등)
          console.log("인증실패! 재로그인 해주세요")
          ;

          navigation("/")
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("check");
          dispatch(userInfoSlice.actions.setEmpInfo({}));
          // 로그인 페이지로 리다이렉트
          break;
        case 403:
          // 예: 권한 없음
          console.log("접근권한이 없습니다.");
          break;
        // 다른 상태 코드에 대한 처리를 추가할 수 있습니다.
        case 500:
          // 예: 권한 없음
          console.log("서버오류! 관리자에게 문의해주세요");
          break;
        default:
          // 기타 에러 처리
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default apiInterceptor;