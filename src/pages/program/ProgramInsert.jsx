import React, { useState } from 'react';
import styles from '../program/programhome.module.css';
import { programInsertDB } from '../../services/api/programApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight, faDownload, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

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
        // console.log('등록 버튼이 클릭되었습니다.');
        const endHHMM = newData.PG_END.slice(11, 16);
        const startHHMM = newData.PG_START.slice(11, 16);
        if (newData.PG_START&&endHHMM === startHHMM) {
            window.alert('종료일시는 시작일시와 다르게 설정해주세요.');
            return;
        }
        // 내용이 아무것도 입력되지 않았을 때
        if (!newData.PG_NAME.trim()||!newData.PG_REPEAT_TYPE.trim()||!newData.PG_CATEGORY.trim()||!newData.PG_CONTENT.trim()) {
            window.alert('프로그램 내용을 입력해주세요.');
            return;
        }
        const confirmInsert = window.confirm("등록하시겠습니까?");
        if(confirmInsert){
            // eslint-disable-next-line no-unused-vars
            const response = await programInsertDB(newData);
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
        }
    };

    const periodOptions = ['하루','매주', '격주']; // 주기 옵션들
    const categoryOptions = ['교육', '문화', '봉사', '신체', '교양','여가']; // 분류 옵션들

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...newData, [name]: value };
        if (name === 'PG_START') {
            // 시작일시가 변경되었을 때 요일 계산
            const startDate = new Date(value);
            const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
            const dayOfWeek = daysOfWeek[startDate.getDay()];
            updatedData = { ...updatedData, PG_DAYSOFWEEK: dayOfWeek };
        }
        setNewData(updatedData);
    };

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '3px' }}>
            <button className="btn btn-outline-warning" onClick={() => { setNewData({ PG_NAME: '', PG_CATEGORY: '', PG_TEACHER: '', PG_DAYSOFWEEK: '', PG_REPEAT_TYPE: '', PG_START: '', PG_END: '', PG_CONTENT: '' }); handleReset(); }}>
                <FontAwesomeIcon icon={faArrowRotateRight} style={{marginRight:'2px'}}/>초기화
            </button>
            <button className="btn btn-outline-success" onClick={handleInsert}>
                <FontAwesomeIcon icon={faPenToSquare}  style={{marginRight:'2px'}}/>등록
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
                        <input type="text" name="PG_NAME" style={{border:'0.5px solid lightgrey'}} value={newData.PG_NAME} onChange={handleInputChange}/>
                    </td>
                </tr>
                <tr>
                    <th>분류</th>
                    <td>
                        <select name="PG_CATEGORY"value={newData.PG_CATEGORY} onChange={handleInputChange}  style={{border:'0.5px solid lightgrey', textAlign:'center'}} >
                        <option value="null">선택</option>
                        {categoryOptions.map((category, index) => (
                            <option key={index} value={category} >
                            {category}
                            </option>
                        ))}
                        </select>
                    </td>
                    <th >주기</th>
                    <td >
                        <select name="PG_REPEAT_TYPE" value={newData.PG_REPEAT_TYPE} onChange={handleInputChange} style={{border:'0.5px solid lightgrey', textAlign:'center'}} >
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
                        <input type="text" name="PG_TEACHER" value={newData.PG_TEACHER} onChange={handleInputChange} style={{border:'0.5px solid lightgrey'}}  />
                    </td>
                    <th>요일</th>
                    <td>
                        <input
                            type="text"
                            name="PG_DAYSOFWEEK"
                            value={newData.PG_START ? newData.PG_DAYSOFWEEK : ''}
                            onChange={handleInputChange}
                            disabled={true} // 자동으로 계산된 값이므로 비활성화
                            style={{border:'0.5px solid lightgrey'}} 
                        />
                    </td>
                </tr>
                <tr>
                    <th>시작일시</th>
                    <td>
                        <input type="datetime-local" name="PG_START" value={newData.PG_START} onChange={handleInputChange}  style={{border:'0.5px solid lightgrey', textAlign:'center'}}  />
                    </td>
                    <th>종료일시</th>
                    <td>
                        <input type="datetime-local" name="PG_END" value={newData.PG_END} onChange={handleInputChange}  style={{border:'0.5px solid lightgrey', textAlign:'center'}} />
                    </td>
                </tr>
                <tr>
                    <th colSpan="6">프로그램 내용</th>
                </tr>
                <tr>
                    <td colSpan="6" >
                        <textarea
                            style={{border:'0.5px solid lightgrey'}} 
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
