import React from "react";
import { useDispatch } from "react-redux";
import { setDetail } from "../../../redux/carSlice";

const CarRow = ({car}) => {
   const dispatch= useDispatch();

  const handleRowClick = () => {
    dispatch(setDetail(car))
  };

  return (
    <>
              <tr  style={{ cursor: 'pointer' }} onClick={handleRowClick}>
                <td className='text-center'>{car.SHUTTLE_TYPE}</td>
                <td className='text-center'>{car.SHUTTLE_CARNUM}</td>
                <td className='text-center'>{car.SHUTTLE_DRIVER}</td>
              </tr>
    </>
  );
};


export default CarRow;
