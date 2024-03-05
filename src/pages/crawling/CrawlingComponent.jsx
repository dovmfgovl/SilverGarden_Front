import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import styles from './crawling.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
// import NoticePagination from '../notice/NoticePagination';

const CrawlingComponent = ({dataList, getDataList, handlePage}) => {
    console.log(dataList);
    
    useEffect(() => {
        document.getElementById('keyword').focus();
    }, []);

    const [searchedDatas, setSearchedDatas] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState(''); // 추가: 검색어 상태
    
    const handleSearch = () => {
        const gubun = document.getElementById('gubun').value;
        const filteredList = dataList.filter((data) => {
            const value = data[gubun].toLowerCase(); // 대소문자 구분 없이 검색
            return value.includes(searchKeyword.trim().toLowerCase());
        });
        setSearchedDatas(filteredList);
        console.log(filteredList); //[]
        setSearchKeyword(''); // 추가: 검색어 초기화
    };
    const handleKeyDown = (e) =>{
        if(e.keyCode === 13){
            handleSearch();
            setSearchKeyword(''); // 추가: 검색어 초기화
        }
    }

        // 전체조회 & 초기화 설정
        const handleShowAll = () => {
            console.log('handleShowAll');
            searchedDatas([]); // 검색 결과 초기화
            setSearchKeyword(''); // 추가: 검색어 초기화
            getDataList();//초기화
            document.getElementById('gubun').value = '구분';
        }

    return (
        <>
        <div>
            <div className={styles.box2}>
                        <div className="d-flex" style={{margin:'20px'}}>
                            <select
                                id="gubun"
                                className="form-select" aria-label="Default select example"
                                style={{width: '30%', marginRight: '0.5rem', fontSize:'14px', textAlign:'center'}}
                            >
                                <option value="CRAWLED_TITLE">제목</option>
                                <option value="CRAWLED_SITENAME">출처</option>
                            </select>
                            <input
                                id = "keyword"
                                type="text"
                                className="form-control me-2"
                                placeholder="검색내용을 입력하세요"
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                value={searchKeyword}
                                style={{textAlign:'center'}}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                className="btn btn-outline-info"
                                style={{width: '120px'}}
                                onClick={handleSearch}
                            >
                                검색
                            </button>
                            <button
                                className="btn btn-outline-warning"
                                style={{width: '120px', marginLeft:'10px'}}
                                onClick={()=>{
                                    handleSearch();
                                    }
                                }
                            >
                                초기화
                            </button>
                        </div>
                    </div>
        </div>
        <Table hover className={styles.crawlingTable}>
            <thead>
                <tr>
                    <th style={{width: "5%"}}>#</th>
                    <th style={{width: "40%"}}>제목(링크)</th>
                    <th style={{width: "10%"}}>출처</th>
                    <th style={{width: "10%"}}>등록일</th>
                    <th style={{width: "5%"}}>자세히</th>
                </tr>
            </thead>
            <tbody>
                {(searchedDatas.length > 0 ? searchedDatas : dataList).map((crawling, index) => (
                    <tr 
                        key={crawling.CRAWLED_NO} 
                        onClick={() => handlePage("공지상세", crawling.CRAWLED_NO)}
                    >
                        <td>{index + 1}</td>
                        <td>
                            <a href={crawling.CRAWLED_URL} style={{ textDecoration: 'none', color: 'inherit' }}  target="_blank">
                                {crawling.CRAWLED_TITLE}
                            </a>
                        </td> 
                        <td>{crawling.CRAWLED_SITENAME}</td>
                        <td>{crawling.REG_DATE}</td>
                        <td>
                            <a href={crawling.CRAWLED_URL}  target="_blank">
                                <FontAwesomeIcon icon={faLink} />
                            </a>
                        </td> 
                    </tr>
                ))}
            </tbody>
        </Table>
        {/* <NoticePagination styled={{}} currentPage={currentPage} totalPosts={totalPosts} postPerPage={postPerPage} handleSetCurentPage={handleSetCurentPage}></NoticePagination> */}
        </>
    )
}
export default CrawlingComponent;
