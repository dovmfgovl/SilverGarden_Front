import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { RefreshTokenAPI } from "../../services/auth/AutApi";
import { useNavigate } from "react-router-dom";

const useCheckTokenExpiration = (token) => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isUserResponded, setIsUserResponded] = useState(false); // 사용자 응답 여부를 추적하는 상태
  const [isCheck, setIsCheck] = useState(true);
  console.log(token);
  const navigation = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (!token) {
        setIsTokenExpired(true);
        return;
      }
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // 현재 시간을 초 단위로
      if (decoded.exp < currentTime) {
        setIsTokenExpired(true);
      } else {
        setIsTokenExpired(false);
        const remainTime = decoded.exp - currentTime;
        console.log(remainTime);
        // 토큰 만료 1분 전이고, 사용자가 아직 응답하지 않았다면
        if (remainTime <= 60 && !isUserResponded) {
          setIsCheck(false);
          const userAgreed = window.confirm("토큰을 연장하시겠습니까?");
          setIsUserResponded(true); // 사용자가 응답했음을 표시 (확인/취소 여부와 관계없이)
          if (userAgreed) {
            // 사용자가 승인했다면, 리프레시 토큰을 사용하여 엑세스 토큰 갱신
            console.log(userAgreed);
            console.log("refresh");
            RefreshTokenAPI()
              .then((response) => {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem(
                  "refreshToken",
                  response.data.refreshToken
                );
                console.log(response.data);
                setIsUserResponded(false);
              })
              .catch((error) => {
                setIsTokenExpired(true);
                console.log("error" + error);
              });

            // 이 함수는 리프레시 토큰을 사용하여 엑세스 토큰을 갱신하는 로직을 구현해야 함
          }
          // 사용자가 취소를 선택했어도, 응답했다는 것으로 처리하여 다음부터 알림이 나타나지 않음
        }
      }
    };
    if (isCheck === true) {
      checkTokenExpiration();
      console.log("토큰만료: " + isTokenExpired);
    }

    // 선택적으로, 주기적으로 토큰 만료 여부를 체크할 수 있습니다.
    // 예: 매 15분마다 토큰 만료 여부를 체크
    const interval = setInterval(checkTokenExpiration, 1000 * 30);

    return () => clearInterval(interval); // Cleanup
  }, [token]);

  return isTokenExpired;
};

export default useCheckTokenExpiration;
