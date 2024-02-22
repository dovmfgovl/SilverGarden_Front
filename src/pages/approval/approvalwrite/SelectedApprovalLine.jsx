import React from 'react'
import { Table } from 'react-bootstrap'

const SelectedApprovalLine = ({lineData, handleLineData}) => {

  const handleDelete = (ap_id) =>{
    if(lineData.approvalLine.length !==0){
      const updatedData = [...lineData.approvalLine.filter((element) => element.ap_id !== ap_id)]
      
      handleLineData({...lineData, approvalLine: updatedData});
    }
  }

  return (
    <>
    <div>결재</div>
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
      {lineData.approvalLine && lineData.approvalLine.map((approval, index)=>
      <tr key={approval.ap_id}>
        <td>{index+1}</td>
        <td>{approval.ap_category}</td>
        <td>{approval.ap_name}</td>
        <td>{approval.ap_rank}</td>
        <td><button type="button" className="btn btn-danger" onClick={() => handleDelete(approval.ap_id)}>삭제</button></td>
      </tr>
      )}
    </tbody>
  </Table>
    </>
  )
}

export default SelectedApprovalLine