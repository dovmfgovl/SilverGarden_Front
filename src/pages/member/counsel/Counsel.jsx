import React, { useEffect, useState } from 'react'
import CounselRow from './CounselRow';
import { getCounselList } from '../../../services/api/memberApi';
import CounselCreate from './CounselCreate';


const Counsel = ({selectedMember}) => {
  const [counselList,setCounselList]=useState([]);

  const Counsel =async (params)=>{
    const response = await getCounselList(params)
    console.log(response.data);
    setCounselList(response.data);
  }
  
  useEffect(()=>{
    Counsel();
  },[])
  
  return (
    <>
    <div>
      <CounselRow   selectedMember={selectedMember} counselList={counselList}/>
      <CounselCreate selectedMember={selectedMember} />
    </div>
    </>
  )
}

export default Counsel