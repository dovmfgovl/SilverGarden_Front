import React, { useEffect, useState } from 'react'
import CrawlingComponent from './CrawlingComponent'
import { crawlingListDB } from '../../services/api/crawlingApi';
import styles from './crawling.module.css';
import CrawlingSearchBar from './CrawlingSearchBar';

const CrawlingHome = () => {

    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        getDataList();
    }, []);
    console.log(dataList); //undefined

    const getDataList = async () => {
        console.log("getDataList");
        const response = await crawlingListDB();
        console.log(response);
        setDataList(response);
    };
    return (
        <div className={styles.crawlingListLayout}>
            <div className={styles.crawlingHeader}><CrawlingSearchBar getDataList={getDataList}></CrawlingSearchBar></div>
            <CrawlingComponent dataList={dataList} getDataList={getDataList}/>
        </div>
    )
}

export default CrawlingHome;