import React, { useEffect, useState } from 'react'
import SidebarCommon from '../../components/sidebar/SidebarCommon'
import styles from './notice.module.css'
import {faComment, faList, faPenNib, faPenToSquare, faSolarPanel } from '@fortawesome/free-solid-svg-icons'
import NoticeList from './NoticeList'
import NoticeDetail from './NoticeDetail'
import NoticeWrite from './NoticeWrite'
import { getNoticeList } from '../../services/api/noticeApi'

const Notice = () => {
  ///////sidebar 메뉴 start//////
 const sidebarList = [{
    label: '공지사항게시판',//서브메뉴가 없을 때는 다음과 같은 형식으로 입력
    icon: faPenNib,
    isOpen:true,
    subMenuItems: [
      { label: '전체공지', icon: faList},
      { label: '공지작성', icon: faPenToSquare },
    ],
  },
];
const [noticePage, setPage] = useState("전체공지");//기본페이지는 noticeList
const [noticeNo, setNoticeNo] = useState({});
const [noticeList, setNoticeList] = useState([]);

const handleMenu = (menuTitle) =>{//사이드바 메뉴를 조작하는 함수
  setPage(menuTitle)
}


const getList = async ()=>{//DB에서 리스트를 불러오는 함수
  const response = await getNoticeList()
  console.log(response.data);
  setNoticeList(response.data);
}

useEffect(() =>{
  getList();
},[])


const handlePage = (page, n_no) =>{//페이지를 조작하는 함수
  if(n_no){
    console.log(n_no);
    setNoticeNo(n_no)
  }
  setPage(page)
}

///////////////pagenation 관련 ////////////////
const [totalPage, setTotalPage] = useState(1);
const [currentPage, setCurrentPage] = useState(1);



  return (
    <div className={styles.noticeContainerLayout}>
      <div className={styles.sidebarLayout}>
        <SidebarCommon list={sidebarList} handleMenu={handleMenu}/>
      </div>
      <div className={styles.innerContentLayout}>
        {noticePage === "전체공지"  && <NoticeList noticeList={noticeList} handlePage={handlePage}/>}
        {noticePage === "공지상세"  && <NoticeDetail noticeNo={noticeNo} handlePage={handlePage}/>}
        {noticePage === "공지작성"  && <NoticeWrite handlePage={handlePage}/>}
      </div>
    </div>
  )
}

export default Notice