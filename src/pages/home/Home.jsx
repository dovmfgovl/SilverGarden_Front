import {faHome} from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import styles from './home.module.css'
import SidebarCommon from '../../components/sidebar/SidebarCommon';
import HomeProfile from './HomeProfile';
import ApprovalListHeader from '../approval/ApprovalListHeader';
import CustomShapeLineChartComponent from '../programdashboard/CustomShapeChartComponent';
import ProgramCalendar from '../programcalendar/ProgramCalendar';
import ChartComponent from '../programdashboard/ChartComponent';

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
          {/* <CustomShapeLineChartComponent /> */}
        </div>
        <div className={styles.subContentWrap2}>
          <h4 className={styles.titleWrap}>대시보드2</h4>
          {/* <ChartComponent /> */}
        </div>

      </div>
    </div>
  )
}

export default Home