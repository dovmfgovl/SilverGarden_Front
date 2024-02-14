import React from 'react';

const EmpExpRow = ({ exp_name, exp_dept, exp_rank, exp_duty, exp_period }) => {
  return (
    <tr>
      <td>{exp_name}</td>
      <td>{exp_dept}</td>
      <td>{exp_rank}</td>
      <td>{exp_duty}</td>
      <td>{exp_period}</td>
    </tr>
  );
};

export default EmpExpRow