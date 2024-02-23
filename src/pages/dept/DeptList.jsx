import React, { useEffect, useState } from "react";
import styles from "./dept.module.css";
import { Button, Form, Table } from "react-bootstrap";
import DeptCreateModal from "./DeptCreateModal";
import { DeptListDB } from "../../services/api/deptApi";
import { useDispatch } from "react-redux";
import { setDeptDetail } from "../../redux/deptSlice";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const DeptList = ({ page, dept, handleRefresh, deptList }) => {
  const dispatch = useDispatch();

  const handleRowClick = (data) => {
    if (page === false) {
      console.log(data);
      dispatch(setDeptDetail(data));
    } else console.log("수정모드입니다");
  };
  //검색기능
  const { handleSubmit, register, reset } = useForm({ mode: "onChange" });

  const handleSearch = (value) => {
    console.log(value);
    deptList(value);
    reset();
  };

  const handleReset = () => {
    deptList();
  };

  return (
    <>
      <div
        className={styles.container}
        style={{ padding: "20px", borderLeft: "none" }}
      >
        <div className={styles.pageHeader}>
          <h5>부서목록</h5>
          <hr />
        </div>
        <Form onSubmit={handleSubmit(handleSearch)}>
          <div className={styles.search}>
            <div className="col-2">
              <select
                id="gubun"
                className="form-select"
                aria-label="분류"
                {...register("gubun")}
              >
                <option defaultValue value="D_CD">
                  부서코드
                </option>
                <option value="D_NAME">부서명</option>
                <option value="D_EXT">내선번호</option>
              </select>
            </div>
            <div className="col-7">
              <input
                {...register("keyword")}
                type="text"
                id="keyword"
                className="form-control"
                placeholder="검색어를 입력하세요"
                aria-label="검색어를 입력하세요"
                aria-describedby="btn_search"
              />
            </div>
            <div className="col-1">
              <Button variant="outline-success" type="submit">
                검색
              </Button>
            </div>
            <div className="col-2">
              <Button variant="outline-warning" onClick={handleReset}>
                전체조회
              </Button>
            </div>
          </div>
        </Form>

        <div className={styles.deptList}>
          <Table responsive>
            <thead>
              <tr>
                <th>부서코드</th>
                <th>부서명</th>
                <th>내선번호</th>
              </tr>
            </thead>
            <tbody>
              {dept &&
                dept.map((item, index) => (
                  <tr key={index} onClick={() => handleRowClick(item)}>
                    <td>{item.CD}</td>
                    <td>{item.CD_VALUE}</td>
                    <td>{item.EXT_VALUE}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <hr />
        <span className={`${styles.deptListFooter} row`}>
          <span className="col-12">
            <DeptCreateModal handleRefresh={handleRefresh} />
          </span>
        </span>
      </div>
    </>
  );
};

export default DeptList;
