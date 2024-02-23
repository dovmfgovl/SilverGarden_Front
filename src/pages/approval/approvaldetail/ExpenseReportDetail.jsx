import React from 'react'
import { Table } from 'react-bootstrap'

const ExpenseReportDetail = ({value}) => {
  const rows = JSON.parse(value)

  return (
    <Table bordered style={{textAlign: "center", margin:0}}>
    <thead>
      <tr>
        <th style={{width: "500px"}}>적요</th>
        <th>금액</th>
        <th>비고</th>
      </tr>
    </thead>
    <tbody>
      {rows && rows.map(row=>
        (
          <>
          <tr key={row.id} style={{height: "50px"}}>
            <td>{row.content}</td>
            <td>{row.amount}</td>
            <td>{row.note}</td>
          </tr>
          </>
        ))}
    </tbody>
  </Table>
  )
}

export default ExpenseReportDetail