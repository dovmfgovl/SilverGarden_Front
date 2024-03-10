import React, { useEffect, useState } from 'react';
import styles from '../program/programhome.module.css';
import ExcelForm from './ExceltDown';
import { useDispatch } from 'react-redux';
import { setDetail } from '../../redux/programSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ProgramPagination from './ProgramPagination';

const ProgramList = ({ programList, onRowClick, getProgramList  }) => {
    const[currentPage, setCurrentPage] = useState(1)
    const postPerPage = 10;
    const totalPosts = programList.length
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const selectedlist = [...programList.slice(indexOfFirstPost, indexOfLastPost)]
    const handleSetCurentPage = (pageNo) => {
        setCurrentPage(pageNo)
    }

    const dispatch = useDispatch();
    const [searchedPrograms, setSearchedPrograms] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState(''); // 추가: 검색어 상태
    //입력창에 기본커서 두기
    useEffect(() => {
        document.getElementById('keyword').focus();
    }, []);

    const today = new Date();
    const getGubun = (start, end) => {
        const startDate = new Date(start); 
        const endDate = new Date(end); 
    
        if (endDate < today) {
            return '종료';
        } else if (startDate > today) {
            return '예정';
        } else {
            return '진행';
        }
    };

    //검색 - 기존의 programList를 필터링을 걸어서 사용하기
    const handleSearch = () => {
        const gubun = document.getElementById('gubun').value;
        const filteredList = programList.filter((program) => {
            const value = program[gubun];
            return value && value.includes(searchKeyword.trim());
        });
        setSearchedPrograms(filteredList);
        console.log(filteredList);
    };
    // 전체조회 & 초기화 설정
    const handleShowAll = () => {
        console.log('handleShowAll');
        setSearchedPrograms([]); // 검색 결과 초기화
        setSearchKeyword(''); // 추가: 검색어 초기화
        dispatch(setDetail(null));
        getProgramList();//초기화
        document.getElementById('gubun').value = '구분';
    }

    return (
        <div>
            <div className="d-flex justify-content-end">
                <button
                    className="btn btn-outline-warning"
                    style={{minWidth: '15%', marginRight: '0.5rem'}}
                    onClick={()=>{
                    onRowClick(null); // 클릭 이벤트 발생
                    handleShowAll();
                    setSearchKeyword(''); // 검색어 초기화
                    }}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginRight:'2px'}}/>전체조회
                </button>
                <ExcelForm/>
            </div>
            <div className={styles.littleTitleBar}>
                <FontAwesomeIcon icon={faList} className={styles.icon} style={{ marginRight: '5px' }} />
                프로그램 목록
            </div>
            <div className={styles.scrollableContent}>
                <div className={styles.box2}>
                    <div className="d-flex">
                        <select
                            id="gubun"
                            className="form-select" aria-label="Default select example"
                            style={{width: '30%', marginRight: '0.5rem', fontSize:'14px'}}
                        >
                            <option defaultValue>구분</option>
                            <option value="PG_NAME">프로그램명</option>
                            <option value="PG_CATEGORY">분류</option>
                            <option value="PG_TEACHER">강사</option>
                            <option value="PG_DAYSOFWEEK">요일</option>
                        </select>
                        <input
                            id = "keyword"
                            type="text"
                            className="form-control me-2"
                            placeholder="검색내용을 입력하세요"
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            value={searchKeyword}
                        />
                        <button
                            className="btn btn-outline-info"
                            style={{minWidth: '10%'}}
                            onClick={handleSearch}
                        >
                            검색
                        </button>
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="fs-6">
                    <tr>
                        <th>연번</th>
                        <th>프로그램명</th>
                        <th>분류</th>
                        <th>강사</th>
                        <th>요일</th>
                        <th>시작</th>
                        <th>종료</th>
                        <th>구분</th>
                    </tr>
                    </thead>
                    <tbody className="fs-6">
                    {searchedPrograms.length > 0
                        ? searchedPrograms.map((program, index) => (
                            <tr key={program.PG_NO} onClick={() => onRowClick(program)}>
                                <td>{(currentPage - 1) * postPerPage + index + 1}</td>
                                <td>{program.PG_NAME}</td>
                                <td>{program.PG_CATEGORY}</td>
                                <td>{program.PG_TEACHER}</td>
                                <td>{program.PG_DAYSOFWEEK}</td>
                                <td>{new Date(program.PG_START).toLocaleString()}</td>
                                <td>{new Date(program.PG_END).toLocaleString()}</td>
                                <td>{getGubun(program.PG_START, program.PG_END)}</td>
                            </tr>
                        ))
                        //목록이 존재하고, 그 길이가 1 이상이야? 전체조회 리스트 표시하기
                        //index 넣어서 pg_no(개발자가 보고 사용하는 번호)가 아니라 연번 식으로 붙여서 표현
                        : programList && programList.length > 0
                            ? selectedlist.map((program, index) => (
                            <tr key={program.PG_NO} onClick={() => onRowClick(program)}>
                                {/* <td>{index + 1}</td> */}
                                <td>{(currentPage - 1) * postPerPage + index + 1}</td>
                                <td>{program.PG_NAME}</td>
                                <td>{program.PG_CATEGORY}</td>
                                <td>{program.PG_TEACHER}</td>
                                <td>{program.PG_DAYSOFWEEK}</td>
                                <td>{new Date(program.PG_START).toLocaleDateString()}</td>
                                <td>{new Date(program.PG_END).toLocaleDateString()}</td>
                                <td>{getGubun(program.PG_START, program.PG_END)}</td>
                            </tr>
                        ))
                        //프로그램이 없을 때의 처리 필요
                        : <tr><td colSpan="8" style={{ textAlign: 'center' }}>등록된 프로그램이 없습니다.</td></tr>
                    }
                    </tbody>
                </table>
                <div className={styles.programPagination}>
                    <ProgramPagination currentPage={currentPage} totalPosts={totalPosts} postPerPage={postPerPage} handleSetCurentPage={handleSetCurentPage}></ProgramPagination>
                </div>
            </div>
        </div>
    );
}

export default ProgramList;
