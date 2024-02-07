import React from "react";

const MemberRow2 = ({ userList, onClickRow }) => {
  console.log(userList);

  const handleRowClick = () => {
    onClickRow(userList.U_NUM);
  };

  return (
    <>
      <tr className='' onClick={handleRowClick} style={{cursor:'pointer'}}>
        <td className='text-center'><h6 className="pe-auto">{userList.U_NUM}</h6></td>
        <td className='text-center'> <h6 className="pe-auto">{userList.U_NAME} </h6></td>
        <td className='text-center'> <h6 className="pe-auto">{userList.U_STATUS}</h6></td>
        <td className='text-center'> <h6 className="pe-auto">{userList.U_BIRTH}</h6></td>
        <td className='text-center'> <h6 className="pe-auto">{userList.U_AGE}</h6></td>
        <td className='text-center'> <h6 className="pe-auto">{userList.U_MANAGER}</h6></td>
      </tr>
    </>
  );
};

export default MemberRow2;
