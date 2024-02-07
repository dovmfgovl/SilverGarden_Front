import React from 'react';
import CounselDetail from './CounselDetail';


const CounselRow = () => {
  
  return (
    <>
      <tr className='' style={{ cursor: 'pointer' }} >
        <td className='text-center'><h6 className="pe-auto"></h6></td>
        <td className='text-center'> <h6 className="pe-auto"></h6></td>
        <td className='text-center'> <h6 className="pe-auto"></h6></td>
        <td className='text-center'> <h6 className="pe-auto"></h6></td>
        <CounselDetail  />
      </tr>
    </>
  );
}

export default CounselRow;