import React, { useEffect, useState } from 'react';
import styles from './member.module.css';
import { Button, Table, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import MemberRow from './MemberRow';
import MemberDetail from './MemberDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getMemList, setSearchKeywords, setShowAll } from '../../redux/memberSlice'; // 수정된 부분

const MemberInfo = () => {
  const dispatch = useDispatch();
  const memberList = useSelector(state => state.memberSlice.value);
  const memberDetail = useSelector(state => state.memberSlice.selectedMember);
  const searchKeyword = useSelector(state => state.memberSlice.searchKeyword); // 수정된 부분
  const searchResult = useSelector(state => state.memberSlice.searchResult); // 수정된 부분

  const [title, setTitle] = useState("전체");

  useEffect(() => {
    dispatch(getMemList());
  }, [dispatch]);

  const handleChange = (event) => {
    setTitle(event.target.innerText);
  };

  const handleSearch = () => {
    if (searchKeyword.trim() !== "") { // 검색어가 비어 있지 않을 때만 검색 수행
      // 여기서 검색 액션을 디스패치하여 검색 결과 업데이트
      // 검색 결과는 Redux 상태인 searchResult에 저장됨
      // 여기서는 간단하게 문자열을 포함하는 멤버를 검색하는 예시로 작성
      const result = memberList.filter(member =>
        member.client_name.includes(searchKeyword) || member.client_manager.includes(searchKeyword)
      );
      dispatch(setSearchKeywords(result));
    } else {
      // 검색어가 비어 있을 경우 모든 멤버를 보여줌
      dispatch(setShowAll());
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
              <Dropdown.Item onClick={handleChange}>전체</Dropdown.Item>
              <Dropdown.Item onClick={handleChange} value="client_name">이름</Dropdown.Item>
              <Dropdown.Item onClick={handleChange} value="client_manager">담당자</Dropdown.Item>
            </DropdownButton>
            <Form.Control aria-label="Text input with dropdown button" value={searchKeyword} onChange={(e) => dispatch(setSearchKeywords(e.target.value))} />
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
                {searchKeyword.trim() !== "" ? // 검색어가 있을 때는 검색 결과를 사용
                  searchResult.map(member => (
                    <MemberRow key={member.CLIENT_ID} member={member} />
                  )) :
                  memberList.map(member => (
                    <MemberRow key={member.CLIENT_ID} member={member} />
                  ))}
              </tbody>
            </Table>
          </div>
          <Button variant="outline-warning" onClick={() => dispatch(getMemList())}>전체조회</Button>
        </div>
        <div className={styles.rightMemberLayout1}>
          <MemberDetail />
        </div>
      </div>
    </>
  );
};

export default MemberInfo;
