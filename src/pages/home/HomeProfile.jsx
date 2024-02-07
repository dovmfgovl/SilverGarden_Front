import React from 'react'
import { Button } from 'react-bootstrap'

const HomeProfile = () => {
  return (
    <>
    <div>
      <img src="https://picsum.photos/200/200" alt="프로필" />
    </div>
    <div>박정원님</div>
    <div>
    <Button variant="outline-primary">출근</Button>{' '}
    <Button variant="outline-secondary">퇴근</Button>{' '}
    </div>
  </>
  )
}

export default HomeProfile