import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import styles from './crawling.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import NoticePagination from '../notice/NoticePagination';

const CrawlingComponent = ({dataList, getDataList, handlePage}) => {
    console.log(dataList);
    const[currentPage, setCurrentPage] = useState(1);
    const postPerPage = 10;
    const totalPosts = dataList.length
    // 시작 인덱스와 끝 인덱스 계산
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const selectedlist = [...dataList.slice(indexOfFirstPost, indexOfLastPost)]

    const handleSetCurentPage = (pageNo) => {
        setCurrentPage(pageNo)
    }
    return (
        <>
        <div>
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
                {dataList.map((crawling, index)=>(
                    <tr key={crawling.CRAWLED_NO} onClick={()=>handlePage("공지상세", crawling.CRAWLED_NO)}>
                        <td>{index+1}</td>
                        <td>
                            <a href={crawling.CRAWLED_URL} style={{ textDecoration: 'none', color: 'inherit' }}  target="_blank">
                                {(() => {
                                    if (crawling.CRAWLED_TITLE === '한국노인종합복지관협회') {
                                        return <img src={require('../../assets/images/로고한국노인종합복지관협회.png').default} alt="한국노인종합복지관협회" />;
                                    } else if (crawling.CRAWLED_TITLE === '서울시재가노인복지협회') {
                                        return <img src={require('../../assets/images/로고재가노인복지협회.png').default} alt="재가노인복지협회" />;
                                    } else {
                                        return crawling.CRAWLED_TITLE;
                                    }
                                })()}                          
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
        <NoticePagination styled={{}} currentPage={currentPage} totalPosts={totalPosts} postPerPage={postPerPage} handleSetCurentPage={handleSetCurentPage}></NoticePagination>
        </>
    )
}
export default CrawlingComponent;
