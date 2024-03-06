import React from 'react';
import styled from 'styled-components';
import XLSX from 'xlsx-js-style';

const Button = styled.button`
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

    &:hover {
    transform: translateX(5%) translateY(-3px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

const ExcelDownload = ({ title, data, fileName, header, colWidths }) => {
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
                fill: { fgColor: { rgb: 'cccccc' } },
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

            
            // 엑셀 제목 스타일 정의
            const titleStyle = {
                font: { bold: true, color: { rgb: '000000' }, name: '함초롱바탕', sz: 15 },
                fill: { fgColor: { rgb: 'B588F7' } },
                alignment: { horizontal: 'center', vertical: 'center' },
                border: { left: { style: 'thin', color: { auto: 1 } }, right: { style: 'thin', color: { auto: 1 } }, top: { style: 'thin', color: { auto: 1 } }, bottom: { style: 'thin', color: { auto: 1 } } }
            };

            // 엑셀 시트 생성
            const ws = XLSX.utils.aoa_to_sheet([]);

            // A1 위치에 제목 넣기
            ws['A1'] = { v: title, s: titleStyle }; // 제목이 들어갈 셀 좌표 / 제목 값 및 스타일 적용
            const titleCellRange = { s: { r: 0, c: 0 }, e: { r: 0, c: header.length - 1 } }; // 제목이 들어갈 셀 범위
            ws['!merges'] = [{ s: titleCellRange.s, e: titleCellRange.e }]; // 제목이 들어간 셀 병합

            // A2 위치에 헤더 값 넣기
            const headerRow = header.map((label, index) => ({ v: label, t: 's', s: headerStyle }));
            XLSX.utils.sheet_add_aoa(ws, [headerRow], { origin: 'A2' });

            // A2 위치에 데이터 값 넣기
            const dataRows = data.map(row => header.map(label => ({ v: row[label] || '', t: 's', s: dataStyle })));
            XLSX.utils.sheet_add_aoa(ws, dataRows, { origin: 'A3' });

            // 열의 폭 설정
            const cols = colWidths.map(width => ({ wpx: width }));
            
            //XLSX.utils.sheet_add_aoa(ws, rows);
            ws['!cols'] = cols;
            
            // 워크북에 시트 추가
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            
            // 파일 다운로드
            XLSX.writeFile(wb, `${fileName}.xlsx`);
            } catch (error) {
                console.error('엑셀 다운로드 중 오류 발생', error);
                alert('엑셀 파일을 다운로드하는 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        };

    return (
        <Button onClick={excelDown}>
            Excel Download
        </Button>
    );
};

export default ExcelDownload;