import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import EmpRow from "./EmpRow";
import { Button, Form } from "react-bootstrap";
import styles from "./empInfo.module.css";
import ExcelForm from './ExcelForm';

const EmpListAll = ({ empList, oneRow }) => {
    const [searchedEmps, setSearchedEmps] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // 엔터 키의 기본 동작 방지
            performSearch();
        }
    };
    
    const performSearch = () => {
        const gubun = document.getElementById('gubun').value;
        const trimmedKeyword = searchKeyword.trim().toLowerCase(); // 검색어를 소문자로 변환 및 양 끝 공백 제거
        const filteredList = empList.filter((emp) => {
            const value = emp[gubun] ? emp[gubun].toLowerCase() : ''; // 값이 없을 경우를 대비하여 추가
            return value && value.includes(trimmedKeyword);
        });
        setSearchedEmps(filteredList);
        console.log(filteredList);
    };
    
    // 전체조회 & 초기화 설정
    const handleShowAll = () => {
        setSearchedEmps([]); // 검색 결과 초기화
        setSearchKeyword(''); // 검색어 초기화
    };

    const newEmpInsert = () => {
        console.log("newEmpInsert")
    }

    return (
        <>
        <div className={styles.container} style={{ padding: '20px', borderLeft: '1px solid' }}>
            <div className={styles.pageHeader}>
            <h5>
                직원목록
            </h5>
            <hr />
                </div>

                <div className={styles.row}>
                <div className="col-3">
                    <select id="gubun" className="form-select" aria-label="분류">
                        <option defaultValue>분류</option>
                        <option value="E_NAME">사원명</option>
                        <option value="E_CURRENT">현황</option>
                        <option value="E_RANK">직급</option>
                    </select>
                </div>
                <div className="col-6">
                    <input
                    type="text"
                    id="keyword"
                    className="form-control"
                    placeholder="검색어를 입력하세요"
                    aria-label="검색어를 입력하세요"
                    aria-describedby="btn_search"
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={handleSearch}  // 엔터 키 이벤트 핸들링 추가
                    value={searchKeyword}
                    />
                </div>
                <div className="col-1">
                    <Button variant="dark" id="btn_search" onClick={performSearch}> {/* 엔터 키 외에 검색 버튼 클릭 시에도 조건 검색되도록 performSearch로 onClick */}
                        검색
                    </Button>
                </div>
                <div className="col-1">
                    <Button variant="warning" id="btn_newEmpInsert" onClick={newEmpInsert}>
                        신규등록
                    </Button>
                </div>
                </div>

                <div className={styles.empList}>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>사원번호</th>
                        <th>사원명</th>
                        <th>현황</th>
                        <th>직급</th>
                        <th>전화번호</th>
                    </tr>
                    </thead>
                    <tbody>
                        {(searchedEmps.length > 0 ? searchedEmps : empList).map((emp, key) => (
                            <EmpRow key={key} emp={emp} oneRow={oneRow} />
                        ))}
                    </tbody>
                </Table>

                <hr />
                <div className={styles.empListFooter}>
                    <span className="col">
                        <ExcelForm empList={empList}/>
                    </span>
                    <span className="col">
                        <Form>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label="퇴사자 포함 검색"
                            />
                        </Form>
                    </span>
                    <span className="row-3">
                        <Button variant="secondary" onClick={() => handleShowAll()}>
                            전체조회
                        </Button>
                    </span>
                </div>
            </div>
        </div>
        </>
    );
};

export default EmpListAll;
