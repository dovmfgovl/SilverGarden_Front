import React, { useEffect} from 'react';
import styles from './member.module.css';
import { Button, Table} from 'react-bootstrap';
import MemberRow from './MemberRow';
import MemberDetail from './MemberDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getMemList } from '../../redux/memberSlice';
import MemberInsert from './MemberInsert';
import MemberSearchbar from './MemberSearchbar';

const MemberInfo = () => {
  const dispatch = useDispatch();
  const memberList = useSelector(state => state.memberSlice.value)
  const memberDetail = useSelector(state => state.memberSlice.selectedMember)
  const searchedMemberList = useSelector(state => state.memberSlice.searchedMemberList);

  useEffect(()=>{
    dispatch(getMemList())
  },[dispatch])

 

  return (
    <>
      <div className={styles.InnerMemberLayout}>
        <div className={styles.leftMemberLayout}>
          <h2>▶︎&nbsp;이용자목록</h2>
        <MemberSearchbar getMemList={getMemList} />
          {/* 이용자목록  */}
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
                    {memberList.map(member=>(
                      <MemberRow key={member.CLIENT_ID} member={member}/>
                    ))}
                  </tbody>
            </Table>
          </div>
          <Button variant="warning" onClick={() => dispatch(getMemList())}>전체조회</Button>
          <MemberInsert />
        </div>
        <div className={styles.rightMemberLayout1}>
          <MemberDetail  />
        </div>
      </div>
    </>
  );
};

export default MemberInfo;
