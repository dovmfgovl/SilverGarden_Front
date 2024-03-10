import {faCaretRight, faEnvelope, faFloppyDisk,faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styles from './message.module.css'
import SidebarCommon from '../../components/sidebar/SidebarCommon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MessageReceive from './MessageReceive';
import MessageSend from './MessageSend';
import MessageDeleted from './MessageDeleted';
import MessageWrite from './MessageWrite';
import MessageProfile from './MessageProfile';
import MessageReceiveDetail from './MessageReceiveDetail';
import MessageSendDetail from './MessageSendDetail';
import MessageStored from './MessageStored';
import MessageDeletedDetail from './MessageDeletedDetail';
import MessageStoredDetail from './MessageStoredDetail';

const Message = () => {

  useEffect(()=>{

  },[])

  const list = [{
    label: '받은쪽지함',//목록이름
    icon: faEnvelope,//fontAwsome 아이콘 명
    isOpen:true,
  },
  {
    label: '보낸쪽지함',
    icon: faEnvelope,
    isOpen:true,
  },
  {
    label: '쪽지보관함',
    icon: faFloppyDisk,
    isOpen:true,
  },  
  {
    label: '휴지통',
    icon: faTrash,
    isOpen:true,
  }
];

const [messagePage, setPage] = useState("받은쪽지함");//기본페이지 결재대기함
const empData = useSelector(state => state.userInfoSlice)//empData내 데이터 형태는 아래와 같음
const [messageDetail, setMessageDetail] = useState("");

const handleMenu = (menuTitle, messageDetail) =>{//사이드바 메뉴를 조작하는 함수
  setPage(menuTitle)
  if(messageDetail){
    setMessageDetail(messageDetail)
  }}

  return (
    <div className={styles.messageWrap}>
    <div className={styles.profileWrap}><MessageProfile handleMenu={handleMenu}/></div>
    <div className={styles.messageSidebarWrap}><SidebarCommon list={list} handleMenu ={handleMenu}/></div>
    <div className={styles.messageTitleBar}>
    <FontAwesomeIcon icon={faCaretRight} />
      {" "+messagePage}
    </div>
    <div className={styles.messageContentWrap}>
      {messagePage === "받은쪽지함" && <MessageReceive handleMenu={handleMenu} empData={empData} messagePage={messagePage}/>}
      {messagePage === "보낸쪽지함" && <MessageSend handleMenu={handleMenu} empData={empData} messagePage={messagePage}/>}
      {messagePage === "쪽지보관함" && <MessageStored handleMenu={handleMenu} empData={empData} messagePage={messagePage}/>}
      {messagePage === "휴지통" && <MessageDeleted handleMenu={handleMenu} empData={empData} messagePage={messagePage}/>}
      {messagePage === "받은쪽지상세" && <MessageReceiveDetail handleMenu={handleMenu} empData={empData} messageDetail={messageDetail}/>}
      {messagePage === "보낸쪽지상세" && <MessageSendDetail handleMenu={handleMenu} empData={empData} messageDetail={messageDetail}/>}
      {messagePage === "보관된쪽지" && <MessageStoredDetail handleMenu={handleMenu} empData={empData} messageDetail={messageDetail}/>}
      {messagePage === "삭제된쪽지" && <MessageDeletedDetail handleMenu={handleMenu} empData={empData} messageDetail={messageDetail}/>}
      {messagePage === "쪽지쓰기" && <MessageWrite handleMenu={handleMenu} empData={empData} />}
    </div>
  </div>
  )
}

export default Message