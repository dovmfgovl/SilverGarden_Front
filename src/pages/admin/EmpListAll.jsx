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
    const [searchKeyword, setSearchKeyword] = useState('');
    const includeResigned = useSelector(state => state.empInfos.includeResigned);
    const empList = useSelector(state => {
        const { value } = state.empInfos;
        // 검색어가 없을 때는 모든 직원을 표시하고, 퇴사자가 아닌 경우 필터링
        if (!searchKeyword || searchKeyword.trim() === '') {
            return includeResigned ? value : value.filter(emp => emp.E_STATUS !== '퇴직');
        } else {
            // 검색어에 따라 필터링
            const filteredList = value.filter(emp =>
                (emp.E_NAME && emp.E_NAME.includes(searchKeyword)) ||
                (emp.E_STATUS && emp.E_STATUS.includes(searchKeyword)) ||
                (emp.E_RANK && emp.E_RANK.includes(searchKeyword)) ||
                (emp.DEPT_NAME && emp.DEPT_NAME.includes(searchKeyword))
            );
            return includeResigned ? filteredList : filteredList.filter(emp => emp.E_STATUS !== '퇴직');
        }
    });
    const {empListAll, setEmpListAll} = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmpList());
    }, [dispatch]);

    const handleSearch = () => {
        dispatch(setSearchKeywords(searchKeyword));
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleShowAll = () => {
        dispatch(setShowAll());
    };

    const handleFilter = (emp) => {
        // 검색어가 없거나 퇴사자를 포함할 경우 모든 직원을 반환
        if (!searchKeyword || includeResigned) {
            return true;
        }

        // 검색어가 포함된 경우 해당 직원을 반환
        return (
            emp.E_NAME.includes(searchKeyword) ||
            emp.E_STATUS.includes(searchKeyword) ||
            emp.E_RANK.includes(searchKeyword) ||
            emp.DEPT_NAME.includes(searchKeyword)
        );
    };

    // 직원 전체 목록 업데이트
    const updatedEmpList = () => {
        dispatch(getEmpList())
        .then((response) => {
            setEmpListAll(response); // 직원 전체 목록 업데이트
        })
        .catch((error) => {
            console.error("직원 전체 목록 업데이트 중 에러: ", error);
        });
    }

    const filteredList = empList.filter(handleFilter);

    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 15;

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const selectedlist = filteredList.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <>
            <div className={styles.container} style={{ padding: '0px 20px 0px 0px', borderLeft: 'none' }}>
                <div className={styles.pageHeader}>
                    <h5>직원목록</h5>
                    <hr />
                </div>

                <div className={styles.row}>
                    <div className="col-2">
                        <select style={{ width: "80%", fontSize: "0.8rem" }} id="gubun" className="form-select" aria-label="분류">
                            <option defaultValue>분류</option>
                            <option value="E_NAME">사원명</option>
                            <option value="E_STATUS">현황</option>
                            <option value="DEPT_NAME">부서</option>
                            <option value="E_RANK">직급</option>
                        </select>
                    </div>
                    <div className="col-5">
                        <input style={{ width: "80%", fontSize: "0.8rem" }}
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
                    <div className="col-2">
                        <Button style={{ width: "60%", fontSize: "0.8rem" }} variant="dark" id="btn_search" onClick={handleSearch}>
                            검색
                        </Button>
                    </div>
                    <div className="col-3">
                        <Button style={{ width: "55%", fontSize: "0.8rem" }} variant="outline-secondary" onClick={() => handleShowAll()}>
                            전체조회
                        </Button>
                    </div>
                </div>

                <div className={styles.empList}>
                    <div className={styles.empList_table_container}>
                        <Table hover className={styles.empListTable}>
                            <thead>
                                <tr>
                                    <th style={{width: "5%"}}>#</th>
                                    <th style={{width: "12%"}}>사원번호</th>
                                    <th style={{width: "9%"}}>현황</th>
                                    <th style={{width: "13%"}}>사원명</th>
                                    <th style={{width: "15%"}}>부서</th>
                                    <th style={{width: "12%"}}>직급</th>
                                    <th style={{width: "18%"}}>전화번호</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedlist.map((emp, index) => (
                                    <EmpRow key={emp.E_NO} emp={emp} currentPage={currentPage} postPerPage={postPerPage} index={index} />
                                ))}
                            </tbody>
                        </Table>
                        <div className={styles.empListPagination}>
                            <EmpListPagination currentPage={currentPage} totalPosts={filteredList.length} postPerPage={postPerPage} handleSetCurrentPage={setCurrentPage}></EmpListPagination>
                        </div>
                    </div>

                    <hr />
                    <span className={`${styles.empListFooter} row`}>
                        <span className="col-2">
                            <ExcelForm empList={filteredList}/>
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
                            <EmpCreateModal empCreated={updatedEmpList}/>
                        </span>
                    </span>
                </div>
            </div>
        </>
    );
};

export default EmpListAll;