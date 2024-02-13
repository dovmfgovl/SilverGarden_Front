import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import EmpRow from "./EmpRow";
import { Button, Form } from "react-bootstrap";
import styles from "./empInfo.module.css";
import ExcelForm from './ExcelForm';
import { useDispatch, useSelector } from 'react-redux';
import { getEmpList, setDetail, setSearchKeywords, setShowAll, toggleIncludeResigned } from '../../redux/empInfosSlice';
import EmpCreateModal from './EmpCreateModal';

const EmpListAll = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const includeResigned = useSelector(state => state.empInfos.includeResigned);
    const empList = useSelector(state => {
        const { value } = state.empInfos;
        if (!searchKeyword) {
            return includeResigned ? value : value.filter(emp => emp.E_STATUS !== '퇴직');
        } else {
            const filteredList = value.filter(emp =>
                emp.E_NAME.includes(searchKeyword) || emp.E_STATUS.includes(searchKeyword) || emp.E_RANK.includes(searchKeyword)
            );
            return includeResigned ? filteredList : filteredList.filter(emp => emp.E_STATUS !== '퇴직');
        }
    });
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

    const handleUpdate = (selectedEmployee) => {
        dispatch(setDetail(selectedEmployee)); // 선택된 직원을 store에 저장
    };

    return (
        <>
            <div className={styles.container} style={{ padding: '20px', borderLeft: '1px solid' }}>
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
                        <Button variant="secondary" onClick={() => handleShowAll()}>
                            전체조회
                        </Button>
                    </div>
                </div>

                <div className={styles.empList}>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>사원번호</th>
                                <th>현황</th>
                                <th>사원명</th>
                                <th>부서</th>
                                <th>직급</th>
                                <th>전화번호</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empList.map(emp => (
                                <EmpRow key={emp.E_NO} emp={emp} />
                            ))}
                        </tbody>
                    </Table>

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