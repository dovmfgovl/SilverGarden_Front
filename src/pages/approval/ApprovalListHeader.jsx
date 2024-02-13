import React from 'react'
import { Button } from 'react-bootstrap'
import ApprovalSearchBar from './ApprovalSearchBar'

const ApprovalListHeader = ({handleMenu}) => {

  return (
    <>
    <div className='mb-4'><ApprovalSearchBar/></div>
    <div>
        <Button style={{height:"60px"}} onClick={()=>{handleMenu("결재대기함")}} className="mx-5" variant="primary" size="lg">결재대기: 0건</Button>{' '}
        <Button style={{height:"60px"}} onClick={()=>{handleMenu("결재진행함")}} className="mx-5" variant="secondary" size="lg">결재진행: 0건</Button>{' '}
        <Button style={{height:"60px"}} onClick={()=>{handleMenu("반려문서함")}} className="mx-5" variant="danger" size="lg">결재반려: 0건</Button>{' '}
    </div>
    </>
  )
}

export default ApprovalListHeader