import React, { useEffect, useState } from 'react';
import { crawlingListDB } from '../../services/api/crawlingApi'

const CrawlingComponent = () => {
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        fetchDataList();
    }, []);
    console.log(dataList); //undefined

    const fetchDataList = async () => {
        console.log("fetchDataList");
        try {
        const response = await crawlingListDB();
        if (response.data === 'noData') {
            console.log('조회된 데이터가 없습니다.');
        } else {
            setDataList(response.data);
        }
        } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
        }
    };

    return (
        <div>
        <h1>Crawling Data List</h1>
        <ul>
            {dataList && dataList.length > 0 ? (
                dataList.map((item, index) => (
                    <li key={index}>{item.CRAWLED_TITLE}</li>
                ))
            ) : (
                <li>No data available</li>
            )}
        </ul>
    </div>
    );
}
export default CrawlingComponent;
