import React, { useEffect, useState, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import EmpRow from "./EmpRow";
import { Button, Form } from "react-bootstrap";
import styles from "./empInfo.module.css";
import EmpExcelDownload from './EmpExcelDownload';
import ExcelForm from './ExcelForm';
import { useDispatch, useSelector } from 'react-redux';
import { getEmpList, setShowAll, toggleIncludeResigned } from '../../redux/empInfosSlice';
import EmpCreateModal from './EmpCreateModal';
import EmpListPagination from './EmpListPagination';

const EmpListAll = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const includeResigned = useSelector(state => state.empInfos.includeResigned);
    const [empCount, setEmpCount] = useState(0);
    const empList = useSelector(state => {
        const { value } = state.empInfos;
        // 검색어가 없을 때는 모든 직원을 표시하고, 퇴사자가 아닌 경우 필터링
        if (!searchKeyword || searchKeyword.trim() === '') {
            return includeResigned ? value : value.filter(emp => emp.E_STATUS !== '퇴직');
        } else {
            // 검색어에 따라 필터링
            const filteredList = value.filter(emp =>
                (emp.E_NAME && emp.E_NAME.toLowerCase().includes(searchKeyword.toLowerCase())) || // 대소문자 구분을 하지 않음
                (emp.E_STATUS && emp.E_STATUS.toLowerCase().includes(searchKeyword.toLowerCase())) ||
                (emp.E_RANK && emp.E_RANK.toLowerCase().includes(searchKeyword.toLowerCase())) ||
                (emp.DEPT_NAME && emp.DEPT_NAME.toLowerCase().includes(searchKeyword.toLowerCase()))
            );
            return includeResigned ? filteredList : filteredList.filter(emp => emp.E_STATUS !== '퇴직');
        }
    });

    // 전체 사원 수 업데이트
    useEffect(() => {
        setEmpCount(empList.length);
    }, [empList.length]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmpList());
    }, [dispatch]);

    const handleShowAll = () => {
        setSearchKeyword(''); // 검색어 초기화
        dispatch(getEmpList());
    };

    const handleFilter = (emp) => {
        // 검색어가 없거나 퇴사자를 포함할 경우 모든 직원을 반환
        if (!searchKeyword || includeResigned) {
            return true;
        }

        // 검색어가 포함된 경우 해당 직원을 반환
        return (
            emp.E_NAME.toLowerCase().includes(searchKeyword.toLowerCase()) || // 대소문자 구분하지 않음
            emp.E_STATUS.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            emp.E_RANK.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            emp.DEPT_NAME.toLowerCase().includes(searchKeyword.toLowerCase())
        );
    };

    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 15;

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const selectedList = empList.filter(handleFilter).slice(indexOfFirstPost, indexOfLastPost);

    return (
        <>
            <div className={styles.container} style={{ padding: '0px 20px 0px 0px', borderLeft: 'none' }}>
                <div className={styles.pageHeader}>
                    <h5>직원목록</h5>
                    <hr />
                </div>

                <div className="row justify-content-between">
                    <div className="col-3">
                        <select style={{ marginLeft: '20px', fontSize: "0.8rem" }} id="gubun" className="form-select" aria-label="분류">
                            <option defaultValue>분류</option>
                            <option value="emp.E_NAME">사원명</option>
                            <option value="emp.E_STATUS">현황</option>
                            <option value="emp.DEPT_NAME">부서</option>
                            <option value="emp.E_RANK">직급</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <input style={{ marginLeft: '5px', fontSize: "0.8rem" }}
                            type="text"
                            id="keyword"
                            className="form-control"
                            placeholder="검색어를 입력하세요"
                            aria-label="검색어를 입력하세요"
                            aria-describedby="btn_search"
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            value={searchKeyword}
                        />
                    </div>
                    <div className="col-3">
                        <Button style={{ marginLeft: '20px', fontSize: "0.8rem" }} variant="dark" onClick={() => handleShowAll()}>
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
                            {selectedList.map((emp, index) => (
                                <EmpRow key={emp.E_NO} emp={emp} currentPage={currentPage} postPerPage={postPerPage} index={index} />
                            ))}
                            </tbody>
                        </Table>
                        <div className={styles.empListPagination}>
                            <EmpListPagination currentPage={currentPage} totalPosts={empList.filter(handleFilter).length} postPerPage={postPerPage} handleSetCurrentPage={setCurrentPage}></EmpListPagination>
                        </div>
                    </div>

                    <hr />
                    <span className="row justify-content-between">
                        <span className="col-3">
                            <EmpExcelDownload empList={selectedList}/>
                        </span>
                        <span className="col-3">
                            • 전체 사원 수: {empCount}
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
                        <span className="col-3">
                            <EmpCreateModal empCreated={handleShowAll}/>
                        </span>
                    </span>
                </div>
            </div>
        </>
    );
};

export default EmpListAll;