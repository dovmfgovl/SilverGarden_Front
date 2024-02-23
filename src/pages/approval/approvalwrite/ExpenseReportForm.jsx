import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

const ExpenseReportForm = ({handleContent , formContent}) => {
  const [rows, setRows] = useState([
    { id: 1, content:'', amount:'', note:'' },
    { id: 2, content:'', amount:'', note:'' },
    { id: 3, content:'', amount:'', note:'' },
    { id: 4, content:'', amount:'', note:'' },
    { id: 5, content:'', amount:'', note:'' },
    { id: 6, content:'', amount:'', note:'' },
    { id: 7, content:'', amount:'', note:'' },
    { id: 8, content:'', amount:'', note:'' },
    { id: 9, content:'', amount:'', note:'' },
    { id: 10, content:'', amount:'', note:'' },
    { id: 11, content:'총계', amount:'', note:'' },
  ]);

  useEffect(()=>{
    if(formContent){//formContent 있는 경우 -> 임시문서를 수정하는 경우에만 상세페이지 값을 입력해줌
      const rows = JSON.parse(formContent)
      setRows([...rows])
    }
  },[])

  const handleInputChange = (id, target, value) => {
    // 먼저 입력된 값으로 행을 업데이트
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [target]: value };
      }
      return row;
    });
  
    // 금액 컬럼의 변경 여부와 관계없이 모든 금액의 총합을 계산
    const totalAmount = updatedRows.reduce((sum, row) => {
      // id가 11이 아닌 행의 amount를 합산
      if (row.id !== 11 && !isNaN(parseFloat(row.amount))) {
        return sum + parseFloat(row.amount);
      }
      return sum;
    }, 0);
  
    // id 11인 행의 amount를 총합으로 업데이트
    const finalRows = updatedRows.map(row => {
      if (row.id === 11) {
        return { ...row, amount: totalAmount.toString() };
      }
      return row;
    });
  
    console.log(finalRows);
    setRows(finalRows);
    console.log(JSON.stringify(finalRows));
    handleContent(JSON.stringify(finalRows))
  };

  return (
    <Table bordered hover style={{textAlign: "center", margin:0, height:"100%"}}>
    <thead>
      <tr style={{height: "50px"}}>
        <th style={{width: "500px"}}>적요</th>
        <th>금액</th>
        <th>비고</th>
      </tr>
    </thead>
    <tbody>
      {rows.map(row=>
        (
          <>
          <tr key={row.id} style={{height: "calc(100%/11)"}}>
            <td>
              <input type='text' value={row.content} onChange={(e) => handleInputChange(row.id, 'content', e.target.value)}></input>
            </td>
            <td>
              <input type="number" id="amount" name="amount" step="100" min="0"  value={row.amount} onChange={(e) => handleInputChange(row.id, 'amount', e.target.value)}/>
            </td>
            <td>
              <input type='text' value={row.note} onChange={(e) => handleInputChange(row.id, 'note', e.target.value)}></input>
            </td>
          </tr>
          </>
        ))}
    </tbody>
  </Table>
  )
}

export default ExpenseReportForm