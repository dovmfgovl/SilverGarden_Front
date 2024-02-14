import React, { useState } from 'react';
import styles from '../program/programhome.module.css';
import { programInsertDB } from '../../services/api/programApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function ProgramInsert({ componentRef, handleReset, getProgramList }) {
    const [newData, setNewData] = useState({
        PG_NAME: '',
        PG_CATEGORY: '',
        PG_TEACHER: '',
        PG_DAYSOFWEEK: '',
        PG_REPEAT_TYPE: '',
        PG_START: '',
        PG_END: '',
        PG_CONTENT: '',
    });

    const handleInsert = async () => {
        console.log('등록 버튼이 클릭되었습니다.');
        try {
        const response = await programInsertDB(newData);
        console.log(response);
        // 등록 성공 시 상태 초기화
        setNewData({
            PG_NAME: '',
            PG_CATEGORY: '',
            PG_TEACHER: '',
            PG_DAYSOFWEEK: '',
            PG_REPEAT_TYPE: '',
            PG_START: '',
            PG_END: '',
            PG_CONTENT: '',
        });
        getProgramList(); // 초기화 진행
        handleReset(); // 등록화면 이동
        } catch (error) {
        console.error('API 호출 에러:', error);
        }
    };

    const periodOptions = ['매주', '격주', '매월', '격월', '하루']; // 주기 옵션들
    const categoryOptions = ['신체', '교양', '문화', '교육', '여가']; // 분류 옵션들
    const daysOptions = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일']; // 분류 옵션들

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '3px' }}>
            <button className="btn btn-outline-warning" onClick={handleReset}>
            초기화
            </button>
            <button className="btn btn-outline-success" onClick={handleInsert}>
            등록
            </button>
        </div>
        <div ref={componentRef}>
            <div className={styles.littleTitleBar}>
                <FontAwesomeIcon icon={faDownload} className={styles.icon} style={{ marginRight: '5px' }} />
                신규 프로그램 등록
            </div>
            <table className="table table-bordered">
            <tbody className="fs-6">
                <tr>
                    <th>프로그램명</th>
                    <td  colSpan="3">
                        <input type="text" name="PG_NAME" value={newData.PG_NAME} onChange={handleInputChange}/>
                    </td>
                </tr>
                <tr>
                    <th>분류</th>
                    <td>
                        <select name="PG_CATEGORY" value={newData.PG_CATEGORY} onChange={handleInputChange}>
                        <option value="null">선택</option>
                        {categoryOptions.map((category, index) => (
                            <option key={index} value={category}>
                            {category}
                            </option>
                        ))}
                        </select>
                    </td>
                    <th >주기</th>
                    <td >
                        <select name="PG_REPEAT_TYPE" value={newData.PG_REPEAT_TYPE} onChange={handleInputChange}>
                        <option value="null">선택</option>
                        {periodOptions.map((period, index) => (
                            <option key={index} value={period}>
                            {period}
                            </option>
                        ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>강사</th>
                    <td>
                        <input type="text" name="PG_TEACHER" value={newData.PG_TEACHER} onChange={handleInputChange} />
                    </td>
                    <th>요일</th>
                    <td >
                        <select name="PG_DAYSOFWEEK" value={newData.PG_DAYSOFWEEK} onChange={handleInputChange}>
                        <option value="null">선택</option>
                        {daysOptions.map((period, index) => (
                            <option key={index} value={period}>
                            {period}
                            </option>
                        ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>시작일시</th>
                    <td>
                        <input type="datetime-local" name="PG_START" value={newData.PG_START} onChange={handleInputChange} />
                    </td>
                    <th>종료일시</th>
                    <td>
                        <input type="datetime-local" name="PG_END" value={newData.PG_END} onChange={handleInputChange} />
                    </td>
                </tr>
                <tr>
                    <th colSpan="6">프로그램 내용</th>
                </tr>
                <tr>
                    <td colSpan="6">
                        <textarea
                            name="PG_CONTENT"
                            value={newData.PG_CONTENT}
                            onChange={handleInputChange}
                        />
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        </>
    );
}

export default ProgramInsert;
