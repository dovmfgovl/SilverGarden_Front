import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import EmpCertiRow from './EmpCertiRow';
import EmpCertiInsert from './EmpCertiInsert'; // 새로 추가된 부분
import styles from './empDetailInfo.module.css';

const EmpCerti = ({ empDetail }) => {
  const [certificates, setCertificates] = useState(empDetail ? [empDetail] : []);
  console.log(certificates);

  const handleSaveCertificate = (newCerti) => {
    setCertificates([...certificates, newCerti]);
  };

  return (
    <div className={styles.empBaseInfo}>
      <h5>자격증</h5>
      <Table striped bordered hover className={styles.empBaseTable}>
        <thead>
          <tr>
            <th>자격종류</th>
            <th>자격증번호</th>
            <th>발급기관명</th>
            <th>취득일자</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((certificate) => (
            <EmpCertiRow
              key={certificate.certi_no}
              certi_cate={certificate.certi_cate || ''}
              certi_code={certificate.certi_code || ''}
              certi_issuer={certificate.certi_issuer || ''}
              certi_acquire={certificate.certi_acquire || ''}
            />
          ))}
          <EmpCertiInsert onSave={handleSaveCertificate} /> {/* 새로운 부분 */}
        </tbody>
      </Table>
    </div>
  );
};

export default EmpCerti;