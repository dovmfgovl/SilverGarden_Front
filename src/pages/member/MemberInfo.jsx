import React, { useEffect, useState } from 'react';
import styles from './member.module.css';
import { Button, Table, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import MemberRow from './MemberRow';
import MemberDetail from './MemberDetail';
import MemberInsert from './MemberInsert'
import { useDispatch, useSelector } from 'react-redux';
import { getMemList } from '../../redux/memberSlice';

const MemberInfo = () => {
    const dispatch = useDispatch();
    const [searchKeyword, setSearchKeyword] = useState('');
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



    const handleShowAll = () => {
      setSearchKeyword('');
    };

    return (
        <>
            <div className={styles.InnerMemberLayout2}>
                <div className={styles.leftMemberLayout}>
                    <h2>▶︎&nbsp;이용자목록</h2>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>이용자 검색</InputGroup.Text>
                        <Form.Control
                            placeholder='이용자 이름을 입력해주세요'
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />  
                            <Button variant="outline-primary" onClick={handleShowAll}>전체조회</Button>
                    </InputGroup>
                    <div className="col border border-white border-2" style={{ background: 'hsl(193, 6%, 88%)' }}>
                        <Table striped bordered hover>
                            <thead style={{ background: 'hsl(193, 52%, 88%)' }}>
                                <tr>
                                    <th className='text-center'>이름</th>
                                    <th className='text-center'>생년월일</th>
                                    <th className='text-center'>담당자</th>
                                </tr>
                            </thead>
                            <tbody>
                                {memberList.map(member => (
                                    <MemberRow key={member.CLIENT_ID} member={member} />
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <MemberInsert />
                </div>
                <div className={styles.rightMemberLayout1}>
                    <MemberDetail />
                </div>
            </div>
        </>
    );
};

export default MemberInfo;
