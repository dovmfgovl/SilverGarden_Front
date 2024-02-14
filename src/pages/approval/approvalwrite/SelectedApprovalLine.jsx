import React from 'react'
import { Table } from 'react-bootstrap'

const SelectedApprovalLine = ({lineData, handleLineData}) => {

  const handleDelete = (e_no) =>{
    if(lineData.approvalLine.length !==0){
      const updatedData = [...lineData.approvalLine.filter((element) => element.e_no !== e_no)]
      
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
      <tr key={approval.e_no}>
        <td>{index+1}</td>
        <td>{approval.ap_category}</td>
        <td>{approval.e_name}</td>
        <td>{approval.e_rank}</td>
        <td><button type="button" className="btn btn-danger" onClick={() => handleDelete(approval.e_no)}>삭제</button></td>
      </tr>
      )}
    </tbody>
  </Table>
    </>
  )
}

export default SelectedApprovalLine