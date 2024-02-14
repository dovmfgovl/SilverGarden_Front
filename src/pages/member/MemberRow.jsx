import React from "react";
import { Table } from "react-bootstrap";

const MemberRow = ({ memberList, onClickRow }) => {
  const handleRowClick = (userId) => {
    onClickRow(userId); // 클릭한 특정 멤버의 ID를 부모 컴포넌트로 전달
  };

  return (
    <>
      <div className="col border border-white border-2" style={{ background: 'hsl(193, 6%, 88%)' }}>
        <Table striped bordered hover>
          <thead style={{ background: 'hsl(193, 52%, 88%)' }}>
            <tr>
              <th className='text-center'>이름</th>
              <th className='text-center'>생년월일</th>
              <th className='text-center'>담당자</th>
            </tr>
          </thead>
          <tbody>
            {memberList.map((member, index) => (
              <tr key={member.CLIENT_ID} onClick={() => handleRowClick(member.CLIENT_ID)} style={{ cursor: 'pointer' }}>
                <td className='text-center'> <h6 className="pe-auto">{member.CLIENT_NAME} </h6></td>
                <td className='text-center'> <h6 className="pe-auto">{member.CLIENT_BIRTH}</h6></td>
                <td className='text-center'> <h6 className="pe-auto">{member.CLIENT_MANAGER}</h6></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};


export default MemberRow;
