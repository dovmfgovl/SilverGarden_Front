import React from 'react';
import { Table } from 'react-bootstrap';
import styles from './crawling.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const CrawlingComponent = ({dataList, getDataList}) => {
    console.log(dataList);

    return (
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
                    <tr key={''}>
                        <td>{index+1}</td>
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
    )
}
export default CrawlingComponent;
