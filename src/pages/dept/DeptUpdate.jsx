import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./dept.module.css";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  DeptCheckDB,
  DeptListDB,
  DeptUpdateDB,
} from "../../services/api/deptApi";
import { setDeptDetail } from "../../redux/deptSlice";

const DeptUpdate = ({ handlepage, handleRefresh }) => {
  const dispatch = useDispatch();
  const empData = useSelector((state) => state.userInfoSlice);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const data = useSelector((state) => state.deptDetail.value);
  console.log(data);
  //부서코드 중복검사
  const [cd, setCd] = useState("");
  const [checkcd, setCheckcd] = useState(true);
  const handleCd = (cd) => {
    console.log(cd);
    setCheckcd(false);
    setCd(cd);
  };
  const handleCheck = async () => {
    console.log("deptCheck 호출");
    const data = {
      CD: cd,
    };
    const response = await DeptCheckDB(data);

    console.log(response.data);
    console.log(cd);

    if (cd === "") {
      alert("값을 입력해주세요.");
      setCheckcd(false);
    } else if (response.data === 1) {
      alert("중복된 값이 없습니다.");
      setCheckcd(true);
    } else if (response.data === 0) {
      alert("중복된 값이 있습니다.");
      setCheckcd(false);
    }
  };

  //부서명 중복검사
  const [name, setName] = useState("");
  const [checkname, setCheckname] = useState(true);
  const handleName = (name) => {
    console.log(name);
    setCheckname(false);
    setName(name);
  };
  const handleCheckname = async () => {
    console.log("handleCheckname 호출");
    const data = {
      CD_VALUE: name,
    };
    const response = await DeptCheckDB(data);

    console.log(response.data);
    console.log(cd);

    if (name === "") {
      alert("값을 입력해주세요");
      setCheckname(false);
    } else if (response.data === 1) {
      alert("중복된 값이 없습니다");
      setCheckname(true);
    } else if (response.data === 0) {
      alert("중복된 값이 있습니다");
      setCheckname(false);
    }
  };

  //부서수정
  const onSubmit = async (values) => {
    console.log("수정버튼 클릭");
    console.log(values);
    const value = {
      B_CD: data.CD,
      CD: values.CD,
      B_CD_VALUE: data.CD_VALUE,
      CD_VALUE: values.CD_VALUE,
      EXT: data.EXT,
      EXT_VALUE: values.EXT_VALUE,
      MOD_ID: empData.e_no,
    };
    console.log(value);
    if (checkcd === true) {
      console.log("체크완료");
      const response = await DeptUpdateDB(value);
      alert("수정이 완료되었습니다.");
      dispatch(setDeptDetail(value));
      handleRefresh();
      handlepage();
    } else alert("중복검사를 진행해주세요.");
  };

  return (
    <div className={styles.detailContainer}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.pageHeader}>
          <Row>
            <Col md={20}>
              <h5>부서수정</h5>
            </Col>
            <Col md={2}>
              <Button variant="outline-danger" size="sm" onClick={handlepage}>
                취소
              </Button>
            </Col>
            <Col md={2}>
              <Button type="submit" variant="outline-dark" size="sm">
                수정
              </Button>
            </Col>
          </Row>
          <hr />
        </div>
        <div>
          <Form.Label>부서코드</Form.Label>
          <Row gutter={15}>
            <Col>
              <Form.Control
                style={{ width: "150px", marginBottom: "10px" }}
                {...register("CD", {
                  required: "* 부서코드를 입력해주세요.",
                  onChange: (e) => handleCd(e.target.value),
                })}
                name="CD"
                type="text"
                defaultValue={data.CD}
              />
            </Col>
            <Col>
              <MyButton type="button" onClick={handleCheck}>
                중복검사
              </MyButton>
            </Col>
            <Col>
              {checkcd === false ? (
                <CheckBefore>* 중복 미확인</CheckBefore>
              ) : (
                <CheckAfter>* 중복 확인</CheckAfter>
              )}
            </Col>
          </Row>
          <Error>{errors?.CD?.message}</Error>
          <Form.Label>부서명</Form.Label>
          <Row gutter={15}>
            <Col>
              <Form.Control
                style={{ width: "150px", marginBottom: "10px" }}
                {...register("CD_VALUE", {
                  required: "* 부서명을 입력해주세요.",
                  onChange: (e) => handleName(e.target.value),
                })}
                name="CD_VALUE"
                type="text"
                defaultValue={data.CD_VALUE}
              />
            </Col>
            <Col>
              <MyButton type="button" onClick={handleCheckname}>
                중복검사
              </MyButton>
            </Col>
            <Col>
              {checkname === false ? (
                <CheckBefore>* 중복 미확인</CheckBefore>
              ) : (
                <CheckAfter>* 중복 확인</CheckAfter>
              )}
            </Col>
          </Row>
          <Error>{errors?.CD_VALUE?.message}</Error>
          <Form.Label>내선번호</Form.Label>
          <Form.Control
            style={{ width: "150px" }}
            {...register("EXT_VALUE", {
              required: "* 내선번호를 입력해주세요.",
            })}
            name="EXT_VALUE"
            type="text"
            defaultValue={data.EXT_VALUE}
          />
          <Error>{errors?.EXT_VALUE?.message}</Error>
        </div>
      </Form>
    </div>
  );
};

export default DeptUpdate;

const MyButton = styled.button`
  margin-top: 10%;
  border-radius: 5px;
  background-color: grey;
  color: white;
`;

const Error = styled.p`
  color: red;
  font-size: 12px;
`;

const CheckBefore = styled.p`
  margin-left: 10px;
  color: red;
  margin-top: 10%;
`;

const CheckAfter = styled.p`
  margin-left: 10px;
  color: #57ed57;
  margin-top: 10%;
`;
