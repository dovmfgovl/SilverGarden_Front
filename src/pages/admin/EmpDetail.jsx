import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import styles from './empDetailInfo.module.css';

const EmpDetail = ({ handleUpdate }) => {
  const selectedEmployee = useSelector(state => state.empInfos.selectedEmployee) || {};
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

  const renderInputField = ({ label, name, type }, index) => (
    <div className={styles.empInfoItem} key={name}>
      <div className={styles.label}>{label}</div>
      <input
        type={type}
        style={{ border: '1px solid lightgray', background: 'transparent', margin: '5px', paddingLeft: '50px' }}
        value={selectedEmployee[name] || ''}
        readOnly
      />
      {index !== inputFields.length - 1 && <div className={styles.divider} />}
    </div>
  );

  return (
    <div style={{ padding: '20px', borderLeft: '1px solid' }}>
      <h5>직원 상세 정보</h5>
      <div className="col-2">
        <Button variant="warning" onClick={() => handleUpdate(selectedEmployee)}>
          수정
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