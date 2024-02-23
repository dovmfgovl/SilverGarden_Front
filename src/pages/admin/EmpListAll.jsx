import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import EmpRow from "./EmpRow";
import { Button, Form } from "react-bootstrap";
import styles from "./empInfo.module.css";
import ExcelForm from './ExcelForm';
import { useDispatch, useSelector } from 'react-redux';
import { getEmpList, setDetail, setSearchKeywords, setShowAll, toggleIncludeResigned } from '../../redux/empInfosSlice';
import EmpCreateModal from './EmpCreateModal';
import EmpListPagination from './EmpListPagination';

const EmpListAll = () => {
    // 검색어 상태와 퇴사자 포함 여부를 관리
    const [searchKeyword, setSearchKeyword] = useState('');
    const includeResigned = useSelector(state => state.empInfos.includeResigned);
    const empList = useSelector(state => {
        const { value } = state.empInfos;
        // 검색어가 없을 때는 모든 직원을 표시하고, 퇴사자가 아닌 경우 필터링
        if (!searchKeyword) {
            return includeResigned ? value : value.filter(emp => emp.E_STATUS !== '퇴직');
        } else {
            // 검색어에 따라 필터링
            const filteredList = value.filter(emp =>
                emp.E_NAME.includes(searchKeyword) || emp.E_STATUS.includes(searchKeyword) || emp.E_RANK.includes(searchKeyword)
            );
            return includeResigned ? filteredList : filteredList.filter(emp => emp.E_STATUS !== '퇴직');
        }
    });
    const dispatch = useDispatch();

    // 초기 데이터 가져오기
    useEffect(() => {
        dispatch(getEmpList());
    }, [dispatch]);

    // 검색어 입력 처리
    const handleSearch = () => {
        dispatch(setSearchKeywords(searchKeyword));
    };

    // 엔터 키 처리
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // 전체 조회 버튼 클릭 처리
    const handleShowAll = () => {
        dispatch(setShowAll());
    };

    // 페이지네이션 관련 상태 변수 및 함수
    const[currentPage, setCurrentPage] = useState(1);
    const postPerPage = 10;
    const totalPosts = empList.length;

    // 페이지 변경 처리 함수
    const handleSetCurrentPage = (pageNo) => {
        setCurrentPage(pageNo);
    }

    // 현재 페이지에 해당하는 게시물의 인덱스 계산
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const selectedlist = empList.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <>
            <div className={styles.container} style={{ padding: '0px 20px 0px 0px', borderLeft: 'none' }}>
                <div className={styles.pageHeader}>
                    <h5>직원목록</h5>
                    <hr />
                </div>

                <div className={styles.row}>
                    <div className="col-2">
                        <select id="gubun" className="form-select" aria-label="분류">
                            <option defaultValue>분류</option>
                            <option value="E_NAME">사원명</option>
                            <option value="E_STATUS">현황</option>
                            <option value="E_RANK">직급</option>
                        </select>
                    </div>
                    <div className="col-7">
                        <input
                            type="text"
                            id="keyword"
                            className="form-control"
                            placeholder="검색어를 입력하세요"
                            aria-label="검색어를 입력하세요"
                            aria-describedby="btn_search"
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            value={searchKeyword}
                            onKeyDown={handleKeyPress}
                        />
                    </div>
                    <div className="col-1">
                        <Button variant="dark" id="btn_search" onClick={handleSearch}>
                            검색
                        </Button>
                    </div>
                    <div className="col-2">
                        <Button variant="outline-secondary" onClick={() => handleShowAll()}>
                            전체조회
                        </Button>
                    </div>
                </div>

                <div className={styles.empList}>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th style={{width: "5%"}}>#</th>
                                <th style={{width: "12%"}}>사원번호</th>
                                <th style={{width: "9%"}}>현황</th>
                                <th style={{width: "13%"}}>사원명</th>
                                <th style={{width: "15%"}}>부서</th>
                                <th style={{width: "12%"}}>직급</th>
                                <th style={{width: "17%"}}>전화번호</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 현재 페이지에 해당하는 직원 목록 표시 */}
                            {selectedlist.map((emp, index) => (
                            <EmpRow key={emp.E_NO} emp={emp} currentPage={currentPage} postPerPage={postPerPage} index={index} />
                        ))}
                        </tbody>
                    </Table>
                    {/* 페이지네이션 컴포넌트 */}
                    <div className={styles.empListPagination}>
                        <EmpListPagination currentPage={currentPage} totalPosts={totalPosts} postPerPage={postPerPage} handleSetCurrentPage={handleSetCurrentPage}></EmpListPagination>
                    </div>

                    <hr />
                    <span className={`${styles.empListFooter} row`}>
                        <span className="col-2">
                            <ExcelForm empList={empList}/>
                        </span>
                        <span className="col-3">
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="switch"
                                    label="퇴사자 포함"
                                    checked={includeResigned}
                                    onChange={() => dispatch(toggleIncludeResigned())}
                                />
                            </Form>
                        </span>                    
                        <span className="col-7">
                            <EmpCreateModal/>
                        </span>
                    </span>
                </div>
            </div>
        </>
    );
};

export default EmpListAll;