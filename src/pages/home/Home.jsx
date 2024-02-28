import {faHome} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import styles from './home.module.css'
import SidebarCommon from '../../components/sidebar/SidebarCommon';
import HomeProfile from './HomeProfile';
import { getMemberList } from '../../services/api/memberApi';
import MemberChart from './MemberChart';
import CommonCalendarLogic from '../../components/fullcalendar/CommonCalendarLogic';
import ProgramChart from './ProgramChart';


const Home = () => {
  const sidebarList = [
    {
      label: "홈",
      icon: faHome,
      isOpen: true, //시작시 열려있도록 함
    },
  ];

  const [memberList, setMemberList] = useState([]);
  const [pgCalList, setPgCalList] = useState([]);
  const memberData = async () => {
    try {
      const response = await getMemberList();
      setMemberList(response); 
    } catch (error) {
      console.error('Error fetching member list:', error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await CommonCalendarLogic.listDB('calendar/list');
      setPgCalList(response); 
    } catch (error) {
      console.error('Error fetching member list:', error);
    }
  };
  useEffect(() => {
    memberData();
    fetchData();
    console.log(memberList); //{}
    console.log(pgCalList);
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출

  return (
    <div className={styles.homeWrap}>
      <div className={styles.profileWrap}><HomeProfile/></div>
      <div className={styles.sidebarWrap}><SidebarCommon list={sidebarList}/></div>
      <div className={styles.firstContentWrap}>
        <div className={styles.subContentWrap}>
          <h4 className={styles.titleWrap}>전자결재</h4>
          {/* <ApprovalListHeader /> */}
        </div>
        <div className={styles.subContentWrap2}>
          <h4 className={styles.titleWrap}>쪽지함</h4>
          {/* <ApprovalListHeader /> */}
        </div>
      </div>
      <div className={styles.secondContentWrap}>
        <h4 className={styles.titleWrap}>일정표</h4>
        {/* <ProgramCalendar /> */}
      </div>
      <div className={styles.thirdContentWrap}>
        <h4 className={styles.titleWrap}>공지사항</h4>
      </div>
      <div className={styles.forthContentWrap}>
        <div className={styles.subContentWrap}>
          <h4 className={styles.titleWrap}>대시보드</h4>
          <ProgramChart  pgCalList={pgCalList}/>
        </div>
        <div className={styles.subContentWrap2}>
          <h4 className={styles.titleWrap}>대시보드2</h4>
          <MemberChart memberList={memberList}/>
        </div>
      </div>
    </div>
  )
}

export default Home;