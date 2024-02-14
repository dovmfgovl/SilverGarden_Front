const EmpEduRow = ({ edu, editing, handleInputChange }) => {
  const { period, name, major, status, label } = edu;

  const handleChange = (e) => {
    handleInputChange(e.target.name, e.target.value);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={period || ''}
          onChange={handleChange}
          readOnly={!editing}
          name={`${label}_PERIOD`}
        />
      </td>
      <td>
        <input
          type="text"
          value={name || ''}
          onChange={handleChange}
          readOnly={!editing}
          name={`${label}_NAME`}
        />
      </td>
      <td>
        <input
          type="text"
          value={major || ''}
          onChange={handleChange}
          readOnly={!editing}
          name={`${label}_MAJOR`}
        />
      </td>
      <td>
        <input
          type="text"
          value={status || ''}
          onChange={handleChange}
          readOnly={!editing}
          name={`${label}_STATUS`}
        />
      </td>
    </tr>
  );
};

export default EmpEduRow;