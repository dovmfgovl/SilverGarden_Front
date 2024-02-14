import React, { useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'

const MemberSearchbar2 = ({getMember}) => {
    const [gubun, setGubun]=useState("");
    const [keyword, setKeyword] = useState("");
    const [title, setTitle] = useState("전체");

    const handleChange = (e) => {
      const text = e.target.innerText;
      const id = e.target.id;
      if (text === "전체") {
        getMember();
      } else {
        const params = { gubun: id, keyword: keyword };
        getMember(params);
        setKeyword('');
      }
      setGubun(id);
      setTitle(text);
    };
      const handleSearch = () =>{
        if(keyword !== "" && gubun !== ""){
          const params = {gubun: gubun, keyword: keyword};
          getMember(params);
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
      
        <InputGroup  className="mb-3">
          <InputGroup.Text>이용자 검색</InputGroup.Text>
          <DropdownButton 
            variant='outline-primary' 
            title={title}
            id="input-group-dropdown-1"
          >
            <Dropdown.Item onClick={handleChange} >전체</Dropdown.Item>
            <Dropdown.Item id="client_name" onClick={handleChange} value="client_name">이름</Dropdown.Item>
            <Dropdown.Item id="client_manager" onClick={handleChange} value="client_manager">담당자</Dropdown.Item>
          </DropdownButton>
             <Form.Control aria-label="Text input with dropdown button" value={keyword} onChange={(e)=>setKeyword(e.target.value)} onKeyDown={handleKeyDown}/>
          <Button variant="info" onClick={handleSearch}> 검색</Button>
          </InputGroup>


    </>
  )
}

export default MemberSearchbar2