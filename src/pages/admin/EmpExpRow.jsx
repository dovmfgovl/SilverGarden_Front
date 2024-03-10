import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './empDetailInfo.module.css';

const EmpExpRow = ({ index, EXP_NAME, EXP_DEPT, EXP_RANK, EXP_DUTY, EXP_PERIOD, onDelete, onInputChange, onSave }) => {
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
          <td><Form.Control type="text" name={`${index + 1}`} defaultValue={index + 1} onChange={handleInputChange}
                            style={{height: '30px', fontSize: 'small'}}/></td>
          <td><Form.Control type="text" name="EXP_NAME" defaultValue={EXP_NAME} onChange={handleInputChange}
                            style={{height: '30px', fontSize: 'small'}}/></td>
          <td><Form.Control type="text" name="EXP_DEPT" defaultValue={EXP_DEPT} onChange={handleInputChange}
                            style={{height: '30px', fontSize: 'small'}}/></td>
          <td><Form.Control type="text" name="EXP_RANK" defaultValue={EXP_RANK} onChange={handleInputChange}
                            style={{height: '30px', fontSize: 'small'}}/></td>
          <td><Form.Control type="text" name="EXP_DUTY" defaultValue={EXP_DUTY} onChange={handleInputChange}
                            style={{height: '30px', fontSize: 'small'}}/></td>
          <td><Form.Control type="text" name="EXP_PERIOD" defaultValue={EXP_PERIOD} onChange={handleInputChange}
                            style={{height: '30px', fontSize: 'small'}}/></td>
          <td>
              <button className={styles.expRowButton} onClick={handleDelete}>-</button>
          </td>
          <td>{isModified && <button className={styles.expSaveButton} onClick={handleSave}>저장</button>}</td>
      </tr>
  );
};

export default EmpExpRow;