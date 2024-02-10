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
  const eNo = empDetail? empDetail.E_NO : '';
  const eName = empDetail? empDetail.E_NAME : '';
  const eGender = empDetail? empDetail.E_GENDER : '';
  const eBirth = empDetail? empDetail.E_BIRTH : '';
  const ePhone = empDetail? empDetail.E_PHONE : '';
  const eHiredate = empDetail? empDetail.E_HIREDATE : '';
  const eEnddate = empDetail? empDetail.E_ENDDATE : '';
  const eAddress = empDetail? empDetail.E_ADDRESS : '';
  const eAuth = empDetail? empDetail.E_AUTH : '';
  const eEmail = empDetail? empDetail.E_EMAIL : '';
  const eStatus = empDetail? empDetail.E_STATUS : '';
  const eRank = empDetail? empDetail.E_RANK : '';
  const ePassword = empDetail? empDetail.E_PASSWORD : '';
  const deptName = empDetail? empDetail.DEPT_NAME : '';
  const eOccup = empDetail? empDetail.E_OCCUP : '';

  return (
    <div style={{ padding: '20px', borderLeft: '1px solid' }}>
      <h5>직원 상세 정보</h5>
      <div className={styles.empInfoWrap}>
        <div className={styles.empPicture}>사진</div>
        <div className={styles.empInfo1}>
          사원명
          <input type='text' style={{ border: 'none', background: 'transparent', width: '180px', margin: '5px', paddingLeft: '80px' }} value={eName} />
        </div>
        <div className={styles.empInfo2}>
          성별
          <input type='text' style={{ border: 'none', background: 'transparent', margin: '5px', paddingLeft: '50px' }} value={eGender} />
        </div>
        <div className={styles.empInfo3}>
          생년월일
          <input type='date' style={{ border: 'none', background: 'transparent', margin: '5px', paddingLeft: '50px' }} value={eBirth} />
        </div>
        <div className={styles.empInfo4}>
          사원번호
          <input type='text' style={{ border: 'none', background: 'transparent', margin: '5px', paddingLeft: '50px' }} value={eNo} />
        </div>
        <div className={styles.empInfo5}>
          입사일
          <input type='' style={{ border: 'none', background: 'transparent', margin: '5px', paddingLeft: '50px' }} value={eHiredate} />
        </div>
        <div className={styles.empInfo6}>
          퇴사일
          <input type='' style={{ border: 'none', background: 'transparent', margin: '5px', paddingLeft: '50px' }} value={eEnddate} />
        </div>
        <div className={styles.empInfo7}>
          연락처
          <input type='text' style={{ border: 'none', background: 'transparent', margin: '5px', paddingLeft: '50px' }} value={ePhone} />
        </div>
        <div className={styles.empInfo8}>
          이메일
          <input type='text' style={{ border: 'none', background: 'transparent', margin: '5px', paddingLeft: '50px' }} value={eEmail} />
        </div>
        <div className={styles.empInfo9}>
          주소
          <input type='text' style={{ border: 'none', background: 'transparent', width: '510px', margin: '5px', paddingLeft: '50px' }} value={eAddress} />
        </div>
        <div className={styles.empInfo10}>
          부서
          <input type='text' style={{ border: 'none', background: 'transparent', margin: '5px', paddingLeft: '50px' }} value={deptName} />
        </div>
        <div className={styles.empInfo11}>
          비밀번호
          <input type='password' style={{ border: 'none', background: 'transparent', margin: '5px', paddingLeft: '50px' }} value={ePassword} />
        </div>
        <div className={styles.empInfo12}>
          권한
          <input type='text' style={{ border: 'none', background: 'transparent', margin: '5px', paddingLeft: '50px' }} value={eAuth} />
        </div>
        <div className={styles.empInfo13}>
          현황
          <input type='text' style={{ border: 'none', background: 'transparent', margin: '5px', paddingLeft: '50px' }} value={eStatus} />
        </div>
        <div className={styles.empInfo14}>
          직종
          <input type='text' style={{ border: 'none', background: 'transparent', margin: '5px', paddingLeft: '50px' }} value={eOccup} />
        </div>
        <div className={styles.empInfo15}>
          직급
          <input type='text' style={{ border: 'none', background: 'transparent', margin: '5px', paddingLeft: '50px' }} value={eRank} />
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

