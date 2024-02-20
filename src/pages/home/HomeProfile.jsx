import React from 'react'
import { useSelector } from 'react-redux'
import AtStart from '../admin/AtStart'
import AtEnd from '../admin/AtEnd'
import styles from './home.module.css'

const HomeProfile = () => {
  const empData = useSelector(state => state.userInfoSlice)

  console.log(empData);
  return (
    <>
    <div>
      <img src={empData.e_profile} alt="프로필" />
    </div>
    <div>{empData.e_name}</div>
    <div>{empData.e_no}</div>
    <div className={styles.at}>
      <AtStart />
      <AtEnd />
    </div>
  </>
  )
}

export default HomeProfile