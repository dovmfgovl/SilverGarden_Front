import React, { useState } from 'react'

import MypageSubcon1 from './MypageSubcon1';
import { Tab, Tabs } from 'react-bootstrap';
import MypageInfo from './MypageInfo';
import MypageSubcon2 from './MypageSubcon2';


const MypageMainCon = () => {
  const [key, setKey] = useState('기초정보'); //태그에 대한 초기에 보여줄 화면
    //insert here = 직원정보 조회
    //insert here = 직원정보중 누구를 할지 지정 ( 나중에 로그인과 연동할 경우 변동 예정 )

  return (
    <>
    {/* 로그인한 유저의 기본 정보를 보여주는 ui */}
    <MypageInfo />
    {/* 로그인한 유저의 세부 정보를 태그버튼을 통해 정한다.  */}
    <Tabs
      activeKey={key}
      onSelect={(k)=> setKey(k)}
    >
          <Tab eventKey="기초정보" title="기초정보">
            <MypageSubcon1 />
          </Tab>
          <Tab eventKey="근태정보" title="근태정보">
            <MypageSubcon2 />
          </Tab>
    </Tabs>
    </>
  )
}

export default MypageMainCon