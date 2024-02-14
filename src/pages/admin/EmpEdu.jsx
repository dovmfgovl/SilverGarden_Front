import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import EmpEduRow from './EmpEduRow';
import { useDispatch, useSelector } from 'react-redux';
import { getEmpList, saveEmpEdu, setDetail } from '../../redux/empInfosSlice';
import { Button } from 'react-bootstrap';

const EmpEdu = () => {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector(state => state.empInfos.selectedEmployee) || {};
  const [editing, setEditing] = useState(false);
  const [updatedEdu, setUpdatedEdu] = useState(selectedEmployee);
  const [originalEdu, setOriginalEdu] = useState(selectedEmployee);

  useEffect(() => {
    setUpdatedEdu(selectedEmployee);
    setOriginalEdu(selectedEmployee);
  }, [selectedEmployee]);

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
    { label: 'HIGH_SCHOOL', period: selectedEmployee.HIGH_SCHOOL_PERIOD, name: selectedEmployee.HIGH_SCHOOL_NAME, major: selectedEmployee.HIGH_SCHOOL_MAJOR, status: selectedEmployee.HIGH_SCHOOL_STATUS },
    { label: 'UNIVERSITY', period: selectedEmployee.UNIVERSITY_PERIOD, name: selectedEmployee.UNIVERSITY_NAME, major: selectedEmployee.UNIVERSITY_MAJOR, status: selectedEmployee.UNIVERSITY_STATUS },
    { label: 'GRADUATE_SCHOOL', period: selectedEmployee.GRADUATE_SCHOOL_PERIOD, name: selectedEmployee.GRADUATE_SCHOOL_NAME, major: selectedEmployee.GRADUATE_SCHOOL_MAJOR, status: selectedEmployee.GRADUATE_SCHOOL_STATUS }
  ];

  return (
    <div style={{ padding: '20px', borderLeft: '1px solid lightgray' }}>
      <h5>직원 기초 정보</h5>
      <h5>학력</h5>
      <div className="col-2">
        {editing && <Button variant="warning" onClick={handleSaveChanges}>저장</Button>}
        <Button variant="warning" onClick={editing ? handleCancel : handleEdit}>
          {editing ? '취소' : '수정'}
        </Button>
      </div>
      <Table striped bordered hover>
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
