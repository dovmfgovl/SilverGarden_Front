import styles from './empDetailInfo.module.css';

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
          defaultValue={period || ''}
          onChange={(e) => handleChange(e, `${label}_PERIOD`)}
          readOnly={!editing}
          name={`${label}_PERIOD`}
          className={styles.eduInput}
        />
      </td>
      <td>
        <input
          type="text"
          defaultValue={name || ''}
          onChange={(e) => handleChange(e, `${label}_NAME`)}
          readOnly={!editing}
          name={`${label}_NAME`}
          className={styles.eduInput}
        />
      </td>
      <td>
        <input
          type="text"
          defaultValue={major || ''}
          onChange={(e) => handleChange(e, `${label}_MAJOR`)}
          readOnly={!editing}
          name={`${label}_MAJOR`}
          className={styles.eduInput}
        />
      </td>
      <td>
        <input
          type="text"
          defaultValue={status || ''}
          onChange={(e) => handleChange(e, `${label}_STATUS`)}
          readOnly={!editing}
          name={`${label}_STATUS`}
          className={styles.eduInput}
        />
      </td>
    </tr>
  );
};

export default EmpEduRow;