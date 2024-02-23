import React, { useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'

const NoticeSearchBar = ({getList}) => {
  const [gubun, setGubun] = useState("");
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("전체");
  
  const handleChange = (e) =>{
    const text = e.target.innerText
    if(text === "전체"){
      getList();
    }
    setGubun(e.target.id)
    setTitle(text);
  }

  const handleSearch = () =>{
    if(keyword !== "" && gubun !== ""){
      const params = {gubun: gubun, keyword: keyword};
      getList(params);
      setKeyword('');
    }
  }
  
  const handleKeyDown = (e) =>{
    if(e.keyCode === 13){
      handleSearch();
      setKeyword('');
    }
  }

  return (
    <>
      <InputGroup size='lg'>
        <InputGroup.Text>게시물 검색</InputGroup.Text>
        <DropdownButton
          variant="outline-secondary"
          title={title}
          id="input-group-dropdown-1"
        >
          <Dropdown.Item onClick={handleChange} >전체</Dropdown.Item>
          <Dropdown.Item onClick={handleChange} id="n_title">제목</Dropdown.Item>
          <Dropdown.Item onClick={handleChange} id="n_content" >내용</Dropdown.Item>
          <Dropdown.Item onClick={handleChange} id="e_name" >작성자</Dropdown.Item>
        </DropdownButton>
        <Form.Control aria-label="Text input with dropdown button" value={keyword} onChange={(e)=>setKeyword(e.target.value)} onKeyDown={handleKeyDown}/>
      </InputGroup>
      <Button className='mt-2' variant="primary" onClick={handleSearch}>검색</Button>
    </>
  )
}

export default NoticeSearchBar