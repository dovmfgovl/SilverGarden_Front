import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import EmpExpRow from './EmpExpRow';
import styles from './empDetailInfo.module.css';
import { empExpListDB, empExpInsertDB, empExpDeleteDB } from '../../services/api/empInfoApi';
import { useSelector } from 'react-redux';

const EmpExp = ({ empDetail }) => {
  const [exList, setExList] = useState([]); // 경력 목록 저장할 상태 변수
  const [filteredExList, setFilteredExList] = useState([]); // 필터링된 경력 목록 저장할 상태 변수
  const [showSaveButtons, setShowSaveButtons] = useState([]); // 각 행마다 저장 버튼을 관리하는 배열

  const REG_ID = useSelector(state => state.userInfoSlice.e_no); // Redux store에서 e_no 가져오기
  const E_NO = empDetail ? empDetail.E_NO : '';

  const today = new Date();
  const [date, setDate] = useState([today.getFullYear(), `0${today.getMonth() + 1}`.slice(-2), `0${today.getDate()}`.slice(-2)].join("-") 
                                      + ` ${`0${today.getHours()}`.slice(-2)}:${`0${today.getMinutes()}`.slice(-2)}:${`0${today.getSeconds()}`.slice(-2)}`);

  useEffect(() => {
    getExpList();
  }, [empDetail]); // 직원 상세 정보가 변경될 때마다 해당 직원의 경력 목록 가져오기

  const getExpList = async () => {
    try {
      const response = await empExpListDB();
      const data = response.data;
      setExList(data);
      // 클릭한 직원의 경력 정보를 가져온 후에 filteredExList와 showSaveButtons 초기화
      setFilteredExList([]);
      setShowSaveButtons([]);
    } catch (error) {
      console.error("경력 조회 에러 :", error);      
    }
  };

  // 경력 목록과 직원 상세 정보가 변경될 때마다 필터링된 경력 목록 업데이트
  useEffect(() => {
    if (exList.length > 0 && empDetail && empDetail.E_NO) {
      const filteredExperiences = exList.filter(ex => ex.E_NO === empDetail.E_NO);
      setFilteredExList(filteredExperiences);
      // 저장 버튼을 각 행마다 보이도록 초기화
      setShowSaveButtons(new Array(filteredExperiences.length).fill(false));
    }
  }, [exList, empDetail]);

  const handleAddRow = () => {
    setFilteredExList([...filteredExList, { // 새로운 빈 행 추가
      EXP_NAME: '',
      EXP_DEPT: '',
      EXP_RANK: '',
      EXP_DUTY: '',
      EXP_PERIOD: '',
      REG_DATE: date,
      REG_ID: REG_ID,
      E_NO: E_NO
    }]);
    setShowSaveButtons([...showSaveButtons, true]); // 새로운 행에 대한 저장 버튼 추가
  };

  const handleSave = async (index) => {
    try {
      await empExpInsertDB(filteredExList[index]); // 해당 행에 대한 데이터 저장
      setShowSaveButtons(showSaveButtons.map((value, idx) => idx === index ? false : value)); // 저장 버튼 감추기
      getExpList(); // 삽입 후 목록 새로고침
    } catch (error) {
      console.error("경력 입력 에러 :", error);      
    }
  };

  const handleDeleteRow = async (index) => {
    const expNo = filteredExList[index].EXP_NO;
    if (expNo) {
      try {
        // 유효한 EXP_NO 값을 가진 경우에만 삭제 요청을 보냄
        await empExpDeleteDB(/* {exp_no: expNo} */ expNo);
        // 삭제 후 목록 새로고침
        getExpList();
      } catch (error) {
        console.error("경력 삭제 에러 :", error);
      }
    } else {
      console.error("경력 삭제 에러: EXP_NO가 유효하지 않거나 존재하지 않습니다.");
    }

    const updatedList = [...filteredExList];
    updatedList.splice(index, 1);
    setFilteredExList(updatedList);
    setShowSaveButtons(showSaveButtons.filter((value, idx) => idx !== index)); // 삭제된 행에 대한 저장 버튼 제거
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...filteredExList];
    updatedList[index][name] = value;
    setFilteredExList(updatedList);
    // 값이 변경되면 해당 행의 저장 버튼을 보이도록 설정
    setShowSaveButtons(showSaveButtons.map((val, idx) => idx === index ? true : val));
  };

  return (
    <div className={styles.empBaseInfo}>
      <Table responsive className={styles.empBaseTable}>
        <thead>
        <tr>
          <th>#</th>
          <th>회사명</th>
          <th>부서</th>
          <th>직급</th>
          <th>담당업무</th>
          <th>재직기간</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          {filteredExList.map((ex, index) => (
            <EmpExpRow
              key={index}
              index={index}
              EXP_NAME={ex.EXP_NAME}
              EXP_DEPT={ex.EXP_DEPT}
              EXP_RANK={ex.EXP_RANK}
              EXP_DUTY={ex.EXP_DUTY}
              EXP_PERIOD={ex.EXP_PERIOD}
              onDelete={() => handleDeleteRow(index)}
              onInputChange={(e) => handleInputChange(index, e)}
              onSave={() => handleSave(index)}
            >
            </EmpExpRow>
          ))}
        </tbody>
      </Table>
      <div>
        <button className={styles.expRowButton} onClick={handleAddRow}>+</button>
      </div>
    </div>
  );
};

export default EmpExp;