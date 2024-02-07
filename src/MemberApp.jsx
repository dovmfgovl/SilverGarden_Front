import React from 'react'
import styles from './memberapp.module.css'
import BootInclude from './components/include/BootInclude'
import { Provider } from 'react-redux'
import store from './redux/store'
import MemberNavBar from './components/header/MemberNavBar'
import MemberHome from './pages/memberhome/MemberHome'

const MemberApp = () => {
  return (
    <div className="MemberApp">
      <Provider store={store}>
      <BootInclude/>
        <div className={styles.memberappWrap}>
          <div className={styles.memberappHeaderWrap}><MemberNavBar/></div>
          <div className={styles.memberappContentWrap}>
            <MemberHome></MemberHome>
          </div>
          <div className={styles.memberappFooterWrap}>footbar</div>
          
        </div>
      </Provider>
  </div>
  )
}

export default MemberApp