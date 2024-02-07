import React from 'react'
import { Navbar } from 'react-bootstrap'
import styles from './footbar.module.css'

const FootBar = () => {
  return (
    <div id={styles.footerWrap}>{/* 부트스트랩 태그에 css 넣는 방법  */}
    <Navbar className={styles.footer}bg="dark">
      SilverGarden Copyright &copy; 2024
    </Navbar>
  </div>
  )
}

export default FootBar