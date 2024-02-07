import React, { useState } from 'react'
import App from './App';
import MemberApp from './MemberApp';

const EntryPoint = () => {//사용자 앱과 직원용 그룹웨어를 분기하는 엔트리 포인트
  const [app, setApp] = useState(()=>{
    const app = window.localStorage.getItem("silvergardenSelectApp");
    console.log(app);
    return app;
  });

  return (
    <>
      <button onClick={()=>{//로컬스토리지에 있는 앱 삭제
          window.localStorage.removeItem("silvergardenSelectApp");
          window.location.reload();
        }}>로컬스토리지 삭제
      </button>
    {!app && //localstorage에 선택된 app이 없을 때
      <>
        <button onClick={()=> //직원 앱으로 이동
        {
          window.localStorage.setItem("silvergardenSelectApp","worker")
          setApp("worker");
        }
          }>직원</button>
        <button onClick={()=>{ //사용자 앱으로 이동
          window.localStorage.setItem("silvergardenSelectApp","user")
          setApp("user");
        }
        }>유저</button>
      </>
    }
    {//localstorage에 선택된 app이 있는 경우, 권한에 따라 다른 곳으로 보냄
      app &&
      <>
      {app === "worker" &&  <App></App>}
      {app === "user" && <MemberApp></MemberApp>}
      </>
    }
    </>
  )
}

export default EntryPoint