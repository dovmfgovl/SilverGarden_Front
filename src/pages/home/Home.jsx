import {faBusinessTime} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import styles from './home.module.css'
import SidebarCommon from '../../components/sidebar/SidebarCommon';
import HomeProfile from './HomeProfile';
import CustomShapeLineChartComponent from '../programdashboard/CustomShapeChartComponent';
import ChartComponent from '../programdashboard/ChartComponent';
import { useSelector } from 'react-redux';
import { getApprovalDocCount } from '../../services/api/approvalApi';
import { messageReceiveList } from '../../services/api/messageApi';
import { getNoticeList } from '../../services/api/noticeApi';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserAPage } from '../../services/auth/UserApi';
import HomeCalendarInfo from './HomeCalendarInfo';
import ChattingBar from '../../components/chatting/ChattingBar';

const Home = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    UserAPage()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const empData = useSelector((state) => state.userInfoSlice);

  /////////////////// 결재 /////////////////////////////////////////////////
  const [docCount, setDocCount] = useState({
    deny_cnt: 0,
    wait_cnt: 0,
    progress_cnt: 0
  });

  const getDocCount = async () =>{
    const response = await getApprovalDocCount({e_no:empData.e_no})
    setDocCount(response.data)

  }

  useEffect(()=>{
    getDocCount();
  },[])

  ///////////////// 쪽지 //////////////////////////////////////////////////////
  const [receiveList, setReceiveList] = useState([]);

  const getMessageList = async () =>{
    const response = await messageReceiveList({e_no: empData.e_no})
    // 'read_status'가 "N"인 쪽지만 필터링하여 새로운 배열 생성
  const unreadMessages = response.data.filter(message => message.read_status === "N");
    setReceiveList(unreadMessages);
    console.log(unreadMessages);
  }
  useEffect(()=>{
    getMessageList();
  },[])

  ///////////////// 공지사항 //////////////////////////////////////////
  const [noticeList, setNoticeList] = useState([]);

  const getNoticeLists = async (params) => {
    //DB에서 리스트를 불러오는 함수
    const response = await getNoticeList(params);
    const recentNotice = response.data.slice(0, 8);
    console.log(recentNotice);
    setNoticeList(recentNotice);
  };

  useEffect(() => {
    getNoticeLists();
  }, []);

  return (
    <>
    <div className={styles.homeWrap}>
      <div className={styles.profileWrap}><HomeProfile/></div>
      <div className={styles.sidebarWrap}>
        <ChattingBar empData={empData}/>
      </div>
      <div className={styles.firstContentWrap}>
        <div className={styles.subContentWrap}>
          <h4 className={styles.titleWrap}>결재</h4>
          <Link to="/approval">
            <button className={styles.moreButton}>
              더보기
            </button>
          </Link>
          <div className={styles.approvalWrap1}>
            <div className={styles.approval}>나의 결재대기 문서</div> 
            <div className={styles.approval}>{docCount.wait_cnt}건</div>
          </div>
          <div className={styles.approvalWrap2}>
            <div className={styles.approval}>나의 결재진행 문서</div> 
            <div className={styles.approval}>{docCount.progress_cnt}건</div>
          </div>
          <div className={styles.approvalWrap3}>
            <div className={styles.approval}>나의 결재반려 문서</div> 
            <div className={styles.approval}>{docCount.deny_cnt}건</div>
          </div>
        </div>
          <div className={styles.subContentWrap2}>
              <h4 className={styles.titleWrap}>쪽지함</h4>
              <Link to="/message">
                <button className={styles.moreButton}>
                  더보기
                </button>
              </Link>
            <div className={styles.messageWrap}>
              <div className={styles.approval}>나의 읽지 않은 쪽지({receiveList.length})</div> 
                <div className={styles.message_table_container}>
                  <Table className={styles.messageTable}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>발신자</th>
                        <th>제목</th>
                        <th>발신날짜</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receiveList.map((message, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{message.writer_name}</td>
                          <td>{message.me_title}</td>
                          <td>{message.reg_date.slice(0, 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        <div className={styles.secondContentWrap}>
          <h4 className={styles.titleWrap}>일정표</h4>
          <HomeCalendarInfo />
        </div>
        <div className={styles.thirdContentWrap}>
          <h4 className={styles.titleWrap}>공지사항</h4>
          <Link to="/notice">
            <button className={styles.moreButton}>
              더보기
            </button>
          </Link>
        <div className={styles.messageWrap}>
          <div className={styles.notice}>최근 공지사항</div> 
            <div className={styles.message_table_container}>
              <Table className={styles.messageTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>작성자</th>
                    <th>제목</th>
                    <th>작성날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {noticeList.map((notice, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{notice.E_NAME}</td>
                      <td>{notice.N_TITLE}</td>
                      <td>{notice.REG_DATE}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>      
      <div className={styles.forthContentWrap}>
        <div className={styles.subContentWrap}>
          <h4 className={styles.titleWrap}>대시보드</h4>
          {/* <CustomShapeLineChartComponent /> */}
        </div>
        <div className={styles.subContentWrap2}>
          {/* <h4 className={styles.titleWrap}>대시보드2</h4> */}
          {/* <ChartComponent /> */}
        </div>
      </div>
    </div>
    </>
  )
}

export default Home;
