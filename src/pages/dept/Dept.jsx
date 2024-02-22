import React, { useEffect, useState } from "react";
import styles from "./dept.module.css";
import DeptList from "./DeptList";
import DeptDetail from "./DeptDetail";
import DeptSideInfo from "./DeptSideInfo";
import DeptUpdate from "./DeptUpdate";
import { DeptListDB } from "../../services/api/deptApi";

const Dept = () => {
  const [page, setPage] = useState(false);
  const handlepage = () => {
    setPage((current) => !current);
  };

  const [dept, setDept] = useState([]);

  const deptList = async (value) => {
    console.log("deptlist호출");
    const response = await DeptListDB(value);
    console.log(response.data);
    setDept(response.data);
  };

  useEffect(() => {
    deptList();
  }, []);

  const handleRefresh = async () => {
    const response = await DeptListDB();
    setDept(response.data);
  };

  return (
    <>
      <div className={styles.innerDeptWrap}>
        <div className={styles.deptListWrap}>
          <DeptList
            page={page}
            handleRefresh={handleRefresh}
            dept={dept}
            deptList={deptList}
          />
        </div>
        <div className={styles.deptDetailWrap}>
          {page === true ? (
            <DeptUpdate handlepage={handlepage} handleRefresh={handleRefresh} />
          ) : (
            <DeptDetail handlepage={handlepage} handleRefresh={handleRefresh} />
          )}
        </div>
        <div className={styles.deptSideInfoWrap}>
          <DeptSideInfo handleRefresh={handleRefresh} />
        </div>
      </div>
    </>
  );
};

export default Dept;
