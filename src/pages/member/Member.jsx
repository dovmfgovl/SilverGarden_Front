import { faFilePen, faUsersRectangle, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import styles from './member.module.css';
import SidebarCommon from '../../components/sidebar/SidebarCommon'
import MemberInfo from './MemberInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MemberInfo2 from './counsel/MemberInfo2';


const Member = () => {
  const list = [//이 리스트를 props를 넣어주면 원하는 목록의 사이드바를 생성 가능
  {
    label: '이용자관리',//목록이름
    icon: faUsersViewfinder,//fontAwsome 아이콘 명
    isOpen:true,
    subMenuItems: [//서브목록 정보
    { label: '이용자기본정보', icon: faUsersRectangle},//서브목록이름, 아이콘명, 클릭시넘어갈 url
    { label: '이용자상담관리', icon: faFilePen},
  ],
  },

];

const [memberPage,setmemberPage]=useState('이용자기본정보');


const handleMenu=(menuTitle)=>{
  setmemberPage(menuTitle);
}

  return (
    <div className={styles.MemberContainerLayout}>
      <div className={styles.memberTitlebar}><FontAwesomeIcon icon={faUsersRectangle}/> 이용자관리 </div>
      <div className={styles.sidebarLayout}><SidebarCommon list={list} handleMenu={handleMenu}></SidebarCommon></div>
      <div className={styles.innerContentLayout}>
          {/* 서브라우터 구현 */}
            {memberPage&&
            <>
          {memberPage ==="이용자기본정보" &&<MemberInfo  />}
          {memberPage ==="이용자상담관리" &&<MemberInfo2 />}
 
            </>
            }
          {/* 서브라우터 구현 */}
        </div>
       
    </div>
  )
}


export default Member