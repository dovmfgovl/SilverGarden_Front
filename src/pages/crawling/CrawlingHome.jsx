import React, { useEffect, useState } from 'react'
import CrawlingComponent from './CrawlingComponent'
import { UserAPage } from '../../services/auth/UserApi';
import { crawlingListDB } from '../../services/api/crawlingApi';
import styles from './crawling.module.css';

const CrawlingHome = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        UserAPage()
        .then((response) => {
        console.log(response); //undefined
        })
        .catch((error) => {
        console.log(error);
        });
    }
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

    return (
        <div className={styles.crawlingListLayout}>
            <CrawlingComponent dataList={dataList} getDataList={getDataList} handlePage={handlePage}/>
        </div>
    )
}

export default CrawlingHome;