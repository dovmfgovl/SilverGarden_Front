import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { empCertiInsertDB } from '../../services/api/empInfoApi';

const EmpCertiInsert = ({ onSave }) => {
  const [newCerti, setNewCerti] = useState({
    certi_cate: '',
    certi_code: '',
    certi_issuer: '',
    certi_acquire: '',
    reg_date: '',
    reg_id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCerti(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    console.log("저장버튼 클릭");
    try {
      onSave(newCerti);
      const response = await empCertiInsertDB(newCerti);
      console.log(response);
      // 등록 성공 시 상태 초기화...
      setNewCerti({
        certi_cate: '',
        certi_code: '',
        certi_issuer: '',
        certi_acquire: '',
        reg_date: '',
        reg_id: ''
      });
      onSave();      
    } catch (error) {
      console.error('certi 등록 에러:', error)
    }
  };

  return (
    <tr>
      <td><input type="text" name="certi_cate" value={newCerti.certi_cate} onChange={handleChange} /></td>
      <td><input type="text" name="certi_code" value={newCerti.certi_code} onChange={handleChange} /></td>
      <td><input type="text" name="certi_issuer" value={newCerti.certi_issuer} onChange={handleChange} /></td>
      <td><input type="text" name="certi_acquire" value={newCerti.certi_acquire} onChange={handleChange} /></td>
      <td><Button onClick={handleSave}>저장</Button></td>
    </tr>
  );
};

export default EmpCertiInsert;