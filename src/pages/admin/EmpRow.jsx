import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDetail } from '../../redux/empInfosSlice';

const EmpRow = ({ emp, currentPage, postPerPage, index }) => {
    const dispatch = useDispatch();

    const handleRowClick = () => {
        // Redux 스토어에 선택한 직원의 정보를 설정
        dispatch(setDetail(emp));
    };

    return (
        <>
            <tr key={emp.E_NO} onClick={handleRowClick}>
                <td>{(currentPage - 1) * postPerPage + index + 1}</td>
                <td>{emp.E_NO}</td>
                <td>{emp.E_STATUS}</td>
                <td>{emp.E_NAME}</td>
                <td>{emp.DEPT_NAME}</td>
                <td>{emp.E_RANK}</td>
                <td>{emp.E_PHONE}</td>
            </tr>
        </>
    );
};

export default EmpRow;
