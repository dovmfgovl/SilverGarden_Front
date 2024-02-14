import React from 'react';
import { Button } from 'react-bootstrap';
import XLSX from 'xlsx-js-style';

const ExcelForm = ({empList}) => {
  const excelDown = async () => {
    try {
      console.log('excelDown 호출');

      /* // 서버에서 직원 리스트 가져오기
      const res = await empListDB();
      const excelData = res.data;
      console.log(excelData); */

      if (empList.length === 0) {
        throw new Error('직원 목록이 비어 있습니다.');
      }

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
      const colWidths = [120 ,80, 120, 80, 80, 130];

      // cols 속성을 사용하여 각 열의 폭을 조절
      const cols = colWidths.map(width => ({ wpx: width }));

      const headerRow = [
        { v: '사원번호', t: 's', s: headerStyle },
        { v: '현황', t: 's', s: headerStyle },
        { v: '사원명', t: 's', s: headerStyle },
        { v: '부서', t: 's', s: headerStyle },
        { v: '직급', t: 's', s: headerStyle },
        { v: '전화번호', t: 's', s: headerStyle },
      ];

      const dataRows = empList.map(emp => [
        { v: emp.E_NO, t: 's', s: dataStyle },  // 사원번호
        { v: emp.E_STATUS, t: 's', s: dataStyle },  // 현황
        { v: emp.E_NAME, t: 's', s: dataStyle },  // 사원명
        { v: emp.DEPT_NAME, t: 's', s: dataStyle },  // 사원명
        { v: emp.E_RANK, t: 's', s: dataStyle },  // 직급
        { v: emp.E_PHONE, t: 's', s: dataStyle },  // 전화번호
      ]);

      const rows = [headerRow, ...dataRows];

      // 새로운 Sheet 객체 생성
      const ws = XLSX.utils.aoa_to_sheet(rows);

      // cols 속성 적용
      ws['!cols'] = cols;

      // workbook에 추가
      XLSX.utils.book_append_sheet(wb, ws, '사원 목록');

      // 파일 다운로드
      XLSX.writeFile(wb, 'employee_list.xlsx');

      console.log('Excel 파일 생성 및 다운로드 완료');
    } catch (error) {
      console.error('Error occurred while downloading Excel', error);
      alert('Excel 파일 다운로드 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <Button variant="success" id="btn_excelDown" onClick={excelDown}>
        Excel Down
      </Button>
    </div>
  );
};

export default ExcelForm;