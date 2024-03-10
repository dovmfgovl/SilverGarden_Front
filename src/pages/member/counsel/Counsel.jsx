import React, { useEffect, useState } from 'react'
import CounselRow from './CounselRow';
import { getCounselList } from '../../../services/api/memberApi';
import CounselCreate from './CounselCreate';


const Counsel = ({selectedMember}) => {
  const [counselList,setCounselList]=useState([]);

  const getCounsel =async (params)=>{
    const response = await getCounselList(params)
    setCounselList(response.data);
  }
  
  useEffect(()=>{
    getCounsel();
  },[])
  
  return (
    <>
    <div>
      <CounselRow  selectedMember={selectedMember} counselList={counselList} getCounsel={getCounsel}/>
      <CounselCreate selectedMember={selectedMember} getCounsel={getCounsel}/>
    </div>
    </>
  )
}

export default Counsel