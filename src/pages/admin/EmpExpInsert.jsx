import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { empExpDeleteDB, empExpInsertDB } from '../../services/api/empInfoApi';

const EmpExpInsert = () => {
  const [newEx, setNewEx] = useState({
    exp_name: '',
    exp_dept: '',
    exp_rank: '',
    exp_duty: '',
    exp_period: ''
  });
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setNewEx(prevState => ({
      ...prevState,
      [field]: value
    }));
    setShowSaveButton(true);
  };

  const handleAddRow = () => {
    empExpInsertDB(newEx); // 입력된 경력 정보를 데이터베이스에 추가
    setNewEx({
      exp_name: '',
      exp_dept: '',
      exp_rank: '',
      exp_duty: '',
      exp_period: ''
    });
    setShowSaveButton(false);
  };

  const handleDeleteRow = (exp_no) => {
    empExpDeleteDB(exp_no); // 선택된 경력 정보를 데이터베이스에서 삭제
  };

  return (
    <div>
      <h5>경력</h5>
      <Button onClick={handleAddRow} variant="success">+</Button>
      <table>
        <thead>
          <tr>
            <th>회사명</th>
            <th>부서</th>
            <th>직급</th>
            <th>담당업무</th>
            <th>재직기간</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" value={newEx.exp_name} onChange={(e) => handleInputChange(e, 'exp_name')} /></td>
            <td><input type="text" value={newEx.exp_dept} onChange={(e) => handleInputChange(e, 'exp_dept')} /></td>
            <td><input type="text" value={newEx.exp_rank} onChange={(e) => handleInputChange(e, 'exp_rank')} /></td>
            <td><input type="text" value={newEx.exp_duty} onChange={(e) => handleInputChange(e, 'exp_duty')} /></td>
            <td><input type="text" value={newEx.exp_period} onChange={(e) => handleInputChange(e, 'exp_period')} /></td>
            <td>
              {showSaveButton && <Button onClick={handleAddRow} variant="primary">저장</Button>}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmpExpInsert;
