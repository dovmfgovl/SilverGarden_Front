import React from 'react'
import styles from './mypage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersRectangle } from '@fortawesome/free-solid-svg-icons'
import MypageMainCon from './MypageMainCon'

const Mypage = () => {
  return (
    <>
     <div className={styles.MypageContainerLayout}>
     <div className={styles.mypageTitlebar}><FontAwesomeIcon icon={faUsersRectangle}/> 마이페이지 </div>
    <div className={styles.innerContentLayout}>
    <MypageMainCon/>
    </div>
     </div>
    </>
    // 서브라우팅은 필요없이 구상만
      //admin emplist에 있는 대상을 쭉 나열한다(이걸 드랍다운으로 처리) 
        // 이후 jwt가 완성되는대로 이 자리에 대체한다.
        // 버튼 태그에 따라서 아래 나오는 페이지를 다르게 처리한다 -> 이건 서브라우팅 쓰면 될듯?
        //
    // empinfo의 포맷을 받는다. 
  )
}

export default Mypage