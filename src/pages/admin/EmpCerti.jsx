import React from 'react';
import Table from 'react-bootstrap/Table';
import EmpCertiRow from './EmpCertiRow';
import styles from './empDetailInfo.module.css';

const EmpCerti = ({ empDetail }) => {
  const certi_cate = empDetail? empDetail.CERTI_CATE : '';
  const certi_code = empDetail? empDetail.CERTI_CODE : '';
  const certi_issuer = empDetail? empDetail.CERTI_ISSUER : '';
  const certi_acquire = empDetail? empDetail.CERTI_ACQUIRE : '';

  return (
    <div className={styles.empBaseInfo}>
      <h5>자격증</h5>
      <Table striped bordered hover className={styles.empBaseTable} >
      <thead>
        <tr>
          <th>자격종류</th>
          <th>자격증번호</th>
          <th>발급기관명</th>
          <th>취득일자</th>
        </tr>
      </thead>
        <tbody>
          <EmpCertiRow certi_cate={certi_cate} certi_code={certi_code} certi_issuer={certi_issuer} certi_acquire={certi_acquire} />
        </tbody>
      </Table>
    </div>
  );
};

export default EmpCerti;