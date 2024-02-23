import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import ApprovalSearchBar from './ApprovalSearchBar'
import { getApprovalDocCount } from '../../services/api/approvalApi';

const ApprovalListHeader = ({handleMenu, empData}) => {
  const [docCount, setDocCount] = useState({
    deny_cnt: 0,
    wait_cnt: 0,
    progress_cnt: 0
  });

  const getDocCount = async () =>{
    const response = await getApprovalDocCount({e_no:empData.e_no})
    setDocCount(response.data)

  }
  useEffect(()=>{
    getDocCount();
  },[])


  return (
    <>
    <div className='mb-4'><ApprovalSearchBar/></div>
    <div>
        <Button style={{height:"60px"}} onClick={()=>{handleMenu("결재대기함")}} className="mx-5" variant="primary" size="lg">결재대기: {docCount.wait_cnt}건</Button>{' '}
        <Button style={{height:"60px"}} onClick={()=>{handleMenu("결재진행함")}} className="mx-5" variant="secondary" size="lg">결재진행: {docCount.progress_cnt}건</Button>{' '}
        <Button style={{height:"60px"}} onClick={()=>{handleMenu("반려문서함")}} className="mx-5" variant="danger" size="lg">결재반려: {docCount.deny_cnt}건</Button>{' '}
    </div>
    </>
  )
}

export default ApprovalListHeader