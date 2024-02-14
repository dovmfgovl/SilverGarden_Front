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
    { label: '성별', name: 'E_GENDER', type: 'select', options: ['남', '여'] },
    { label: '생년월일', name: 'E_BIRTH', type: 'date' },
    { label: '사원번호', name: 'E_NO', type: 'text' },
    { label: '입사일', name: 'E_HIREDATE', type: 'date' },
    { label: '퇴사일', name: 'E_ENDDATE', type: 'date' },
    { label: '연락처', name: 'E_PHONE', type: 'text' },
    { label: '이메일', name: 'E_EMAIL', type: 'text' },
    { label: '주소', name: 'E_ADDRESS', type: 'text' },
    { label: '부서', name: 'DEPT_NAME', type: 'select', options: ['간호팀', '교육팀', '사회복지팀', '운영관리팀'] },
    { label: '비밀번호', name: 'E_PASSWORD', type: 'password' },
    { label: '권한', name: 'E_AUTH', type: 'select', options: ['ADMIN', 'USERA', 'USERB'] },
    { label: '현황', name: 'E_STATUS', type: 'select', options: ['재직', '휴직', '퇴직'] },
    { label: '직종', name: 'E_OCCUP', type: 'select', options: ['간호사', '간호조무사', '물리치료사', '사회복지사', '요양보호사', '조리사', '활동지원사', '강사'] },
    { label: '직급', name: 'E_RANK', type: 'select', options: ['시설장', '팀장', '사원'] },
  ];

  const handleEdit = () => {
    setEditing(true); // 수정 모드 활성화
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee(prevState => ({
      ...prevState, [name]: value
    }));
  };

  const handleCancel = () => {
    setEditing(false); // 수정 모드 비활성화
    setUpdatedEmployee(originalEmployee); // 수정 취소 시 원래 정보로 되돌림
  };

  // 수정된 직원 정보 저장 후, 전체 직원 목록을 다시 가져오도록 수정
  const handleSaveChanges = () => {
    dispatch(saveEmpDetails(updatedEmployee)) // 수정된 직원 정보 저장
    .then(() => {
      dispatch(setDetail(updatedEmployee)); // Redux 스토어에서 선택된 직원 정보 업데이트
      setEditing(false); // 수정 모드 비활성화

      // 수정된 직원 정보를 Redux 스토어에서 가져와 전체 직원 목록을 업데이트
      dispatch(getEmpList()); // 전체 직원 목록 다시 가져오기
    })
    .catch(error => {
      console.error('Error saving employee details: ', error);
    });
  }

  const renderInputField = ({ label, name, type, options }, index) => (
    <div className={styles.empInfoItem} key={name}>
      <div className={styles.label}>{label}</div>
      {type === 'select' ? ( /* 셀렉트 박스 생성 */
        <select
        style={{
          border: '1px solid lightgray',
          background: 'transparent',
          margin: '5px',
          paddingLeft: '50px',
          paddingRight: '100px'
        }}
          value={updatedEmployee[name] || ''}
          onChange={handleInputChange}
          disabled={!editing}
          name={name}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          style={{ border: '1px solid lightgray', background: 'transparent', margin: '5px', paddingLeft: '50px' }}
          value={updatedEmployee[name] || ''}
          onChange={handleInputChange}
          readOnly={!editing}
          name={name}
        />
      )}
      {index !== inputFields.length - 1 && <div className={styles.divider} />}
    </div>
  );

  return (
    <div style={{ padding: '20px', borderLeft: '1px solid lightgray' }}>
      <h5>직원 상세 정보</h5>
      <div className="col-2">
        {editing && <Button variant="outline-secondary" onClick={handleSaveChanges}>저장</Button>}
        <Button variant="outline-success" onClick={editing ? handleCancel : handleEdit}>
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