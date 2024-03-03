import { ConfigProvider, Table } from 'antd'
import Title from 'antd/es/typography/Title';
import styles from '../member.module.css';
import React, { useEffect, useState } from 'react'

const CarStatisticAll = ({calList}) => {
    const [numOfRecords, setNumOfRecords] = useState(0); // 추가: 출력된 정보의 개수를 저장하기 위한 상태
    const data = calList.map(car => ({
        // 각 사원의 정보를 새로운 객체에 매핑합니다.
        serv_date: car.SERV_START.split('T')[0].substr(0,11),
        serv_user: car.SERV_USER,       
        serv_title: car.SERV_TITLE, 
        serv_info: car.SERV_INFO, 
        serv_start: car.SERV_START.split('T')[1].substr(0, 5), //'T'를 기준으로 나누어 그 뒤 5문자만 부르기    
        serv_end: car.SERV_END.split('T')[1].substr(0, 5),  //'T'를 기준으로 나누어 그 뒤 5문자만 부르기
    }));
    useEffect(() => {
        setNumOfRecords(calList.length); // calList의 길이를 numOfRecords로 설정
    }, [calList]);
    
  return (
    <>
    <ConfigProvider
        theme={{
            components: {
                Table: {
                    borderColor: '#d9d9d9', //hex색표 
                        },
                    },
                }}
    >
    <Table className={styles.memberTable} dataSource={data} bordered pagination={{position:['bottomCenter'],size:['small'],defaultPageSize:[10]}} >
        <Table.Column title="이용날짜" dataIndex="serv_date" key="SERV_USER" align='center'/>
        <Table.Column title="이름" dataIndex="serv_user" key="SERV_USER" align='center'/>
        <Table.Column title="이용목적" dataIndex="serv_title" key="SERV_TITLE" align='center'/>
        <Table.Column title="이용내용" dataIndex="serv_info" key="SERV_INFO" align='center'/>
        <Table.Column title="시작시간" dataIndex="serv_start" key="SERV_END" align='center'/>
        <Table.Column title="종료시간" dataIndex="serv_end" key="SERV_END" align='center'/>
    </Table>
    <Title level={5}  >전체: {numOfRecords}건</Title> 
     </ConfigProvider>
    </>
  )
}

export default CarStatisticAll