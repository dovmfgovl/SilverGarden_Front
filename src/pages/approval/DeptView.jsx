import { faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import styled from 'styled-components';
import styles from './approval.module.css'

const EmpBlock = styled.li`
  list-style-type: none;
  padding: 5px;
  margin: 5px;  
  background-color: ${({ isSelected }) => (isSelected ? '#969696' : '#ffffff')};
  cursor: pointer;
`;

const Employee = ({ empData, onEmpClick }) => (
  <ul>
    {empData.map((emp, index) => (
      <EmpBlock
        key={index}
        isSelected={emp.isSelected}
        onClick={() => onEmpClick(index)}
      >
        <FontAwesomeIcon icon={faUser}/>{emp.e_name} {emp.e_rank}
      </EmpBlock>
    ))}
  </ul>
  );

  const Department = ({ deptData, onEmpClick }) => {
    const [onOff, setOnOff] = useState(false);
  
    const handleToggle = () => {
      setOnOff((prev) => !prev);
    };
  
    return (
      <div>
        <>
          <input
            className="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            checked={onOff}
            onClick={handleToggle}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
          <FontAwesomeIcon icon={faUserGroup} />
            {deptData.dept_name}
          </label>
          {onOff === true ? (
            <Employee empData={deptData.emp} onEmpClick={onEmpClick} />
          ) : null}
        </>
      </div>
    );
    };

const DeptView = ({deptData, handleDeptData, handleEmpData}) => {
  
  const handleEmpClick = (deptIndex, empIndex) => {
    const updatedDeptData = [...deptData];
    updatedDeptData.forEach((dept) =>
    dept.emp.forEach((emp) => (emp.isSelected = false))
    );
    updatedDeptData[deptIndex].emp[empIndex].isSelected = true;
    handleDeptData(updatedDeptData);
    handleEmpData({...updatedDeptData[deptIndex].emp[empIndex]});
  }

  return (
    <div className={styles.deptView}>
      {deptData.map((dept, index) => <Department key={index} deptData={dept} onEmpClick={(empIndex) => handleEmpClick(index, empIndex)}/>)}
    </div>
  )
}

export default DeptView