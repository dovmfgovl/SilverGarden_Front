import React, { useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'

const NoticeSearchBar = () => {
  const [gubun, setGubun] = useState("전체");
  
  const handleChange = (e) =>{
    const text = e.target.innerText
    setGubun(text);
  }

  return (
    <>
      <InputGroup size='lg'>
        <InputGroup.Text>게시물 검색</InputGroup.Text>
        <DropdownButton
          variant="outline-secondary"
          title={gubun}
          id="input-group-dropdown-1"
        >
          <Dropdown.Item onClick={handleChange}>전체</Dropdown.Item>
          <Dropdown.Item onClick={handleChange} >내용</Dropdown.Item>
          <Dropdown.Item onClick={handleChange} >작성자</Dropdown.Item>
        </DropdownButton>
        <Form.Control aria-label="Text input with dropdown button" />
      </InputGroup>
      <Button className='mt-2' variant="primary">검색</Button>
    </>
  )
}

export default NoticeSearchBar