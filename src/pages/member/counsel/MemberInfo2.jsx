import React, { useEffect, useState } from 'react';
import styles from '../member.module.css';
import { Button, Form, InputGroup } from 'react-bootstrap';
import MemberDetail2 from './MemberDetail2';
import { useDispatch, useSelector } from 'react-redux';
import Title from 'antd/es/typography/Title';

import { ConfigProvider, Table } from 'antd';
import { getMemList, setDetail } from '../../../redux/memberSlice';

const MemberInfo2 = () => {
    const dispatch = useDispatch();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [numOfRecords, setNumOfRecords] = useState(0); // 추가: 출력된 정보의 개수를 저장하기 위한 상태
    const memberList = useSelector(state => {
        const { value } = state.memberSlice;
        if (!searchKeyword) {
            return value;
        } else {
            return value.filter(member =>
                (member.CLIENT_NAME && member.CLIENT_NAME.includes(searchKeyword)) ||
                (member.CLIENT_MANAGER && member.CLIENT_MANAGER.includes(searchKeyword))
            );
        }
    });

    useEffect(() => {
        dispatch(getMemList());
    }, [dispatch]);
    useEffect(() => {
      setNumOfRecords(memberList.length); // 검색 결과가 변경될 때마다 numOfRecords를 갱신
  }, [memberList]);

    const handleRowClick = (record) => {
        dispatch(setDetail(record));
    }; // row에 눌려진 이용자를 상세보기의 대상으로 한다.
     

    const handleShowAll = () => {
      setSearchKeyword('');
    };
    
    return (
        <>
            <div className={styles.InnerMemberLayout2}>
                <div className={styles.leftMemberLayout}>
                    <h5>이용자목록</h5>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>검색</InputGroup.Text>
                        <Form.Control
                            placeholder='이용자나 담당자명을 입력해주세요'
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />  
                            <Button variant="outline-primary" onClick={handleShowAll}>전체조회</Button>
                    </InputGroup>
                     <ConfigProvider
                        theme={{
                            components: {
                                Table: {
                                         borderColor: '#d9d9d9', //hex색표 
                                        },
                                    },
                                }}
                            >

                    <div className="col border border-white border-2" style={{ background: 'hsl(193, 6%, 88%)' }}>
                    <Table dataSource={memberList} bordered pagination={{position:['bottomCenter'], defaultPageSize:[10]}}
                 onRow={(record,index)=>{
                    return {
                        onClick:() => handleRowClick(record),
                        style: { cursor: 'pointer' } // 각 행에 pointer 스타일 적용
                    };
                }}  >
                            <Table.Column title="이름" dataIndex="CLIENT_NAME" key="CLIENT_NAME" align='center'/>
                            <Table.Column title="생년월일" dataIndex="CLIENT_BIRTH" key="CLIENT_BIRTH" align='center'/>
                            <Table.Column title="담당자" dataIndex="CLIENT_MANAGER" key="CLIENT_MANAGER" align='center'/>
                        </Table> 
                    </div>
                    <Title level={5}  >전체: {numOfRecords}건</Title> 
                </ConfigProvider>
                </div>
            <div className={styles.rightMemberLayout1}>
            <MemberDetail2 />
            </div>
        </div>
        </>
    );
};

export default MemberInfo2;


