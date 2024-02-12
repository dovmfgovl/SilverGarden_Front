import React from 'react';
import Table from 'react-bootstrap/Table';
import EmpEduRow from './EmpEduRow';

const EmpEdu = ({ empDetail }) => {
  // 각 학력 정보를 배열로 정의
  const educations = [
    { label: '고등학교', period: empDetail?.HIGH_SCHOOL_PERIOD, name: empDetail?.HIGH_SCHOOL_NAME, major: empDetail?.HIGH_SCHOOL_MAJOR, status: empDetail?.HIGH_SCHOOL_STATUS },
    { label: '대학교', period: empDetail?.UNIVERSITY_PERIOD, name: empDetail?.UNIVERSITY_NAME, major: empDetail?.UNIVERSITY_MAJOR, status: empDetail?.UNIVERSITY_STATUS },
    { label: '대학원', period: empDetail?.GRADUATE_SCHOOL_PERIOD, name: empDetail?.GRADUATE_SCHOOL_NAME, major: empDetail?.GRADUATE_SCHOOL_MAJOR, status: empDetail?.GRADUATE_SCHOOL_STATUS }
  ];

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
          {educations.map((edu, index) => (
            <EmpEduRow key={index} eduPeriod={edu.period} eduName={edu.name} eduMajor={edu.major} eduStatus={edu.status} label={edu.label} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmpEdu;