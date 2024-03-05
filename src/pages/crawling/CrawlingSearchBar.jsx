import React, { useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'

const CrawlingSearchBar = ({ getDataList }) => {
  const [gubun, setGubun] = useState("");
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("전체");

  const handleChange = (e) => {
    const text = e.target.innerText;
    if (text === "전체") {
      getDataList();
    }
    setTitle(text);

    // id 값에 따라 실제 검색에 사용될 gubun 값을 설정
    let newGubun = "";
    switch (e.target.id) {
      case "crawled_title":
        newGubun = "title";
        break;
      case "crawled_sitename":
        newGubun = "sitename";
        break;
      default:
        newGubun = "";
    }
    setGubun(newGubun);
  };

  const handleSearch = () => {
    if (keyword !== "" && gubun !== "") {
      const params = { gubun: gubun, keyword: keyword };
      getDataList(params);
      setKeyword('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
      setKeyword('');
    }
  };

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
          <Dropdown.Item onClick={handleChange} id="crawled_title">제목</Dropdown.Item>
          <Dropdown.Item onClick={handleChange} id="crawled_sitename" >출처</Dropdown.Item>
        </DropdownButton>
        <Form.Control aria-label="Text input with dropdown button" value={keyword} onChange={(e)=>setKeyword(e.target.value)} onKeyDown={handleKeyDown}/>
      </InputGroup>
      <Button className='mt-2' variant="primary" onClick={handleSearch}>검색</Button>
    </>
  )
}

export default CrawlingSearchBar

// import React, { useState } from 'react'
// import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux';
// import { setFilteredDatas, setFilters } from '../../redux/crawlingSlice';

// const CrawlingSearchBar = () => {
//   const dispatch = useDispatch();
//   const filters = useSelector((state) => state.crawlingSlice.filters);
  
//   const handleSearch = () =>{
//     dispatch(setFilters({ searchTitle: "Your Search Logic Here", selectedCategory: "Your Category Logic Here" }));
//     dispatch(setFilteredDatas());
//   }
  
//   const handleKeyDown = (e) =>{
//     if(e.keyCode === 13){
//       handleSearch();
//     }
//   }

//   return (
//     <>
//       <InputGroup size='lg'>
//         <InputGroup.Text>게시물 검색</InputGroup.Text>
//         <DropdownButton
//           variant="outline-secondary"
//           id="input-group-dropdown-1"
//         >
//           <Dropdown.Item>전체</Dropdown.Item>
//           <Dropdown.Item id="crawled_title">제목</Dropdown.Item>
//           <Dropdown.Item id="crawled_sitename" >출처</Dropdown.Item>
//         </DropdownButton>
//         <Form.Control aria-label="Text input with dropdown button" onKeyDown={handleKeyDown}/>
//       </InputGroup>
//       <Button className='mt-2' variant="primary" onClick={handleSearch}>검색</Button>
//     </>
//   )
// }

// export default CrawlingSearchBar