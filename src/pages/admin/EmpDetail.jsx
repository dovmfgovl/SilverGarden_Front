import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './empDetailInfo.module.css';
import { getEmpList, saveEmpDetails, setDetail } from '../../redux/empInfosSlice';
import { Col, Row } from 'antd';
import { DeptNameDB } from '../../services/api/empCreateApi';
import EmpUploadImg from './EmpUploadImg';
import { JobListDB } from '../../services/api/deptApi';
import EmpDetailInputField from './EmpDetailInputField';

const EmpDetail = () => {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector(state => state.empInfos.selectedEmployee);
  const memoSelectedEmployee = useMemo(() => selectedEmployee || {}, [selectedEmployee]);
  const [editing, setEditing] = useState(false); // 수정 모드 여부를 관리하는 state
  const [updatedEmployee, setUpdatedEmployee] = useState(memoSelectedEmployee); // 수정된 직원 정보를 관리하는 state
  const [originalEmployee, setOriginalEmployee] = useState(memoSelectedEmployee); // 원래의 직원 정보를 관리하는 state
  const [dept, setDept] = useState([]);
  const [job, setJob] = useState([]);
  const [e_password, setPassword] = useState("");
  
  const deptCd = dept.find(item => item.CD_VALUE === updatedEmployee.DEPT_NAME)?.CD;
  const empData = useSelector((state) => state.userInfoSlice);

  useEffect(() => {
    // 선택된 직원 정보가 변경되면 해당 정보로 state 업데이트
    setUpdatedEmployee(prevEmployee => {
      if (prevEmployee !== memoSelectedEmployee) {
        return memoSelectedEmployee;
      }
      return prevEmployee;
    });
    setOriginalEmployee(memoSelectedEmployee);
  }, [memoSelectedEmployee]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번 부서 정보를 가져오도록 설정
    deptName();
    if (updatedEmployee.DEPT_NAME) {
      deptJob(); // 부서가 선택되면 직종 데이터 가져오기
    }
  }, [deptCd]);

  const deptName = () => {
    DeptNameDB()
      .then((response) => {
        setDept(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deptJob = () => {
    const data = {
      CD : deptCd,
      MOD_ID: empData.e_no
    }
    JobListDB(data)
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  } 

  const handleEdit = () => {
    setEditing(true); // 수정 버튼을 누를 때 수정 모드 활성화
  };

  const handleInputChange = (e) => { // 입력 필드 값 변경 시 상태 업데이트
    const { name, value } = e.target;
    setUpdatedEmployee(prevState => ({
      ...prevState, [name]: value
    }));
  };

  const handleCancel = () => {
    setEditing(false); // 수정 취소 시 수정 모드 비활성화
    setUpdatedEmployee(originalEmployee); // 수정 취소 시 이전 상태로 되돌림
  };

  const handleImageUrlChange = (imageUrl) => {
    // 이미지 URL을 updatedEmployee에 추가
    setUpdatedEmployee(prevState => ({
      ...prevState,
      E_PROFILE: imageUrl
    }));
  }

  // 비밀번호 재발급 처리
  const handlePasswordGenerate = (newPassword) => {
    setPassword(newPassword);
    setUpdatedEmployee(prevState => ({
      ...prevState,
      E_PASSWORD: newPassword // E_PASSWORD 항목만 업데이트
    }))
  };

  // 수정된 직원 정보 저장 후, 전체 직원 목록을 다시 가져옴
  const handleSaveChanges = () => {
    dispatch(saveEmpDetails(updatedEmployee)) // 수정된 직원 정보 저장
      .then(() => {
        dispatch(setDetail(updatedEmployee)); // 리덕스 스토어에서 선택된 직원 정보 업데이트
        setEditing(false); // 저장 후 수정 모드 비활성화
        dispatch(getEmpList()); // 저장 후 전체 목록 갱신
        // 수정된 직원 정보를 UI에 반영하기 위해 상태 업데이트
        setOriginalEmployee(updatedEmployee);
      })
      .catch(error => {
        console.error('Error saving employee details: ', error);
      });
  }

  const renderInputField = ({ label, name, type, options }, index) => {
    if (name === 'E_PASSWORD') {
      return (
        <div className={styles.empInfoItem} key={name}>
          <div className={styles.label}>{label}</div>
          <div className={styles.selectContainer}>
            <input
              className={styles.inputFields}
              type="text"
              value={updatedEmployee[name] || ''} // updatedEmployee의 비밀번호 값으로 설정
              onChange={handleInputChange} // 입력 필드가 변경되면 상태를 업데이트
              readOnly={!editing}
              name={name}
            />
            <MyButton type="button" onClick={passwordGenerate}>
              임시비밀번호재발급
            </MyButton>
          </div>
          {index !== inputFields.length - 1 && <div className={styles.divider} />}
        </div>
      );
    } else {
      return (
        <div className={styles.empInfoItem} key={name}>
          <div className={styles.label}>{label}</div>
          <div className={styles.selectContainer}>
            {type === 'select' ? (
              <select
                className={styles.selectBox}
                value={updatedEmployee[name] || ''}
                onChange={handleInputChange}
                disabled={!editing}
                name={name}
              >
                {name === 'DEPT_NAME' ? (
                  // 부서 선택 옵션을 동적으로 가져오기
                  dept.map((item, index) => (
                    <option key={index} value={item.CD_VALUE}>{item.CD_VALUE}</option>
                  ))
                ) : (
                  // 기존의 옵션들은 그대로 사용
                  options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))
                )}
              </select>
            ) : (
              <input
                className={styles.inputFields}
                type={type}
                value={updatedEmployee[name] || ''}
                onChange={handleInputChange}
                readOnly={!editing}
                name={name}
              />
            )}
          </div>
          {index !== inputFields.length - 1 && <div className={styles.divider} />}
        </div>
      );
    }
  };

  
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
    { label: '부서', name: 'DEPT_NAME', type: 'select', options: dept.map(item => item.CD_VALUE) },
    { label: '비밀번호', name: 'E_PASSWORD', type: 'text' },
    { label: '권한', name: 'E_AUTH', type: 'select', options: ['ADMIN', 'USERA', 'USERB'] },
    { label: '현황', name: 'E_STATUS', type: 'select', options: ['재직', '휴직', '퇴직'] },
    { label: '직종', name: 'E_OCCUP', type: 'select', options: job.map(item => item.CD_VALUE) },
    { label: '직급', name: 'E_RANK', type: 'select', options: ['시설장', '팀장', '사원'] },
  ];
  
  return (
    <div className={styles.empDetailInfo}>
      <h5>직원 상세 정보</h5>     
      <div className={styles.empInfoWrap}>
        <div className={styles.empPicture}>
          <div className={styles.imgSquare}>
            {updatedEmployee.E_PROFILE ? (
              <img src={updatedEmployee.E_PROFILE} alt="프로필 사진" />
            ) : (
              <span>프로필 사진이 없습니다.</span>
            )}
          </div>
          <div className={styles.imgSaveButton}>
            { editing && <EmpUploadImg imageUrlChange={handleImageUrlChange}/> }
          </div>
        </div>
        {inputFields.map((field, index) => (
          <EmpDetailInputField
            key={index}
            field={field}
            updatedEmployee={updatedEmployee}
            handleInputChange={handleInputChange}
            editing={editing}
            dept={dept}
            job={job}
            onPasswordGenerate={handlePasswordGenerate} // 비밀번호 생성 함수 전달
          />
        ))}
      </div>
    <Row style={{ marginBottom: "10px" }}>
      <Col md={15}></Col>
      <Col md={9}>
      <div className="col-11" style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ marginRight: "10px" }}>
          {editing ? (
            <button className={styles.empSaveButton2} onClick={handleSaveChanges}>저장</button>
          ) : (
            <button className={styles.empSaveButton1} onClick={handleEdit}>수정</button>
          )}
        </div>
        {editing && (
          <button className={styles.empSaveButton3} onClick={handleCancel}>취소</button>
        )}
      </div>
      </Col>
    </Row>
  </div>
  );
};

export default EmpDetail;