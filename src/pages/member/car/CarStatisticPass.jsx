import { ConfigProvider, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../member.module.css';
import { getMemList } from '../../../redux/memberSlice';
import Title from 'antd/es/typography/Title';

const CarStatisticPass = ({calList}) => {
    const [numOfRecords, setNumOfRecords] = useState(0); // 추가: 출력된 정보의 개수를 저장하기 위한 상태
    const dispatch = useDispatch();
    const memberList = useSelector(state => state.memberSlice.value);
    const [selectedUser, setSelectedUser] = useState('전체');

    useEffect(() => {
        dispatch(getMemList());
    }, [dispatch]);

    const handleChange = (value) => {
        setSelectedUser(value);
    }

    let data = [];
    if (selectedUser === '전체') {
        data = calList.map(car => ({
            serv_date: car.SERV_START.split('T')[0].substr(0,11),
            serv_user: car.SERV_USER,       
            serv_title: car.SERV_TITLE, 
            serv_info: car.SERV_INFO, 
            serv_start: car.SERV_START.split('T')[1].substr(0, 5),
            serv_end: car.SERV_END.split('T')[1].substr(0, 5),
        }));
    } else {
        data = calList.filter(car => selectedUser === car.SERV_USERNO).map(car => ({
            serv_date: car.SERV_START.split('T')[0].substr(0,11),
            serv_user: car.SERV_USER,       
            serv_title: car.SERV_TITLE,
            serv_info: car.SERV_INFO,  
            serv_start: car.SERV_START.split('T')[1].substr(0, 5),
            serv_end: car.SERV_END.split('T')[1].substr(0, 5),
        }));
    }
    useEffect(() => {
        setNumOfRecords(data.length); // calList의 길이를 numOfRecords로 설정
    }, [data]);
    return (
        <>
            <h6>
                &nbsp;이용자: &nbsp;  
                <Select
                    defaultValue="전체"
                    style={{
                        width: 150,
                    }}
                    onChange={handleChange}
                    options={[{ value: "전체", label: "전체" }, ...memberList.map(member => ({ value: member.CLIENT_ID, label: member.CLIENT_NAME }))]}
                />
            </h6>
            <ConfigProvider
                        theme={{
                            components: {
                                Table: {
                                    borderColor: '#d9d9d9', //hex색표 
                                        },
                                    },
                                }}
            >
                <Table className={styles.memberTable} dataSource={data} bordered  pagination={{ position: ['bottomCenter'], size: ['small'], defaultPageSize: [10] }}>
                    <Table.Column title="이름" dataIndex="serv_user" key="SERV_USER" align='center'/>
                    <Table.Column title="이용날짜" dataIndex="serv_date" key="SERV_USER" align='center'/>
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

export default CarStatisticPass;
