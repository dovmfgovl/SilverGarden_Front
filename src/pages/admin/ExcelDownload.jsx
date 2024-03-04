import React from 'react';
import styled from 'styled-components';
import XLSX from 'xlsx-js-style';

const StyledButton = styled.button`
  margin-bottom: 10px;
  padding: 7px 10px;
  background-color: #477448;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(128, 0, 128, 0.2);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  white-space: nowrap;
  font-size: 0.75rem;
  transform: translateX(5%);

  &:hover {
    transform: translateX(5%) translateY(-3px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ExcelDownload = ({ data, columns, filename, buttonText, buttonStyle }) => {
    const excelDown = async () => {
        try {
            // 데이터가 비어 있는 지 확인
            if (data.length === 0) {
                throw new Error('데이터가 비어 있습니다.');
            }

            // 엑셀 워크북 생성
            const wb = XLSX.utils.book_new();

            // 엑셀 헤더 스타일 정의
            const headerStyle = {
                font: { bold: true, color: { rgb: '000000' }, name: '함초롱바탕', sz: 13 },
                fill: { fgColor: { rgb: 'B588F7' } },
                alignment: { horizontal: 'center', vertical: 'center' },
                border: { left: { style: 'thin', color: { auto: 1 } }, right: { style: 'thin', color: { auto: 1 } }, top: { style: 'thin', color: { auto: 1 } }, bottom: { style: 'thin', color: { auto: 1 } } }
            };

            // 엑셀 데이터 스타일 정의
            const dataStyle = {
                font: { color: { rgb: '000000' }, name: '함초롱바탕', sz: 11 },
                fill: { fgColor: { rgb: 'FFFFFF' } },
                alignment: { horizontal: 'center', vertical: 'center' },
                border: { left: { style: 'thin', color: { auto: 1 } }, right: { style: 'thin', color: { auto: 1 } }, top: { style: 'thin', color: { auto: 1 } }, bottom: { style: 'thin', color: { auto: 1 } } }
            };

            // 각 열의 폭 정의
            const colWidths = columns.map(width => ({ wpx: width }));
            const cols = colWidths.map(width => ({ wpx: width }));

            // 헤더 행 생성
            const headerRow = columns.map((column, index) => ({ v: column, t: 's', s: headerStyle }));

            // 데이터 행 생성
            const dataRows = data.map(item => columns.map(column => ({ v: item[column] || '', t: 's', s: item[column] ? dataStyle : dataStyle })));

            // 모든 행 결합
            const rows = [headerRow, ...dataRows];
            const ws = XLSX.utils.aoa_to_sheet(rows);

            // 열 너비 설정
            ws['!cols'] = cols;
            // 워크북에 시트 추가
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            // 파일 다운로드
            XLSX.writeFile(wb, filename);

            console.log('Excel 파일 생성 및 다운로드 완료');
        } catch (error) {
            console.error('Excel 파일 다운로드 중 오류 발생', error);
            alert('Excel 파일 다운로드 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <StyledButton onClick={excelDown}>
            {buttonText}
        </StyledButton>
    );
};

export default ExcelDownload;