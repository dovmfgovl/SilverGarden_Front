import React from 'react';
import ExcelDownload from './ExcelDownload';
import styled from 'styled-components';

const EmpContainer = styled.div`
    /* ===> 개인 css 추가 부분! 필요 시, 각자 페이지에 맞는 위치 선정하세요. */
`

const EmpExcelDownload = ({ empList }) => { /* ==> 엑셀 다운로드 받을 값 props로 가져오세요. */
    const title = '직원 목록'; // 엑셀 내 최상단 제목 ==> 원하는 제목으로 입력하세요.
    const header = ['사원번호', '현황', '사원명', '부서', '직급', '전화번호']; // 헤더 정보 ===> 원하는 헤더로 입력하세요.
    const fileName = 'Employee List' // 엑셀 파일명 ===> 원하는 엑셀 파일명으로 입력하세요.

    // 엑셀 다운로드하고 싶은 데이터 준비
    const excelData = empList.map(data => ({ /* ===> props 입력 : '__'.map */
        [header[0]]: data.E_NO, /* ===> 다운로드 받고 싶은 컬럼 입력하세요. header[x] : 배열 수 만큼 추가! */
        [header[1]]: data.E_STATUS,
        [header[2]]: data.E_NAME,
        [header[3]]: data.DEPT_NAME,
        [header[4]]: data.E_RANK,
        [header[5]]: data.E_PHONE
    }));
    
    return (
        <EmpContainer>
            <ExcelDownload 
            title={title} // 엑셀 내 최상단 제목
            header={header} // 헤더 정보
            data={excelData} // 데이터
            fileName={fileName} // 엑셀 파일명
            colWidths={[150, 100, 120, 120, 120, 150]} // 열의 폭 ===> 필요 시, 각자 정보에 맞게 너비 조정하세요.
            />
        </EmpContainer>
    );
};

export default EmpExcelDownload;