import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDetail } from "../../redux/programSlice";
import { ProgramDeleteDB, ProgramUpdateDB } from '../../services/api/programApi';
import { Form } from "react-bootstrap";
import styles from '../program/programhome.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

const FormControl = ({ value, name, onChange, type = 'text', textarea = false }) => {
    return (
    <Form.Control
        type={type}
        as={textarea ? 'textarea' : undefined}
        value={value}
        name={name}
        onChange={(e) => onChange(e, name)}
        style={textarea ? { height: 'auto', minHeight: '300px' } : undefined}
    />
    );
};

const buttonStyles = {
    marginRight: '3px',
    padding: '6px 12px',
};

const ProgramDetail = ({ handleOutput, componentRef, getProgramList, handleReset }) => {
    const periodOptions = ['매주', '격주', '매월', '격월', '하루']; // 주기 옵션들
    const categoryOptions = ['신체', '교양', '문화', '교육', '여가']; // 분류 옵션들
    const daysOptions = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일']; // 분류 옵션들
    const dispatch = useDispatch();
    const pNO = useSelector((state) => state.programSlice.value);
    //삭제하기
    const handleDelete = async () => {
        console.log(pNO);
        console.log('삭제 버튼이 클릭되었습니다.!');
        try {
            const res = await ProgramDeleteDB(pNO);
            console.log(res);
            getProgramList(); // 초기화 진행
            handleReset(); // 등록화면 이동
        } catch (error) {
            console.error('삭제 에러:', error);
        }
    };
    //입력값 변경
    const handleInputChange = (e, name) => {
        const { value } = e.target;
        console.log(`Updating ${name} to: ${value}`); //여기선 드롭다운 변경된 게 로그에 뜨지만 화면에 적용 안됨
        dispatch(setDetail({
        ...pNO,
        [name]: value,
        }));
    };
    //전송
    const onSubmit = async () => {
        console.log('수정 버튼이 클릭되었습니다.');
        //입력된 데이터값
        const data = {
            PG_NO: pNO.PG_NO,
            PG_NAME: pNO.PG_NAME,
            PG_CATEGORY: pNO.PG_CATEGORY,
            PG_TEACHER: pNO.PG_TEACHER,
            PG_DAYSOFWEEK: pNO.PG_DAYSOFWEEK,
            PG_START: pNO.PG_START,
            PG_END: pNO.PG_END,
            PG_CONTENT: pNO.PG_CONTENT,
            PG_REPEAT_TYPE: pNO.PG_REPEAT_TYPE
        };
        //수정하기
        const res = await ProgramUpdateDB(data);
        console.log(res);
        console.log(data);
        alert("프로그램이 수정되었습니다!!");
        getProgramList(); // 초기화 진행
        handleReset(); // 등록화면 이동
    };

    return (
        <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '3px' }}>
            <button style={{fontWeight:'bolder', fontSize:'1px'}} variant="outline-danger" onClick={handleDelete}>
            삭제
            </button>
            <button className="btn btn-outline-secondary" style={buttonStyles} onClick={handleOutput}>
            출력
            </button>
            <button className="btn btn-outline-warning" style={buttonStyles} onClick={handleReset}>
            초기화
            </button>
            <button className="btn btn-outline-primary" style={buttonStyles} onClick={onSubmit}>
            수정
            </button>
        </div>
        <div ref={componentRef}>
            <div className={styles.littleTitleBar}>
                <FontAwesomeIcon icon={faFile} className={styles.icon} style={{ marginRight: '5px' }} />
                프로그램 계획서
            </div>
            <table className="table table-hover">
            <tbody className="fs-6">
                <tr>
                    <th style={{ width: '25%' }}>NO.</th>
                    <td style={{ width: '25%' }} colSpan="3">
                        {pNO.PG_NO}
                    </td>
                </tr>
                <tr>
                    <th style={{ width: '25%' }}>프로그램명</th>
                    <td style={{ width: '25%' }} colSpan="3" >
                        <FormControl type="text" value={pNO.PG_NAME|| ''} name="PG_NAME" onChange={handleInputChange} />
                    </td>
                </tr>

                <tr>
                    <th style={{ width: '25%' }}>분류</th>
                    <td style={{ width: '25%' }}>
                        <select name="PG_CATEGORY" value={pNO.PG_CATEGORY || ''}  onChange={(e) => handleInputChange(e, 'PG_CATEGORY')}>
                        <option value="" >선택</option>
                        {categoryOptions.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                        </select>
                    </td>
                    <th style={{ width: '25%' }}>주기</th>
                    <td >
                        <select name="PG_REPEAT_TYPE" value={pNO.PG_REPEAT_TYPE || ''} onChange={(e) => handleInputChange(e, 'PG_REPEAT_TYPE')}>
                        <option value="">선택</option>
                        {periodOptions.map((period, index) => (
                            <option key={index} value={period}>
                                {period}
                            </option>
                        ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <th style={{ width: '30%' }}>강사</th>
                    <td style={{ width: '30%' }}>
                        <FormControl type="text" value={pNO.PG_TEACHER|| ''} name="PG_TEACHER" onChange={handleInputChange} />
                    </td>
                    <th style={{ width: '30%' }}>요일</th>
                    <td >
                        <select name="PG_DAYSOFWEEK" value={pNO.PG_DAYSOFWEEK || ''} onChange={(e) => handleInputChange(e, 'PG_DAYSOFWEEK')}>
                        <option value="">선택</option>
                        {daysOptions.map((period, index) => (
                            <option key={index} value={period}>
                                {period}
                            </option>
                        ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <th style={{ width: '30%' }}>시작일</th>
                    <td style={{ width: '30%' }}>
                        <FormControl
                        type="datetime-local"
                        value={pNO.PG_START}
                        name="PG_START"
                        onChange={(e) => handleInputChange(e, 'PG_START')}
                        />
                    </td>
                    <th style={{ width: '30%' }}>종료일</th>
                    <td style={{ width: '30%' }}>
                        <FormControl
                        type="datetime-local"
                        value={pNO.PG_END}
                        name="PG_END"
                        onChange={(e) => handleInputChange(e, 'PG_END')}
                        />
                    </td>
                </tr>
                <tr>
                    <th colSpan="6">프로그램 내용</th>
                </tr>
                <tr>
                    <td colSpan="6">
                        <FormControl
                        value={pNO.PG_CONTENT|| ''}
                        name="PG_CONTENT"
                        textarea
                        onChange={handleInputChange}
                        />
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
    );
}

export default ProgramDetail;
