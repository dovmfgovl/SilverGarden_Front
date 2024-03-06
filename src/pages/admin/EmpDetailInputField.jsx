import React from 'react';
import styles from './empDetailInfo.module.css';
import styled from 'styled-components';

const EmpDetailInputField = ({
    field,
    updatedEmployee,
    handleInputChange,
    editing,
    dept,
    job,
    onPasswordGenerate // 임시비밀번호 재발급 함수 전달
}) => {
    const { label, name, type, options } = field;

    const passwordGenerate = () => {
        const chars =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
        let randomStr = "";
        for (let i = 0; i < 10; i++) {
          let randomIndex = Math.floor(Math.random() * chars.length);
          randomStr += chars[randomIndex];
        }
        onPasswordGenerate(randomStr); // 부모 컴포넌트로 재발급 임시비밀번호 전달
      };

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
                        dept.map((item, index) => (
                        <option key={index} value={item.CD_VALUE}>{item.CD_VALUE}</option>
                        ))
                    ) : name === 'E_OCCUP' ? (
                        job.map((item, index) => (
                        <option key={index} value={item.CD_VALUE}>{item.CD_VALUE}</option>
                        ))
                    ) : (
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
                {name === 'E_PASSWORD' && (
                    <MyButton type="button" onClick={passwordGenerate}>
                    임시비밀번호재발급
                    </MyButton>
                )}
            </div>
        </div>
    );
};

export default EmpDetailInputField;

const MyButton = styled.button`
    margin-top: 35px;
    border-radius: 5px;
    background-color: grey;
    color: white;
`;