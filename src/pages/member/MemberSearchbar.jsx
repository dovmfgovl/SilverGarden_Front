import React, { useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'

const MemberSearchbar = () => {
    const [gubun, setGubun]=useState("분류선택");

    const handleChange=(e)=>{
        const text= e.target.innerText
        setGubun(text);
    }
  return (
    <>
      
        <InputGroup  className="mb-3">
          <InputGroup.Text>이용자 검색</InputGroup.Text>
          <DropdownButton 
            variant='outline-primary' 
            title={gubun}
            id="input-group-dropdown-1"
          >
            <Dropdown.Item onClick={handleChange} >분류선택</Dropdown.Item>
            <Dropdown.Item onClick={handleChange} value="u_name">이름</Dropdown.Item>
            <Dropdown.Item onClick={handleChange} value="u_status">현황</Dropdown.Item>
            <Dropdown.Item onClick={handleChange} value="u_manager">담당자</Dropdown.Item>
          </DropdownButton>
             <Form.Control id="keyword" placeholder="검색어를 입력하세요" aria-label="검색어를 입력하세요" aria-describedby="btn_search"/>
          <Button variant="info"id="btn_search" > 검색</Button>
          </InputGroup>


    </>
  )
}

export default MemberSearchbar