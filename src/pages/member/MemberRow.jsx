import React from "react";
import { Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setDetail } from "../../redux/memberSlice";

const MemberRow = ({member}) => {
  const dispatch= useDispatch();

  const handleRowClick = () => {
   dispatch(setDetail(member))
  };

  return (
    <>
              <tr  style={{ cursor: 'pointer' }} onClick={handleRowClick}>
                <td className='text-center'>{member.CLIENT_NAME}</td>
                <td className='text-center'>{member.CLIENT_BIRTH}</td>
                <td className='text-center'>{member.CLIENT_MANAGER}</td>
              </tr>
    </>
  );
};


export default MemberRow;
