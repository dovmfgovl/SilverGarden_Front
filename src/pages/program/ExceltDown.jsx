import React from 'react';
import XLSX from 'xlsx-js-style';
import { programListDB } from '../../services/api/programApi';

const ExcelForm = () => {
  const excelDown = async () => {
    try {
      console.log('excelDown 호출');

      // 서버에서 직원 리스트 가져오기
      const res = await programListDB();
      const excelData = res.data;
      console.log(excelData);

      // Excel 파일 생성 및 다운로드
      const wb = XLSX.utils.book_new();
      const headerStyle = {
        font: { bold: true, color: { rgb: '000000' }, name: '함초롱바탕', sz: 13 },
        fill: { fgColor: { rgb: 'BC8F8F' } },
        alignment: { horizontal: 'center', vertical: 'center' },
        border: { left: { style: 'thin', color: { auto: 1 } }, right: { style: 'thin', color: { auto: 1 } }, top: { style: 'thin', color: { auto: 1 } }, bottom: { style: 'thin', color: { auto: 1 } } }
      };
      const dataStyle = {
        font: { color: { rgb: '000000' }, name: '함초롱바탕', sz: 11 },
        fill: { fgColor: { rgb: 'FFFAFA' } },
        alignment: { horizontal: 'center', vertical: 'center' },
        border: { left: { style: 'thin', color: { auto: 1 } }, right: { style: 'thin', color: { auto: 1 } }, top: { style: 'thin', color: { auto: 1 } }, bottom: { style: 'thin', color: { auto: 1 } } }
      };

      // 열의 폭을 정의
      const colWidths = [80, 120, 80, 80, 130];

      // cols 속성을 사용하여 각 열의 폭을 조절
      const cols = colWidths.map(width => ({ wpx: width }));

      const headerRow = [
        { v: '프로그램번호', t: 's', s: headerStyle },
        { v: '프로그램명', t: 's', s: headerStyle },
        { v: '프로그램 시작', t: 's', s: headerStyle },
        { v: '프로그램 종료', t: 's', s: headerStyle },
        { v: '프로그램 요일', t: 's', s: headerStyle },
        { v: '프로그램 구분', t: 's', s: headerStyle },
        { v: '프로그램 강사', t: 's', s: headerStyle },
        { v: '프로그램 내용', t: 's', s: headerStyle },
      ];

      const dataRows = excelData.map(pg => [
        { v: pg.PG_NO, t: 's', s: dataStyle },  
        { v: pg.PG_NAME, t: 's', s: dataStyle },  
        { v: pg.PG_START, t: 's', s: dataStyle },  
        { v: pg.PG_END, t: 's', s: dataStyle },  
        { v: pg.PG_DAYSOFWEEK, t: 's', s: dataStyle },  
        { v: pg.PG_CATEGORY, t: 's', s: dataStyle },  
        { v: pg.PG_TEACHER, t: 's', s: dataStyle },  
        { v: pg.PG_CONTENT, t: 's', s: dataStyle },  
      ]);

      const rows = [headerRow, ...dataRows];

      // 새로운 Sheet 객체 생성
      const ws = XLSX.utils.aoa_to_sheet(rows);

      // cols 속성 적용
      ws['!cols'] = cols;

      // workbook에 추가
      XLSX.utils.book_append_sheet(wb, ws, '프로그램 목록');

      // 파일 다운로드
      XLSX.writeFile(wb, 'ProgramList.xlsx');

      console.log('Excel 파일 생성 및 다운로드 완료');
    } catch (error) {
      console.error('Error occurred while downloading Excel', error);
    }
  };

  return (
    <>
        <button 
        className="btn btn-outline-success"
        style={{minWidth: '10%', marginRight: '0.5rem'}}
        onClick={excelDown}
        >
        엑셀
        </button>
    </>
  );
};

export default ExcelForm;