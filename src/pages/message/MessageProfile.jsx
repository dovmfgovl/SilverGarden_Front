import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const MessageProfile = ({handleMenu}) => {
  const empData = useSelector(state => state.userInfoSlice)

  return (
    <>
    <div>
      <img src={empData.e_profile ===null ?"https://picsum.photos/200/200" : empData.e_profile} alt="프로필" />
    </div>
    <div>{empData.e_name}</div>
    <div>{empData.e_no}</div>
    <div>
    <Button className='mt-3' variant="primary" onClick={()=>handleMenu("쪽지쓰기")}>쪽지쓰기</Button>{' '}
    </div>
  </>
  )
}

export default MessageProfile