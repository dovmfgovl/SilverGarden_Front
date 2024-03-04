import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import styles from './empDetailInfo.module.css';

const EmpCertiRow = ({ key, index, CERTI_CATE, CERTI_CODE, CERTI_ISSUER, CERTI_ACQUIRE, onDelete, onInputChange, onSave }) => {
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
            <td><Form.Control type="text" name="index + 1" defaultValue={index + 1} onChange={handleInputChange}
                              style={{height: '30px', fontSize: 'small'}}/></td>
            <td><Form.Control type="text" name="CERTI_CATE" defaultValue={CERTI_CATE} onChange={handleInputChange}
                              style={{height: '30px', fontSize: 'small'}}/></td>
            <td><Form.Control type="text" name="CERTI_CODE" defaultValue={CERTI_CODE} onChange={handleInputChange}
                              style={{height: '30px', fontSize: 'small'}}/></td>
            <td><Form.Control type="text" name="CERTI_ISSUER" defaultValue={CERTI_ISSUER} onChange={handleInputChange}
                              style={{height: '30px', fontSize: 'small'}}/></td>
            <td><Form.Control type="text" name="CERTI_ACQUIRE" defaultValue={CERTI_ACQUIRE} onChange={handleInputChange}
                              style={{height: '30px', fontSize: 'small'}}/></td>
            <td>
                <button className={styles.expRowButton} onClick={handleDelete}>-</button>
            </td>
            <td>{isModified && <button className={styles.expSaveButton} onClick={handleSave}>저장</button>}</td>
        </tr>)
        ;
};

export default EmpCertiRow