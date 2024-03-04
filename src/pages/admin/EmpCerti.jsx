import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import EmpCertiRow from './EmpCertiRow';
import styles from './empDetailInfo.module.css';
import { empCertiListDB, empCertiInsertDB, empCertiDeleteDB } from '../../services/api/empInfoApi';
import { useSelector } from 'react-redux';

const EmpCerti = ({ empDetail }) => {
  const [certiList, setCertiList] = useState([]); // 자격증 목록 저장할 상태 변수
  const [filteredCertiList, setFilteredCertiList] = useState([]); // 필터링된 자격증 목록 저장할 상태 변수
  const [showSaveButtons, setShowSaveButtons] = useState([]); // 각 행마다 저장 버튼을 관리하는 배열


  const REG_ID = useSelector(state => state.userInfoSlice.e_no); // Redux store에서 e_no 가져오기
  const E_NO = empDetail ? empDetail.E_NO : '';

  const today = new Date();
  const [date, setDate] = useState([today.getFullYear(), `0${today.getMonth() + 1}`.slice(-2), `0${today.getDate()}`.slice(-2)].join("-")
      + ` ${`0${today.getHours()}`.slice(-2)}:${`0${today.getMinutes()}`.slice(-2)}:${`0${today.getSeconds()}`.slice(-2)}`);


  useEffect(() => {
    getCertiList();
  }, [empDetail]); // 직원 상세 정보가 변경될 때마다 해당 직원의 자격증 목록 가져오기

  const getCertiList = async () => {
    try {
      const response = await empCertiListDB();
      const data = response.data;
      setCertiList(data);
      // 클릭한 직원의 자격증 정보를 가져온 후에 filteredCertiList와 showSaveButtons 초기화
      setFilteredCertiList([]);
      setShowSaveButtons([]);
    } catch (error) {
      console.error("자격증 조회 에러 :", error);
    }
  };

  // 자격증 목록과 직원 상세 정보가 변경될 때마다 필터링된 자격증 목록 업데이트
  useEffect(() => {
    if (certiList.length > 0 && empDetail && empDetail.E_NO) {
      const filteredCertis = certiList.filter(certi => certi.E_NO === empDetail.E_NO);
      setFilteredCertiList(filteredCertis);
      // 저장 버튼을 각 행마다 보이도록 초기화
      setShowSaveButtons(new Array(filteredCertis.length).fill(false));
    }
  }, [certiList, empDetail]);

  const handleAddRow = () => {
    setFilteredCertiList([...filteredCertiList, { // 새로운 빈 행 추가
      CERTI_CATE: '',
      CERTI_CODE: '',
      CERTI_ISSUER: '',
      CERTI_ACQUIRE: '',
      REG_DATE: date,
      REG_ID: REG_ID,
      E_NO: E_NO
    }]);
    setShowSaveButtons([...showSaveButtons, true]); // 새로운 행에 대한 저장 버튼 추가
  };

  const handleSave = async (index) => {
    try {
      await empCertiInsertDB(filteredCertiList[index]); // 해당 행에 대한 데이터 저장
      setShowSaveButtons(showSaveButtons.map((value, idx) => idx === index ? false : value)); // 저장 버튼 감추기
      getCertiList(); // 삽입 후 목록 새로고침
    } catch (error) {
      console.error("자격증 입력 에러 :", error);
    }
  };

  const handleDeleteRow = async (index) => {
    const certiNo = filteredCertiList[index].CERTI_NO;
    if (certiNo) {
      try {
        // 유효한 EXP_NO 값을 가진 경우에만 삭제 요청을 보냄
        await empCertiDeleteDB(certiNo);
        // 삭제 후 목록 새로고침
        getCertiList();
      } catch (error) {
        console.error("자격증 삭제 에러 :", error);
      }
    } else {
      console.error("자격증 삭제 에러: CERTI_NO가 유효하지 않거나 존재하지 않습니다.");
    }

    const updatedList = [...filteredCertiList];
    updatedList.splice(index, 1);
    setFilteredCertiList(updatedList);
    setShowSaveButtons(showSaveButtons.filter((value, idx) => idx !== index)); // 삭제된 행에 대한 저장 버튼 제거
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedList = [...filteredCertiList];
    updatedList[index][name] = value;
    setFilteredCertiList(updatedList);
    // 값이 변경되면 해당 행의 저장 버튼을 보이도록 설정
    setShowSaveButtons(showSaveButtons.map((val, idx) => idx === index ? true : val));
  };

  return (
      <div className={styles.empBaseInfo}>
        <Table responsive className={styles.empBaseTable}>
          <thead>
          <tr>
            <th>#</th>
            <th>자격종류</th>
            <th>자격증번호</th>
            <th>발급기관명</th>
            <th>취득일자</th>
          </tr>
          </thead>
          <tbody>
          {filteredCertiList.map((certi, index) => (
              <EmpCertiRow
                  key={index}
                  index={index}
                  CERTI_CATE={certi.CERTI_CATE}
                  CERTI_CODE={certi.CERTI_CODE}
                  CERTI_ISSUER={certi.CERTI_ISSUER}
                  CERTI_ACQUIRE={certi.CERTI_ACQUIRE}
                  onDelete={() => handleDeleteRow(index)}
                  onInputChange={(e) => handleInputChange(index, e)}
                  onSave={() => handleSave(index)}
              />
          ))}
          </tbody>
        </Table>
        <div>
          <button className={styles.expRowButton} onClick={handleAddRow}>+</button>
        </div>
      </div>
  );
};

export default EmpCerti;