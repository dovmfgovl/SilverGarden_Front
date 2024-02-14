import React from 'react';

const EmpCertiRow = ({ certi_cate, certi_code, certi_issuer, certi_acquire }) => {
  return (
    <tr>
      <td>{certi_cate}</td>
      <td>{certi_code}</td>
      <td>{certi_issuer}</td>
      <td>{certi_acquire}</td>
    </tr>
  );
};

export default EmpCertiRow