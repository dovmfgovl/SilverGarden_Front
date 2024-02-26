import React, { useEffect } from 'react'
import styles from './empInfo.module.css'
import EmpListAll from './EmpListAll'
import EmpDetail from './EmpDetail'
import EmpEdu from './EmpEdu'
import EmpExp from './EmpExp'
import EmpCerti from './EmpCerti'
import { useDispatch, useSelector } from 'react-redux'
import { getEmpList, setDetail } from '../../redux/empInfosSlice' // 액션 및 셀럭터 import
import EmpExpInsert from './EmpExpInsert'
import { Tab, Tabs } from 'react-bootstrap'

const EmpInfos = () => {
  const dispatch = useDispatch();
  const empList = useSelector(state => state.empInfos.value); // 변경된 상태명을 가져옴
  const empDetail = useSelector(state => state.empInfos.selectedEmployee); // 변경된 상태명을 가져옴

  useEffect(() => {
    dispatch(getEmpList());
  }, [dispatch]);

  const handleUpdate = (updatedDetail) => {
    // 수정 버튼 클릭 시 호출되는 함수
    // 수정된 상세정보를 스토어에 업데이트
    // updatedDetail을 사용하여 서버로 업데이트 요청을 보내고, 성공 시 dispatch(setDetail(updateDetail))를 호출
    // -> 스토어 상태 업데이트되고 자동으로 UI도 업데이트 된다.
    dispatch(setDetail(updatedDetail)); // 선택된 직원을 store에 저장
  }
  
  return (
    <>
    <div className={styles.innerEmpInfoWrap}>
      <div className={styles.empListContentWrap}>
        <EmpListAll />
      </div>
      <div className={styles.empDetailWrap}>
        <EmpDetail 
          handleUpdate={handleUpdate}
        />
      </div>
      <div className={styles.empBaseInfoWrap}>
        <Tabs defaultActiveKey="edu" id="emp-tabs">
          <Tab eventKey="edu" title="학력">
            <EmpEdu empDetail={empDetail} />
          </Tab>
          <Tab eventKey="exp" title="경력">
            <EmpExp empDetail={empDetail} />
          </Tab>
        </Tabs>
      </div> 
    </div>    
    </>
  )
}

export default EmpInfos

//<EmpCerti
//          empDetail={empDetail}
//        />