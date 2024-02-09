import React from 'react';
import Table from 'react-bootstrap/Table';

const EmpEdu = ({ empDetail }) => {
  //const eCode = empDetail? empDetail.E_CODE : '';
  const h_eduPeriod = empDetail? empDetail.HIGH_SCHOOL_PERIOD : '';
  const h_eduName = empDetail? empDetail.HIGH_SCHOOL_NAME : '';
  const h_eduMajor = empDetail? empDetail.HIGH_SCHOOL_MAJOR : '';
  const u_eduPeriod = empDetail? empDetail.UNIVERSITY_PERIOD : '';
  const u_eduName = empDetail? empDetail.UNIVERSITY_NAME : '';
  const u_eduMajor = empDetail? empDetail.UNIVERSITY_MAJOR : '';
  const g_eduPeriod = empDetail? empDetail.GRADUATE_SCHOOL_PERIOD : '';
  const g_eduName = empDetail? empDetail.GRADUATE_SCHOOL_NAME : '';
  const g_eduMajor = empDetail? empDetail.GRADUATE_SCHOOL_MAJOR : '';

  return (
    <div style={{ padding: '20px', borderLeft: '1px solid' }}>
      <h5>직원 기초 정보</h5>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>기간</th>
          <th>학교명</th>
          <th>전공</th>
        </tr>
      </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{h_eduPeriod}</td>
            <td>{h_eduName}</td>
            <td>{h_eduMajor}</td>
            
          </tr>
          <tr>
            <td>2</td>            
            <td>{u_eduPeriod}</td>
            <td>{u_eduName}</td>
            <td>{u_eduMajor}</td>            
          </tr>
          <tr>
            <td>3</td>
            <td>{g_eduPeriod}</td>
            <td>{g_eduName}</td>
            <td>{g_eduMajor}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default EmpEdu;