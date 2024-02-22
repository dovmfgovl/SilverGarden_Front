import React, { useEffect, useMemo, useState } from 'react';
import Table from 'react-bootstrap/Table';
import EmpEduRow from './EmpEduRow';
import { useDispatch, useSelector } from 'react-redux';
import { getEmpList, saveEmpEdu, setDetail } from '../../redux/empInfosSlice';
import { Button } from 'react-bootstrap';
import styles from './empDetailInfo.module.css';
import { Col, Row } from 'antd';

const EmpEdu = () => {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector(state => state.empInfos.selectedEmployee);
  const memoSelectedEmployee = useMemo(() => selectedEmployee || {}, [selectedEmployee]);
  const [editing, setEditing] = useState(false);
  const [updatedEdu, setUpdatedEdu] = useState(memoSelectedEmployee);
  const [originalEdu, setOriginalEdu] = useState(memoSelectedEmployee);

  useEffect(() => {
    setUpdatedEdu(prevEmployee => {
      // memoSelectedEmployee와 비교하여 변경된 경우에만 업데이트
      if (prevEmployee !== memoSelectedEmployee) {
        return memoSelectedEmployee;
      }
      return prevEmployee;
    });
    setOriginalEdu(memoSelectedEmployee);
  }, [memoSelectedEmployee]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleInputChange = (name, value) => {
    console.log(`name: ${name}, value: ${value}`);
    setUpdatedEdu(prevState => ({
      ...prevState, [name]: value
    }));
  };  

  const handleCancel = () => {
    setEditing(false);
    setUpdatedEdu(originalEdu);
  };

  const handleSaveChanges = () => {
    dispatch(saveEmpEdu(updatedEdu))
    .then(() => {
      dispatch(setDetail(updatedEdu));
      setEditing(false);
      dispatch(getEmpList());
    })
    .catch(error => {
      console.error('Error saving employee details: ', error);
    });
  }

  const educations = [
    { label: 'HIGH_SCHOOL', period: memoSelectedEmployee.HIGH_SCHOOL_PERIOD, name: memoSelectedEmployee.HIGH_SCHOOL_NAME, major: memoSelectedEmployee.HIGH_SCHOOL_MAJOR, status: memoSelectedEmployee.HIGH_SCHOOL_STATUS },
    { label: 'UNIVERSITY', period: memoSelectedEmployee.UNIVERSITY_PERIOD, name: memoSelectedEmployee.UNIVERSITY_NAME, major: memoSelectedEmployee.UNIVERSITY_MAJOR, status: memoSelectedEmployee.UNIVERSITY_STATUS },
    { label: 'GRADUATE_SCHOOL', period: memoSelectedEmployee.GRADUATE_SCHOOL_PERIOD, name: memoSelectedEmployee.GRADUATE_SCHOOL_NAME, major: memoSelectedEmployee.GRADUATE_SCHOOL_MAJOR, status: memoSelectedEmployee.GRADUATE_SCHOOL_STATUS }
  ];

  return (
    <div className={styles.empBaseInfo} >
      <Row style={{marginBottom:"10px"}}>
        <Col md = {19}>          
          <h5>학력</h5>          
        </Col>
        <Col md ={5}>          
          <div className="col-9">
            <Row>
              <Col md={16}>
                {editing && <Button style = {{width : "80px"}} variant="outline-secondary" onClick={handleSaveChanges}>저장</Button>}
              </Col>
              <Col md={8}>
                <Button style = {{width : "80px"}} variant="outline-success" onClick={editing ? handleCancel : handleEdit}>
                  {editing ? '취소' : '수정'}
                </Button>
              </Col>
            </Row>
          </div>          
        </Col>
      </Row>
      <Table striped bordered hover className={styles.empBaseTable}>
        <thead>
          <tr>
            <th>기간</th>
            <th>학교명</th>
            <th>학과명</th>
            <th>졸업구분</th>
          </tr>
        </thead>
        <tbody>
          {educations.map((edu, index) => (
            <EmpEduRow key={index} edu={edu} editing={editing} handleInputChange={handleInputChange} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmpEdu;
