import React from 'react';
import Table from 'react-bootstrap/Table';
import EmpExpRow from './EmpExpRow';

const EmpExp = ({ empDetail }) => {
  const exp_name = empDetail? empDetail.EXP_NAME : '';
  const exp_dept = empDetail? empDetail.EXP_DEPT : '';
  const exp_rank = empDetail? empDetail.EXP_RANK : '';
  const exp_duty = empDetail? empDetail.EXP_DUTY : '';
  const exp_period = empDetail? empDetail.EXP_PERIOD : '';

  return (
    <div style={{ padding: '20px', borderLeft: '1px solid lightgray' }}>
      <h5>경력</h5>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>회사명</th>
          <th>부서</th>
          <th>직급</th>
          <th>담당업무</th>
          <th>재직기간</th>
        </tr>
      </thead>
        <tbody>
          <EmpExpRow exp_name={exp_name} exp_dept={exp_dept} exp_rank={exp_rank} exp_duty={exp_duty} exp_period={exp_period} />
        </tbody>
      </Table>
    </div>
  );
};

export default EmpExp;