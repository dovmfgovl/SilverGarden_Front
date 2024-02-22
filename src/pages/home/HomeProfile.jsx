import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import userInfoSlice from '../../redux/userInfoSlice'
import AtStart from '../admin/AtStart'
import AtEnd from '../admin/AtEnd'
import styles from './home.module.css'

const HomeProfile = () => {
  const empData = useSelector(state => state.userInfoSlice)

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