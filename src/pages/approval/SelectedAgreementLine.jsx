import React from 'react'
import { Table } from 'react-bootstrap'

const SelectedAgreementLine = ({lineData, handleLineData}) => {
  return (
    <>
    <div>합의</div>
    <Table style={{textAlign:'center'}} className='me-3' striped bordered hover size="sm">
    <thead>
      <tr>
        <th scope="col">순서</th>
        <th scope="col">종류</th>
        <th scope="col">이름</th>
        <th scope="col">직급</th>
        <th scope="col">삭제</th>
      </tr>
    </thead>
    <tbody>
      {lineData.agreement && lineData.agreement.map((agreement, index)=>
      <tr key={agreement.e_no}>
        <td>{index+1}</td>
        <td>{agreement.ap_category}</td>
        <td>{agreement.e_name}</td>
        <td>{agreement.e_rank}</td>
        <td><button type="button" className="btn btn-danger">삭제</button></td>
      </tr>
      )}
    </tbody>
  </Table>
    </>
  )
}

export default SelectedAgreementLine