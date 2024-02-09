/* import React from 'react';
import Table from 'react-bootstrap/Table';

const EmpDetail = ({ emp }) => {
  return (
    <div>
      <h5>직원 상세 정보</h5>
      <Table striped bordered hover>
        <tbody>
          {emp && Object.entries(emp).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmpDetail; */

import React from 'react';
import Table from 'react-bootstrap/Table';
import styles from './empDetailInfo.module.css'

const EmpDetail = ({ empDetail }) => {
  const eCode = empDetail? empDetail.E_CODE : '';
  const eName = empDetail? empDetail.E_NAME : '';
  const eGender = empDetail? empDetail.E_GENDER : '';
  const ePhone = empDetail? empDetail.E_PHONE : '';
  const eJoin = empDetail? empDetail.E_JOIN : '';
  const eLeave = empDetail? empDetail.E_LEAVE : '';
  const eAddress = empDetail? empDetail.E_ADDRESS : '';
  const eAuthority = empDetail? empDetail.E_AUTHORITY : '';
  const eEmail = empDetail? empDetail.E_EMAIL : '';
  const eCurrent = empDetail? empDetail.E_CURRENT : '';
  const eRank = empDetail? empDetail.E_RANK : '';
  const ePassword = empDetail? empDetail.E_PASSWORD : '';
  const eTerm = empDetail? empDetail.E_TERM : '';

  return (
    <div style={{ padding: '20px', borderLeft: '1px solid' }}>
      <h5>직원 상세 정보</h5>
      <div className={styles.empInfoWrap}>
        <div className={styles.empPicture}>empPicture</div>
        <div className={styles.empInfo1}>
          empInfo1</div>
        <div className={styles.empInfo2}>empInfo2</div>
        <div className={styles.empInfo3}>
        empInfo3
        </div>
        <div className={styles.empInfo4}>
        empInfo4
        </div>
        <div className={styles.empInfo5}>
        empInfo5
        </div>
        <div className={styles.empInfo6}>
        empInfo6
        </div>
        <div className={styles.empInfo7}>
        empInfo7
        </div>
        <div className={styles.empInfo8}>
        empInfo8
        </div>
        <div className={styles.empInfo9}>
        empInfo9
        </div>
        <div className={styles.empInfo10}>
        empInfo10
        </div>
        <div className={styles.empInfo11}>
        empInfo11
        </div>
        <div className={styles.empInfo12}>
        empInfo12
        </div>
        <div className={styles.empInfo13}>
        empInfo13
        </div>
        <div className={styles.empInfo14}>
        empInfo14
        </div>
        <div className={styles.empInfo15}>
        empInfo15
        </div>
        <div className={styles.empInfo16}>
        empInfo16
        </div>
        <div className={styles.empInfo17}>
        empInfo17
        </div>
      </div>




      {/* <Table striped bordered hover>
        <tbody>
          <tr>
            <td>사원번호</td>
            <td>{eCode}</td>
          </tr>
          <tr>
            <td>사원명</td>
            <td>{eName}</td>
          </tr>
          <tr>
            <td>성별</td>
            <td>{eGender}</td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>{ePhone}</td>
          </tr>
          <tr>
            <td>입사일</td>
            <td>{eJoin}</td>
          </tr>
          <tr>
            <td>퇴사일</td>
            <td>{eLeave}</td>
          </tr>
          <tr>
            <td>주소</td>
            <td>{eAddress}</td>
          </tr>
          <tr>
            <td>권한</td>
            <td>{eAuthority}</td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>{eEmail}</td>
          </tr>
          <tr>
            <td>현황</td>
            <td>{eCurrent}</td>
          </tr>
          <tr>
            <td>직급</td>
            <td>{eRank}</td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td>{ePassword}</td>
          </tr>
          <tr>
            <td>계약기간</td>
            <td>{eTerm}</td>
          </tr>
        </tbody>
      </Table> */}
    </div>
  );
};

export default EmpDetail;

