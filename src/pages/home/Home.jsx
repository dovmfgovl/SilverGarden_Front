import {faList, faPenNib, faPenToSquare,} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import styles from './home.module.css'
import SidebarCommon from '../../components/sidebar/SidebarCommon';
import HomeProfile from './HomeProfile';

const Home = () => {
    const sidebarList = [{
      label: '홈',
      icon: faPenNib,
      isOpen:true,//시작시 열려있도록 함
      subMenuItems: [
        { label: '전체공지', icon: faList},
        { label: '공지작성', icon: faPenToSquare },
      ],
    },
  ];
  const handleMenu = (menuTitle) =>{//사이드바 메뉴를 클릭했들 때 해당 페이지를 렌더링하기 위해 함수를 선언
    setPage(menuTitle);
  } 

  const [page, setPage] = useState("전체공지");
  console.log(page);

  return (
    <div className={styles.homeWrap}>
      <div className={styles.profileWrap}><HomeProfile/></div>
      <div className={styles.sidebarWrap}><SidebarCommon list={sidebarList}/></div>
      <div className={styles.homeInnerContentWrap}>내용물</div>
    </div>
  )
}

export default Home