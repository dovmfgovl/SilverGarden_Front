import {faHome} from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import styles from './home.module.css'
import SidebarCommon from '../../components/sidebar/SidebarCommon';
import HomeProfile from './HomeProfile';

const Home = () => {
    const sidebarList = [{
      label: '홈',
      icon: faHome,
      isOpen:true,//시작시 열려있도록 함
    },
  ];

  return (
    <div className={styles.homeWrap}>
      <div className={styles.profileWrap}><HomeProfile/></div>
      <div className={styles.sidebarWrap}><SidebarCommon list={sidebarList}/></div>
      <div className={styles.homeInnerContentWrap}>Home 화면</div>
    </div>
  )
}

export default Home