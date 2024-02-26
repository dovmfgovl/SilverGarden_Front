import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import styles from './empDetailInfo.module.css';
import { getEmpList, saveEmpDetails, setDetail } from '../../redux/empInfosSlice';
import { Col, Row } from 'antd';
import EmpPictureUpload from './EmpPictureUpload';
import { DeptNameDB } from '../../services/api/empCreateApi';
import styled from 'styled-components';

const EmpDetail = () => {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector(state => state.empInfos.selectedEmployee);
  const memoSelectedEmployee = useMemo(() => selectedEmployee || {}, [selectedEmployee]);
  const [editing, setEditing] = useState(false); // 수정 모드 여부를 관리하는 state
  const [updatedEmployee, setUpdatedEmployee] = useState(memoSelectedEmployee); // 수정된 직원 정보를 관리하는 state
  const [originalEmployee, setOriginalEmployee] = useState(memoSelectedEmployee); // 원래의 직원 정보를 관리하는 state
  const [dept, setDept] = useState([]);
  const [e_password, setPassword] = useState("");
  const [fileList, setFileList] = useState([]); // 파일 리스트를 관리하는 state

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

  /*   const deptName = () => {
    console.log("deptName");
    DeptNameDB()
      .then((response) => {
        console.log(response);
        setDept(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }; */

  const passwordGenerate = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
    let randomStr = "";
    for (let i = 0; i < 10; i++) {
      let randomIndex = Math.floor(Math.random() * chars.length);
      randomStr += chars[randomIndex];
    }
    console.log(randomStr);
    setPassword(randomStr);
    setUpdatedEmployee(prevState => ({
      ...prevState,
      E_PASSWORD: randomStr // E_PASSWORD 항목만 업데이트
    }))
  };

/*   const PasswordField = () => (
    <>
      <div>
        <label htmlFor="E_PASSWORD">비밀번호</label>
        <input id="E_PASSWORD" name="E_PASSWORD" type="password" />
      </div>
      <MyButton type="button" onClick={passwordGenerate}>
        임시비밀번호발급
      </MyButton>
    </>
  ); */

  const handleEdit = () => {
    setEditing(true); // 수정 버튼을 누를 때 수정 모드 활성화
  };

  const handleInputChange = (e) => { // 입력 필드 값 변경 시 상태 업데이트
    const { name, value } = e.target;
    setUpdatedEmployee(prevState => ({
      ...prevState, [name]: value
    }));
  };

  const handleFile = (list) => { // 파일 선택 시 파일 리스트 업데이트
    setFileList([...list])
  }

  const handleCancel = () => {
    setEditing(false); // 수정 취소 시 수정 모드 비활성화
    setUpdatedEmployee(originalEmployee); // 수정 취소 시 이전 상태로 되돌림
  };

  // 수정된 직원 정보 저장 후, 전체 직원 목록을 다시 가져옴
  const handleSaveChanges = () => {
    const formData = new FormData();
    formData.append('profile', fileList[0]); // 파일을 formData에 추가

    for(const key in updatedEmployee) {
      formData.append(key, updatedEmployee[key]); // 직원 정보를 formData에 추가
    }
    dispatch(saveEmpDetails(formData))
      .then(() => {
        dispatch(setDetail(updatedEmployee));
        setEditing(false); // 저장 후 수정 모드 비활성화
        dispatch(getEmpList()); // 저장 후 전체 목록 갱신
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
              type="password"
              value={updatedEmployee[name] || ''} // updatedEmployee의 비밀번호 값으로 설정
              onChange={handleInputChange} // 입력 필드가 변경되면 상태를 업데이트
              readOnly={!editing}
              name={name}
            />
            <MyButton type="button" onClick={passwordGenerate}>
              임시비밀번호발급
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
                  // 기존의 옵션들을 그대로 사용
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
    { label: '비밀번호', name: 'E_PASSWORD', type: 'password' },
    { label: '권한', name: 'E_AUTH', type: 'select', options: ['ADMIN', 'USERA', 'USERB'] },
    { label: '현황', name: 'E_STATUS', type: 'select', options: ['재직', '휴직', '퇴직'] },
    { label: '직종', name: 'E_OCCUP', type: 'select', options: ['간호사', '간호조무사', '물리치료사', '사회복지사', '요양보호사', '조리사', '활동지원사', '강사'] },
    { label: '직급', name: 'E_RANK', type: 'select', options: ['시설장', '팀장', '사원'] },
  ];
  

  return (
    <div className={styles.empDetailInfo}>
      <Row style={{ marginBottom: "10px" }}>
        <Col md={15}>
          <h5>직원 상세 정보</h5>
        </Col>
        <Col md={9}>
          <div className="col-11">
            <Row>
              <Col md={12}>
                {editing ? (
                  <Button style={{ width: "55%", fontSize: "0.8rem" }} variant="outline-secondary" onClick={handleSaveChanges}>저장</Button>
                ) : (
                  <Button style={{ width: "55%", fontSize: "0.8rem"}} variant="outline-success" onClick={handleEdit}>수정</Button>
                )}
              </Col>
              <Col md={12}>
                {editing && (
                  <Button style={{ width: "55%", fontSize: "0.8rem" }} variant="outline-danger" onClick={handleCancel}>취소</Button>
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <div className={styles.empInfoWrap}>
        <div className={styles.empPicture}>
          {editing && <EmpPictureUpload handleFile={handleFile} fileList={fileList} />} {/* 수정 모드일 때만 파일 업로드 활성화 */}
          {fileList.length > 0 && ( // 파일 선택 시 미리보기 표시
            <img src={URL.createObjectURL(fileList[0])} alt="Employee Preview" style={{ width: '160px', height: '180px' }} />
          )}
        </div>
        {inputFields.map(renderInputField)}
      </div>
    </div>
  );
};

export default EmpDetail;

const MyButton = styled.button`
  margin-top: 35px;
  border-radius: 5px;
  background-color: grey;
  color: white;
`;