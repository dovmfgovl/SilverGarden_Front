import React, { useEffect, useState } from 'react'
import styles from './empInfo.module.css'
import EmpListAll from './EmpListAll'
import EmpDetail from './EmpDetail'
import { empListDB } from '../../services/api/empInfoApi'
import EmpEdu from './EmpEdu'

const EmpInfos = () => {
  const [empList, setEmpList] = useState([]);
  const [empDetail, setEmpDetail] = useState([]);

  // 전체 직원 목록 조회
  const getEmpList = async () => {
    try {
      const response = await empListDB();
      const data = response.data;
      console.log(data);
      setEmpList(data);
    } catch (error) {
      console.error(error);
    }
  }

  const oneRow = async (emp) => {
    if (emp) {
      const detail = empList.find(item => item.E_CODE === emp.E_CODE);
      setEmpDetail(detail)
    } else {
      setEmpDetail(null)
    }
  }

  useEffect(() => {
    getEmpList()
  }, [])

  useEffect(() => {}, [empDetail])

  return (
    <>
    <div className={styles.innerEmpInfoWrap}>
      <div className={styles.empListContentWrap}>
        <EmpListAll 
          empList={empList}
          getEmpList={getEmpList}
          oneRow={oneRow}
          setEmpDetail={setEmpDetail}
        />
      </div>
      <div className={styles.empDetailWrap}>
        <EmpDetail 
          empDetail={empDetail}
          oneRow={oneRow}
          getEmpList={getEmpList}
        />
      </div>
      <div className={styles.empBaseInfoWrap}>
        <EmpEdu 
          empDetail={empDetail}
          oneRow={oneRow}
          getEmpList={getEmpList}
        />
      </div> 
    </div>
    
    </>
  )
}

export default EmpInfos