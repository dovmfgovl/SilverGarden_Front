import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import styles from './empDetailInfo.module.css';
import { getEmpList, saveEmpDetails, setDetail } from '../../redux/empInfosSlice';

const EmpDetail = () => {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector(state => state.empInfos.selectedEmployee) || {};
  const [editing, setEditing] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState(selectedEmployee);
  const [originalEmployee, setOriginalEmployee] = useState(selectedEmployee);

  useEffect(() => {
    setUpdatedEmployee(selectedEmployee);
    setOriginalEmployee(selectedEmployee);
  }, [selectedEmployee]);

  const inputFields = [
    { label: '사원명', name: 'E_NAME', type: 'text' },
    { label: '성별', name: 'E_GENDER', type: 'text' },
    { label: '생년월일', name: 'E_BIRTH', type: 'date' },
    { label: '사원번호', name: 'E_NO', type: 'text' },
    { label: '입사일', name: 'E_HIREDATE', type: 'date' },
    { label: '퇴사일', name: 'E_ENDDATE', type: 'date' },
    { label: '연락처', name: 'E_PHONE', type: 'text' },
    { label: '이메일', name: 'E_EMAIL', type: 'text' },
    { label: '주소', name: 'E_ADDRESS', type: 'text' },
    { label: '부서', name: 'DEPT_NAME', type: 'text' },
    { label: '비밀번호', name: 'E_PASSWORD', type: 'password' },
    { label: '권한', name: 'E_AUTH', type: 'text' },
    { label: '현황', name: 'E_STATUS', type: 'text' },
    { label: '직종', name: 'E_OCCUP', type: 'text' },
    { label: '직급', name: 'E_RANK', type: 'text' },
  ];

  const handleEdit = () => {
    setEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee(prevState => ({
      ...prevState, [name]: value
    }));
  };

  const handleCancel = () => {
    setEditing(false);
    setUpdatedEmployee(originalEmployee); // 수정 취소 시 원래 정보로 되돌림
  };

  // 수정된 직원 정보 저장 후, 전체 직원 목록을 다시 가져오도록 수정
  const handleSaveChanges = () => {
    dispatch(saveEmpDetails(updatedEmployee)) // 수정된 직원 정보 저장
    .then(() => {
      dispatch(setDetail(updatedEmployee)); // Redux 스토어에서 선택된 직원 정보 업데이트
      setEditing(false); // 수정 모드 해제

      // 수정된 직원 정보를 Redux 스토어에서 가져와 전체 직원 목록을 업데이트
      dispatch(getEmpList()); // 전체 직원 목록 다시 가져오기
    })
    .catch(error => {
      console.error('Error saving employee details: ', error);
    });
  }

  const renderInputField = ({ label, name, type }, index) => (
    <div className={styles.empInfoItem} key={name}>
      <div className={styles.label}>{label}</div>
      <input
        type={type}
        style={{ border: '1px solid lightgray', background: 'transparent', margin: '5px', paddingLeft: '50px' }}
        value={updatedEmployee[name] || ''}
        onChange={handleInputChange} // 입력값 변경 시 updatedEmployee 상태 업데이트
        readOnly={!editing} // 수정 모드일 때만 readOnly 해제
        name={name} // input 요소의 name 속성 추가
      />
      {index !== inputFields.length - 1 && <div className={styles.divider} />}
    </div>
  );

  return (
    <div style={{ padding: '20px', borderLeft: '1px solid' }}>
      <h5>직원 상세 정보</h5>
      <div className="col-2">
        {/* 수정 모드일 때만 저장 버튼 표시 */}
        {editing && <Button variant="warning" onClick={handleSaveChanges}>저장</Button>}
        <Button variant="warning" onClick={editing ? handleCancel : handleEdit}>
          {editing ? '취소' : '수정'}
        </Button>
      </div>
      <div className={styles.empInfoWrap}>
        <div className={styles.empPicture}>
          사진
        </div>
        {inputFields.map(renderInputField)}
      </div>
    </div>
  );
};

export default EmpDetail;
