import React from 'react'
import MemberCarousel from '../../components/carousel/MemberCarousel'
import styles from './memberhome.module.css'

const MemberHome = () => {
  return (
    <div className={styles.memberHomeWrap}>
      <div className={styles.memberCarousel}>
        <MemberCarousel></MemberCarousel>
      </div>
      <div>content1</div>
    </div>
  )
}

export default MemberHome