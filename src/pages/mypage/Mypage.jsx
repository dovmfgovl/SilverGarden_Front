import React, { useEffect, useState } from 'react'
import styles from './mypage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersRectangle, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons'
import MypageMainCon from './MypageMainCon'
import SidebarCommon from '../../components/sidebar/SidebarCommon'
import ChangePwModal from './ChangePwModal'
import { Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getEmpList, setDetail} from '../../redux/empInfosSlice' 

const Mypage = () => {
  const selectedEmployee = useSelector(state => state.empInfos.selectedEmployee) || {};
    const dispatch = useDispatch();
 //insert here 로그인한 유저의 정보만 보이게 만들기 
 //토큰과 비교하고 그 토큰에 적힌 정보와 empinfo 리덕스에서 가진 정보가 일치하는지 보는 것

  const [modal,setModal]=useState('');
  const [showModal, setShowModal] = useState(false); // 모달  추가

  const list = [//이 리스트를 props를 넣어주면 원하는 목록의 사이드바를 생성 가능
  {
    label: '마이페이지',//목록이름
    icon: faUsersViewfinder,//fontAwsome 아이콘 명
    isOpen:true,
    subMenuItems: [//서브목록 정보
    { label: '비밀번호 변경', icon: faUsersRectangle},//서브목록이름, 아이콘명, 클릭시넘어갈 url
  ],
  },
];
const handleMenu=(menuTitle)=>{
  console.log(showModal);
  if (menuTitle==="비밀번호 변경") {
    setShowModal(true)
    setModal(menuTitle);
    
  }
}

const handleCloseModal =() =>{
  setShowModal(false);
}
  return (
    <>
     <div className={styles.MypageContainerLayout}>
     <div className={styles.mypageTitlebar}><FontAwesomeIcon icon={faUsersRectangle}/> 마이페이지 </div>
     <div className={styles.sidebarLayout}><SidebarCommon list={list} handleMenu={handleMenu}></SidebarCommon></div>
     {modal&&
            <>
          {modal ==="비밀번호 변경" &&<ChangePwModal show={showModal}  handleClose={handleCloseModal} />}
          </>
           }
    <div className={styles.innerContentLayout}>
      <SelectWho />
    <MypageMainCon/>
    </div>
     </div>
    </>

  )
}

export const SelectWho = () => {
  const empList = useSelector(state => state.empInfos.value);
  const empDetail = useSelector(state => state.empInfos.selectedEmployee) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmpList());
  }, [dispatch]);

  
  const onChange = (value) => {
    console.log(`selected ${value}`);
    dispatch(setDetail(value));

    // 여기서 선택한 직원을 detail의 대상으로 설정합니다.
    const selectedEmp = empList.find(emp => emp.E_NAME === value);
    dispatch(setDetail(selectedEmp));
  };

  
  const empOptions = empList.map(emp => ({
    key: emp.E_NO,
    value: emp.E_NAME,
    label: emp.E_NAME,
  }));
  
  const sortOptions = (options) =>
    options.sort((a, b) => a.label.localeCompare(b.label));
  const sortedOptions = sortOptions(empOptions);

  return (
    <Select 
      showSearch
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={onChange}
      options={sortedOptions}
    />
  );
};




export default Mypage