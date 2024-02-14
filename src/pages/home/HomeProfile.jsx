import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

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
    <div>
    <Button variant="outline-primary">출근</Button>{' '}
    <Button variant="outline-secondary">퇴근</Button>{' '}
    </div>
  </>
  )
}

export default HomeProfile