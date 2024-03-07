import React, { useEffect, useState } from 'react'
import CrawlingComponent from './CrawlingComponent'
import { crawlingListDB } from '../../services/api/crawlingApi';
import styles from './crawling.module.css';
import CrawlingPagination from './CrawlingPagination';

const CrawlingHome = () => {

    const [dataList, setDataList] = useState([]);
    
    const getDataList = async () => {
        console.log("getDataList");
        const response = await crawlingListDB();
        console.log(response);
        setDataList(response);
    };

    useEffect(() => {
        getDataList();
    }, []);

    const handlePage = (pageType, crawledNo) => {
        console.log(`페이지 유형: ${pageType}, 크롤링 번호: ${crawledNo}`);
        // 크롤링 번호 여기선 뜨네
    };
    const [currentPage, setCurrentPage] = useState(1);

    const postPerPage = 14;
    const totalPosts = dataList.length
    // 시작 인덱스와 끝 인덱스 계산
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const selectedlist = [...dataList.slice(indexOfFirstPost, indexOfLastPost)]

    const handleSetCurentPage = (pageNo) => {
        setCurrentPage(pageNo)
    }

    return (
        <div>
            <CrawlingComponent dataList={selectedlist} getDataList={getDataList} handlePage={handlePage} currentPage={currentPage} postPerPage={postPerPage} />
            <div className={styles.crawlingPagination} >
                <CrawlingPagination currentPage={currentPage} totalPosts={totalPosts} postPerPage={postPerPage} handleSetCurentPage={handleSetCurentPage}></CrawlingPagination>
            </div>
        </div>
    )
}

export default CrawlingHome;