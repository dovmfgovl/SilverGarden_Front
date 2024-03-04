import React from 'react';
import ExcelDownload from './ExcelDownload';

const EmpExcelDownload = ({ empList }) => {
    const columns = ['사원번호', '현황', '사원명', '부서', '직급', '전화번호'];
    const filename = 'employee_list.xlsx';
    const buttonText = 'Excel Download';

    return (
        <ExcelDownload
            data={empList}
            columns={columns}
            filename={filename}
            buttonText={buttonText}
            buttonStyle={{ backgroundColor: '#4CAF50', border: 'none', color: 'white', padding: '10px 24px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '4px 2px', cursor: 'pointer' }}
        />
    );
};

export default EmpExcelDownload;