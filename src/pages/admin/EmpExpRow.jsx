import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EmpExpRow = ({ EXP_NAME, EXP_DEPT, EXP_RANK, EXP_DUTY, EXP_PERIOD, onDelete, onInputChange, onSave }) => {
  const [isModified, setIsModified] = useState(false);

  // 삭제 버튼 클릭 시 처리 함수
  const handleDelete = () => {
    onDelete();
  };

  // 입력 값 변경 시 처리 함수
  const handleInputChange = (e) => {
    setIsModified(true);
    onInputChange(e);
  };

  // 저장 버튼 클릭 시 처리 함수
  const handleSave = () => {
    onSave();
    setIsModified(false);
  };

  return (
    <tr>
      <td><Form.Control type="text" name="EXP_NAME" defaultValue={EXP_NAME} onChange={handleInputChange} /></td>
      <td><Form.Control type="text" name="EXP_DEPT" defaultValue={EXP_DEPT} onChange={handleInputChange} /></td>
      <td><Form.Control type="text" name="EXP_RANK" defaultValue={EXP_RANK} onChange={handleInputChange} /></td>
      <td><Form.Control type="text" name="EXP_DUTY" defaultValue={EXP_DUTY} onChange={handleInputChange} /></td>
      <td><Form.Control type="text" name="EXP_PERIOD" defaultValue={EXP_PERIOD} onChange={handleInputChange} /></td>
      <td><Button variant="danger" onClick={handleDelete}>-</Button></td>
      <td>{isModified && <Button variant="success" onClick={handleSave}>저장</Button>}</td>
    </tr>
  );
};

export default EmpExpRow;