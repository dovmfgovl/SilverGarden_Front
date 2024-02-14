import React from 'react';

const EmpEduRow = ({ eduPeriod, eduName, eduMajor, eduStatus }) => {
  return (
    <tr>
      <td>{eduPeriod}</td>
      <td>{eduName}</td>
      <td>{eduMajor}</td>
      <td>{eduStatus}</td>
    </tr>
  );
};

export default EmpEduRow