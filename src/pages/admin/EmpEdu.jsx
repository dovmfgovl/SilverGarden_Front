import React from 'react';
import Table from 'react-bootstrap/Table';
import EmpEduRow from './EmpEduRow';

const EmpEdu = ({ empDetail }) => {
  const h_eduPeriod = empDetail? empDetail.HIGH_SCHOOL_PERIOD : '';
  const h_eduName = empDetail? empDetail.HIGH_SCHOOL_NAME : '';
  const h_eduMajor = empDetail? empDetail.HIGH_SCHOOL_MAJOR : '';
  const h_eduStatus = empDetail? empDetail.HIGH_SCHOOL_STATUS : '';
  const u_eduPeriod = empDetail? empDetail.UNIVERSITY_PERIOD : '';
  const u_eduName = empDetail? empDetail.UNIVERSITY_NAME : '';
  const u_eduMajor = empDetail? empDetail.UNIVERSITY_MAJOR : '';
  const u_eduStatus = empDetail? empDetail.UNIVERSITY_STATUS : '';
  const g_eduPeriod = empDetail? empDetail.GRADUATE_SCHOOL_PERIOD : '';
  const g_eduName = empDetail? empDetail.GRADUATE_SCHOOL_NAME : '';
  const g_eduMajor = empDetail? empDetail.GRADUATE_SCHOOL_MAJOR : '';
  const g_eduStatus = empDetail? empDetail.GRADUATE_SCHOOL_STATUS : '';

  return (
    <div style={{ padding: '20px', borderLeft: '1px solid' }}>
      <h5>직원 기초 정보</h5>
      <h5>학력</h5>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>기간</th>
          <th>학교명</th>
          <th>학과명</th>
          <th>졸업구분</th>
        </tr>
      </thead>
        <tbody>
          <EmpEduRow eduPeriod={h_eduPeriod} eduName={h_eduName} eduMajor={h_eduMajor} eduStatus={h_eduStatus} />
          <EmpEduRow eduPeriod={u_eduPeriod} eduName={u_eduName} eduMajor={u_eduMajor} eduStatus={u_eduStatus} />
          <EmpEduRow eduPeriod={g_eduPeriod} eduName={g_eduName} eduMajor={g_eduMajor} eduStatus={g_eduStatus} />
        </tbody>
      </Table>
    </div>
  );
};

export default EmpEdu;