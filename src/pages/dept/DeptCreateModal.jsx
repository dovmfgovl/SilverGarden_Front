import { Col, Collapse, Row } from "antd";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { DeptCheckDB, DeptInsertDB } from "../../services/api/deptApi";
import { useSelector } from "react-redux";

const DeptCreateModal = ({ handleRefresh }) => {
  const empData = useSelector((state) => state.userInfoSlice);
  const {
    setValue,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  //부서코드 중복검사
  const [cd, setCd] = useState("");
  const [checkcd, setCheckcd] = useState(false);
  const handleCd = (cd) => {
    console.log(cd);
    setCheckcd(false);
    setCd(cd);
  };
  const handleCheckcd = async () => {
    console.log("deptCheck 호출");
    const data = {
      CD: cd,
    };
    const response = await DeptCheckDB(data);

    console.log(response.data);
    console.log(cd);

    if (cd === "") {
      alert("값을 입력해주세요");
      setCheckcd(false);
    } else if (response.data === 1) {
      alert("중복된 값이 없습니다");
      setCheckcd(true);
    } else if (response.data === 0) {
      alert("중복된 값이 있습니다");
      setCheckcd(false);
    }
  };

  //부서명 중복검사
  const [name, setName] = useState("");
  const [checkname, setCheckname] = useState(false);
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

  //부서등록
  const onSubmit = async (values) => {
    console.log(values);
    if (checkcd === true) {
      const value = {
        CD: values.CD,
        CD_VALUE: values.CD_VALUE,
        EXT: values.EXT,
        EXT_VALUE: values.EXT_VALUE,
        REG_ID: empData.e_no,
        MOD_ID: empData.e_no,
      };
      const response = await DeptInsertDB(value);
      console.log(response.data);
      alert("부서가 등록되었습니다");
      handleClose();
      handleRefresh();
    } else alert("중복검사를 진행해주세요");
  };

  ///모달
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setCheckcd(false);
    reset();
  };
  const handleShow = () => {
    console.log("handleShow클릭");
    setShow(true);
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        부서등록
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>부서등록팝업</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div>
              <div>
                <Row style={{ columnGap: "10px" }}>
                  <Col>
                    <Form.Label>부서코드</Form.Label>
                    <Form.Control
                      style={{ width: "150px" }}
                      {...register("CD", {
                        required: "* 부서코드를 입력해주세요.",
                        onChange: (e) => handleCd(e.target.value),
                      })}
                      name="CD"
                      type="text"
                    />
                    <Error>{errors?.CD?.message}</Error>
                  </Col>
                  <Col>
                    <MyButton type="button" onClick={handleCheckcd}>
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
              </div>
              <div>
                <Row style={{ columnGap: "10px" }}>
                  <Col>
                    <Form.Label>부서명</Form.Label>
                    <Form.Control
                      style={{ width: "150px" }}
                      {...register("CD_VALUE", {
                        required: "* 부서명을 입력해주세요.",
                        onChange: (e) => handleName(e.target.value),
                      })}
                      name="CD_VALUE"
                      type="text"
                    />
                    <Error>{errors?.CD_VALUE?.message}</Error>
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
              </div>
              <div>
                <Row style={{ columnGap: "10px" }}>
                  <Col>
                    <Form.Label>내선번호</Form.Label>
                    <Form.Control
                      style={{ width: "150px" }}
                      {...register("EXT_VALUE", {
                        required: "* 내선번호를 입력해주세요.",
                      })}
                      name="EXT_VALUE"
                      type="text"
                    />
                    <Error>{errors?.EXT_VALUE?.message}</Error>
                  </Col>
                </Row>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              취소
            </Button>
            <Button variant="primary" type="submit">
              등록
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default DeptCreateModal;

const MyButton = styled.button`
  margin-top: 35px;
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
  margin-top: 40%;
`;

const CheckAfter = styled.p`
  margin-left: 10px;
  color: #57ed57;
  margin-top: 40%;
`;
