import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './emplist.module.css'
import React, { useEffect, useState } from 'react'
import SidebarCommon from '../../components/sidebar/SidebarCommon';
import { faComment, faCrosshairs, faFile, faHouseMedical,faPeopleArrows,faPeopleGroup,faPersonChalkboard,faPersonCircleCheck,faSolarPanel } from '@fortawesome/free-solid-svg-icons';
import EmpListAll from './EmpListAll';
import {  getEmpList } from '../../services/api/empListApi';
import { Space } from 'antd';

const Emplist = () => {
  const [empListpage, setEmpListPage] = useState("전체"); // 초기에 진입했을 때 어떤 화면 진입하고 싶은지
  const [empList,setEmpList]=useState([]);
  const [dept,setDept]=useState('');

  const sendEmpList = async(params) => {
    const res = await getEmpList(params)
    console.log(res.data);
    console.table(res.data);
    setEmpList(res.data)
  }
  
  useEffect(()=>{
    if (empListpage === "전체") {
      sendEmpList();
    } else {
      // '전체'가 아닌 경우 gubun을 menuTitle로 설정하고 DEPT_NAME을 menuTitle로 설정하여 sendEmpList 함수 호출
      sendEmpList({ gubun: 'menuTitle', menuTitle: empListpage });
    }
  },[empListpage])


  const sidebarList = [//이 리스트를 props를 넣어주면 원하는 목록의 사이드바를 생성 가능
  {
    label: '직원조회',//목록이름
    icon: faSolarPanel,//fontAwsome 아이콘 명
    isOpen:true, // 시작 시 열려있도록 함
    subMenuItems: [//서브목록 정보
      { label: '전체', icon: faPeopleGroup},//서브목록이름, 아이콘명, 클릭시넘어갈 url
      { label: '간호팀', icon: faHouseMedical},
      { label: '사회복지팀', icon: faPeopleArrows},
      { label: '교육팀', icon: faPersonChalkboard},
      { label: '운영관리팀', icon: faPersonCircleCheck},
    ],
  },
];
const handleMenu = (menuTitle) =>{//사이드바 메뉴를 클릭했들 때 해당 페이지를 렌더링하기 위해 함수를 선언
  setEmpListPage(menuTitle);
  if (menuTitle !== '전체') {
    sendEmpList({ gubun: 'menuTitle', menuTitle: menuTitle });
    setDept(menuTitle)
  } else {
    // '전체'인 경우에는 기본적으로 전체 조회를 합니다.
    sendEmpList();
  }
}


  return (

    <div className={styles.empListsWrap}>
      <div className={styles.empListSidebarWrap}>
        <SidebarCommon list={sidebarList} handleMenu={handleMenu}/>
      </div>      
      <div className={styles.empListTitleBar}>
        <FontAwesomeIcon icon={faFile} />
        <Space>
          직원조회 ▶︎{empListpage}
        </Space>
      </div>
      <div className={styles.innerContentWrap}>
       {empListpage === "전체" && <EmpListAll empList={empList} handleMenu={handleMenu} sendEmpList={sendEmpList} />} 
       {empListpage === "간호팀" && <EmpListAll empList={empList} handleMenu={handleMenu} sendEmpList={sendEmpList} dept={dept}  />} 
       {empListpage === "사회복지팀" && <EmpListAll empList={empList} handleMenu={handleMenu} sendEmpList={sendEmpList} dept={dept}/>} 
       {empListpage === "교육팀" && <EmpListAll empList={empList} handleMenu={handleMenu} sendEmpList={sendEmpList} dept={dept}/>} 
       {empListpage === "운영관리팀" && <EmpListAll empList={empList} handleMenu={handleMenu} sendEmpList={sendEmpList}  dept={dept}/>} 
        
      </div>  
    </div>


  )
}


export default Emplist
