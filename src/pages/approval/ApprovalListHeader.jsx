import React, { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'
import { getApprovalDocCount } from '../../services/api/approvalApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ApprovalListHeader = ({handleMenu, empData, handleFilterdList}) => {
  const [docCount, setDocCount] = useState({
    deny_cnt: 0,
    wait_cnt: 0,
    progress_cnt: 0
  });

  const [title, setTitle] = useState("제목");
  const [gubun, setGubun] = useState("d_title")
  const [keyword, setKeyword] = useState("")

  const handleTitleSelect = (e)=>{
    setTitle(e.target.innerText)
    setGubun(e.target.id)
  }

  const handleEnter = (e) => {
    if(e.key === 'Enter'){
      handleFilterdList(gubun, keyword)
    }
    setKeyword("")
  }
  const handleKeyword = (e) =>{
    setKeyword(e.target.value)
  }

  const handleSearch = (e) =>{
    if(e.target.innerText === '전체목록'){
      handleFilterdList()
    }else{
      handleFilterdList(gubun, keyword)
    }
    setKeyword("")
  }

  const getDocCount = async () =>{
    const response = await getApprovalDocCount({e_no:empData.e_no})
    setDocCount(response.data)

  }
  useEffect(()=>{
    getDocCount();
  },[])


  return (
    <>
    <div className='mb-4'>
      <InputGroup style={{alignItems: "center"}} size='sm'>
      <FontAwesomeIcon className='mx-2' icon={faMagnifyingGlass} />
        <DropdownButton
          variant="secondary"
          title={title}
          id="input-group-dropdown-1"
        >
          <Dropdown.Item id="d_title" onClick={handleTitleSelect}>제목</Dropdown.Item>
          <Dropdown.Item id="d_content" onClick={handleTitleSelect}>내용</Dropdown.Item>
          <Dropdown.Item id="e_name" onClick={handleTitleSelect}>기안자</Dropdown.Item>
        </DropdownButton>
        <Form.Control aria-label="Text input with dropdown button" onKeyDown={handleEnter} onChange={handleKeyword} value={keyword}/>
        <Button variant="secondary" onClick={handleSearch}>검색</Button>
        <Button variant="secondary" className='ms-2' onClick={handleSearch}>전체목록</Button>
      </InputGroup>
    </div>
    <div>
        <Button style={{height:"60px"}} onClick={()=>{handleMenu("결재대기함")}} className="mx-5" variant="primary" size="lg">결재대기: {docCount.wait_cnt}건</Button>{' '}
        <Button style={{height:"60px"}} onClick={()=>{handleMenu("결재진행함")}} className="mx-5" variant="secondary" size="lg">결재진행: {docCount.progress_cnt}건</Button>{' '}
        <Button style={{height:"60px"}} onClick={()=>{handleMenu("반려문서함")}} className="mx-5" variant="danger" size="lg">결재반려: {docCount.deny_cnt}건</Button>{' '}
    </div>
    </>
  )
}

export default ApprovalListHeader