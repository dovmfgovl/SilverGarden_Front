import { faComment, faCrosshairs, faSolarPanel } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import styles from './approval.module.css'
import SidebarCommon from '../../components/sidebar/SidebarCommon';

const Approval = () => {
  const list = [//이 리스트를 props를 넣어주면 원하는 목록의 사이드바를 생성 가능
  {
    label: '결재',//목록이름
    icon: faSolarPanel,//fontAwsome 아이콘 명
    isOpen:true,
    subMenuItems: [//서브목록 정보
      { label: '결재대기함', icon: faCrosshairs},//서브목록이름, 아이콘명, 클릭시넘어갈 url
      { label: '결재진행함', icon: faComment},
      { label: '반려문서함', icon: faComment},
      { label: '결재완료문서', icon: faComment},
    ],
  },
  {
    label: '기안',
    icon: faSolarPanel,
    isOpen:true,
    subMenuItems: [
      { label: '결재문서작성', icon: faComment },
      { label: '임시보관함', icon: faComment },
      { label: '결재요청함', icon: faComment },
    ],
  },
];
  return (
    <div className={styles.approvalWrap}>
      <div className={styles.approvalSidebarWrap}><SidebarCommon list={list}/></div>
      <div className={styles.approvalContentWrap}>Content</div>
    </div>
  )
}

export default Approval