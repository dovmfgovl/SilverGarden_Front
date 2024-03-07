import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import styles from './crawling.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import CrawlingModal from '../crawling/CrawlingModal';


const CrawlingComponent = ({dataList, currentPage, postPerPage}) => {
    console.log(dataList);
    useEffect(() => {
        document.getElementById('keyword').focus();
    }, []);

    const [searchedDatas, setSearchedDatas] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    const [selectedCrawling, setSelectedCrawling] = useState(null); // 선택된 크롤링 데이터 상태 추가

    const handleSearch = () => {
    const gubun = document.getElementById('gubun').value;
    const filteredList = dataList.filter((data) => {
        const value = data[gubun].toLowerCase();
        return value.includes(searchKeyword.trim().toLowerCase());
    });
    setSearchedDatas(filteredList);
    setSearchKeyword('');
    };

    const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
        handleSearch();
        setSearchKeyword('');
    }
    };

    // tr 클릭 시 선택된 크롤링 데이터 설정
    const handleTrClick = (crawling) => {
    setSelectedCrawling(crawling);
    };
    


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
        <div style={{textAlign:'right', margin:'10px', fontSize:'1rem'}}>
            {dataList.length > 0 && dataList[0].MOD_DATE ? `📌 수정일 : ${dataList[0].MOD_DATE}(매일 자정 업데이트)` : ''}
        </div>        
        <Table hover className={styles.crawlingTable}>
            <thead>
                <tr>
                    <th style={{width: "5%"}}>#</th>
                    <th style={{width: "30%"}}>게시글 제목(게시글 상세 내용)</th>
                    <th style={{width: "5%"}}>링크</th>
                    <th style={{width: "10%"}}>출처</th>
                    <th style={{width: "10%"}}>등록일</th>
                </tr>
            </thead>
            <tbody style={{verticalAlign:'middle'}}>
                {(searchedDatas.length > 0 ? searchedDatas : dataList).map((crawling, index) => (
                    <tr 
                        key={crawling.CRAWLED_NO} 
                        onClick={() => handleTrClick(crawling)} 
                        className={styles.myTooltip}
                        data-bs-toggle="tooltip" 
                        data-bs-placement="top" 
                        title={`내용: ${crawling.CRAWLED_CONTENT}`}
                    >
                        <td>
                            {(currentPage - 1) * postPerPage + index + 1}
                        </td>
                        <td>
                            {crawling.CRAWLED_TITLE}
                        </td>
                        <td>
                            <a href={crawling.CRAWLED_URL}  target="_blank">
                                <FontAwesomeIcon icon={faLink} />
                            </a>
                        </td> 
                        <td>{crawling.CRAWLED_SITENAME}</td>
                        <td>{crawling.REG_DATE}</td>

                    </tr>
                ))}
            </tbody>
        </Table>
        <CrawlingModal style={{ width: '100%' }} showModal={selectedCrawling !== null} handleModalClose={() => setSelectedCrawling(null)} dataList={[selectedCrawling]} />
        </>
    )
}
export default CrawlingComponent;
