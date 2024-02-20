import React, { useEffect, useState } from 'react';
import styles from './member.module.css';
import { Button, Table, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import MemberRow from './MemberRow';
import MemberDetail from './MemberDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getMemList, setSearchKeywords, setShowAll } from '../../redux/memberSlice';

const MemberInfo = () => {
  const [gubun, setGubun] = useState("");
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("전체");
  const dispatch = useDispatch();
  const memberList = useSelector(state => state.memberSlice.value)
  const memberDetail = useSelector(state => state.memberSlice.selectedMember)

  useEffect(()=>{
    dispatch(getMemList())
  },[dispatch])

  const handleChange = (e) => {
    const text = e.target.innerText;
    const id = e.target.id;
    if (text === "전체") {
      dispatch(setShowAll());
    } else {
      const params = { gubun: id, keyword: keyword };
      dispatch(setSearchKeywords(keyword));
    }
    setGubun(id);
    setTitle(text);
  };

  const handleSearch = () => {
    if (keyword !== "" && gubun !== "") {
      const params = { gubun: gubun, keyword: keyword };
      dispatch(setSearchKeywords(keyword));
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
      <div className={styles.InnerMemberLayout}>
        <div className={styles.leftMemberLayout}>
          <h2>▶︎&nbsp;이용자목록</h2>
          <InputGroup className="mb-3">
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
            <Form.Control aria-label="Text input with dropdown button" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={handleKeyDown} />
            <Button variant="info" onClick={handleSearch}> 검색</Button>
          </InputGroup>
          {/* 이용자목록  */}
          <div className="col border border-white border-2" style={{ background: 'hsl(193, 6%, 88%)' }}>
            <Table striped bordered hover>
              <thead style={{ background: 'hsl(193, 52%, 88%)' }}>
                <tr>
                  <th className='text-center'>이름</th>
                  <th className='text-center'>생년월일</th>
                  <th className='text-center'>담당자</th>
                </tr>
              </thead>
                  <tbody>
                    {memberList.map(member=>(
                      <MemberRow key={member.CLIENT_ID} member={member}/>
                    ))}
                  </tbody>
            </Table>
          </div>
          <Button variant="warning" onClick={() => dispatch(getMemList())}>전체조회</Button>
        </div>
        <div className={styles.rightMemberLayout1}>
          <MemberDetail  />
        </div>
      </div>
    </>
  );
};

export default MemberInfo;
