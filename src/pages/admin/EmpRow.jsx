import React from 'react';

const EmpRow = ({emp, oneRow}) => {
    console.log(emp);
    console.log(emp.E_CODE);
    return (
        <>
            <tr key={emp.E_CODE} onClick={() => oneRow(emp)}>
                <td>{emp.E_CODE}</td>
                <td>
                    {/* <Link to={`/emp/${emp.E_CODE}`} style={{ textDecoration: 'none', color: 'black'}}> */}
                        {emp.E_NAME}
                    {/* </Link> */}
                </td>
                <td>{emp.E_CURRENT}</td>
                <td>{emp.E_RANK}</td>
                <td>{emp.E_PHONE}</td>
            </tr>
        </>
    )
}

export default EmpRow