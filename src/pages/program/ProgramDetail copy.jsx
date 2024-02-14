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
    const dispatch = useDispatch();
    const pNO = useSelector((state) => state.programSlice.value);

    const handleDelete = async () => {
        console.log('삭제 버튼이 클릭되었습니다.');
        try {
            // 서버에서 삭제 요청을 보냅니다.
            const res = await ProgramDeleteDB(pNO);
            console.log(res);
            // 초기화 후의 로직을 수행합니다.
            getProgramList(); // 초기화 진행
            handleReset(); // 등록화면 이동
        } catch (error) {
            console.error('삭제 에러:', error);
        }
    };

    const handleInputChange = (e, name) => {
        const { value } = e.target;
        dispatch(setDetail({
        ...pNO,
        [name]: value,
        }));
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const onSubmit = async () => {
        console.log('수정 버튼이 클릭되었습니다.');
        const data = {
        pg_no: pNO.PG_NO,
        pg_name: pNO.PG_NAME,
        pg_category: pNO.PG_CATEGORY,
        pg_teacher: pNO.PG_TEACHER,
        pg_daysofweek: pNO.PG_DAYSOFWEEK,
        pg_start: pNO.PG_START ? formatDate(new Date(pNO.PG_START)) : null,
        pg_end: pNO.PG_END ? formatDate(new Date(pNO.PG_END)) : null,
        pg_content: pNO.PG_CONTENT,
        pg_repeat_type: pNO.PG_REPEAT_TYPE
        };
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
            <button className="btn btn-outline-danger" style={buttonStyles} onClick={handleDelete}>
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
                        <FormControl type="text" value={pNO.PG_NAME} name="PG_NAME" onChange={handleInputChange} />
                    </td>
                </tr>

                <tr>
                    <th style={{ width: '25%' }}>분류</th>
                    <td style={{ width: '25%' }}>
                        <FormControl type="text" value={pNO.PG_CATEGORY} name="PG_CATEGORY" onChange={handleInputChange} />
                    </td>
                    <th style={{ width: '25%' }}>주기</th>
                    <td style={{ width: '25%' }}>
                        <FormControl type="text" value={pNO.PG_REPEAT_TYPE} name="PG_REPEAT_TYPE" onChange={handleInputChange} />
                    </td>
                </tr>
                <tr>
                    <th style={{ width: '30%' }}>강사</th>
                    <td style={{ width: '30%' }}>
                        <FormControl type="text" value={pNO.PG_TEACHER} name="PG_TEACHER" onChange={handleInputChange} />
                    </td>
                    <th style={{ width: '30%' }}>요일</th>
                    <td style={{ width: '30%' }}>
                        <FormControl type="text" value={pNO.PG_DAYSOFWEEK} name="PG_DAYSOFWEEK" onChange={handleInputChange} />
                    </td>
                </tr>
                <tr>
                    <th style={{ width: '30%' }}>시작일</th>
                    <td style={{ width: '30%' }}>
                        <FormControl
                        type="datetime-local"
                        value={pNO.PG_START ? formatDate(new Date(pNO.PG_START)) : ''}
                        name="PG_START"
                        onChange={(e) => handleInputChange(e, 'PG_START')}
                        />
                    </td>
                    <th style={{ width: '30%' }}>종료일</th>
                    <td style={{ width: '30%' }}>
                        <FormControl
                        type="datetime-local"
                        value={pNO.PG_END ? formatDate(new Date(pNO.PG_END)) : ''}
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
                        value={pNO.PG_CONTENT}
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
