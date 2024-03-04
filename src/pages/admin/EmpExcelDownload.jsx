import React from 'react';
import ExcelDownload from './ExcelDownload';

const EmpExcelDownload = ({ empList }) => {
    console.log("데이터 값: ", empList.toSorted());
    const columns = ['사원번호', '현황', '사원명', '부서', '직급', '전화번호'];
    const filename = 'employee_list.xlsx';
    const buttonText = 'Excel Download';

    // 각 데이터의 항목에 접근하여 적절한 값 가져오기
    const data = empList.map(emp => ({
        '사원번호': emp.E_NO || '',
        '현황': emp.E_STATUS || '',
        '사원명': emp.E_NAME || '',
        '부서': emp.DEPT_NAME || '',
        '직급': emp.E_RANK || '',
        '전화번호': emp.E_PHONE || '',
    }));

    return (
        <ExcelDownload
            data={data}
            columns={columns}
            filename={filename}
            buttonText={buttonText}
            buttonStyle={{ backgroundColor: '#4CAF50', border: 'none', color: 'white', padding: '10px 24px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px', cursor: 'pointer' }}
        />
    );
};

export default EmpExcelDownload;