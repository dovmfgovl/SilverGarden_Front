const EmpEduRow = ({ edu, editing, handleInputChange }) => {
  const { period, name, major, status, label } = edu;

  const handleChange = (e) => {
    const { name, value } = e; // e에서 바로 name과 value 추출
    if (name && value) {
      handleInputChange({ name: `${label}_${name}`, value });
    }
  };  

  return (
    <tr>
      <td>
        <input
          type="text"
          value={period || ''}
          onChange={handleChange}
          readOnly={!editing}
          name="period"
        />
      </td>
      <td>
        <input
          type="text"
          value={name || ''}
          onChange={handleChange}
          readOnly={!editing}
          name="name"
        />
      </td>
      <td>
        <input
          type="text"
          value={major || ''}
          onChange={handleChange}
          readOnly={!editing}
          name="major"
        />
      </td>
      <td>
        <input
          type="text"
          value={status || ''}
          onChange={handleChange}
          readOnly={!editing}
          name="status"
        />
      </td>
    </tr>
  );
};

export default EmpEduRow;