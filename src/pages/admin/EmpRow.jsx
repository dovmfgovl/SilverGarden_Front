import React from 'react';

const EmpRow = ({emp, oneRow}) => {
    console.log(emp);
    console.log(emp.E_NO);
    return (
        <>
            <tr key={emp.E_NO} onClick={() => oneRow(emp)}>
                <td>{emp.E_NO}</td>
                <td>{emp.E_STATUS}</td>
                <td>
                    {/* <Link to={`/emp/${emp.E_CODE}`} style={{ textDecoration: 'none', color: 'black'}}> */}
                        {emp.E_NAME}
                    {/* </Link> */}
                </td>
                <td>{emp.DEPT_NAME}</td>
                <td>{emp.E_RANK}</td>
                <td>{emp.E_PHONE}</td>
            </tr>
        </>
    )
}

export default EmpRow