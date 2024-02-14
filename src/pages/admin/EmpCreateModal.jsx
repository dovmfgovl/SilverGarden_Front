import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import createstyle from "./modal.module.css";
import { Col, Row } from "antd";
import { DeptNameDB, SignupAPI } from "../../services/api/empCreateApi";

const EmpCreateModal = () => {
  const [e_password, setPassword] = useState("");
  const [dept, setDept] = useState([]);
  const {
    setValue,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (values) => {
    console.log(values);

    SignupAPI(values)
      .then((response) => {
        reset();
        alert("신규 등록이 완료되었습니다");
        handleClose();
      })
      .catch((error) => {
        alert(error);
      });
  };
  const passwordGenerate = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
    let randomStr = "";
    for (let i = 0; i < 10; i++) {
      let randomIndex = Math.floor(Math.random() * chars.length);
      randomStr += chars[randomIndex];
    }
    console.log(randomStr);
    setPassword(randomStr);
    setValue("e_password", randomStr);
  };

  const deptName = () => {
    console.log("deptName");
    DeptNameDB()
      .then((response) => {
        console.log(response);
        setDept(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ///모달
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    reset();
    setPassword("");
  };
  const handleShow = () => {
    setShow(true);
    deptName();
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        신규등록
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>신규등록팝업</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <div className={createstyle.body}>
              <div className={createstyle.empno}>
                <Form.Label>사원번호</Form.Label>
                <Form.Control
                  style={{ width: "150px" }}
                  type="text"
                  autoFocus
                  maxLength={10}
                  thousandSeparator=","
                  allowNegative={false}
                  defaultValue={"등록 시 자동 생성"}
                  disabled
                />
              </div>
              <div className={createstyle.name}>
                <Form.Label>이름</Form.Label>
                <Form.Control
                  style={{ width: "150px" }}
                  {...register("e_name", {
                    required: "* 이름을 입력해주세요.",
                  })}
                  type="text"
                  autoFocus
                />
                <Error>{errors?.e_name?.message}</Error>
              </div>
              <div className={createstyle.dept}>
                <Form.Label>부서</Form.Label>
                <div>
                  <select style={{ width: "150px" }} {...register("dept_name")}>
                    {dept.map((item) => (
                      <option value={item.CD_VALUE}>{item.CD_VALUE}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={createstyle.password}>
                <Row style={{ columnGap: "10px" }}>
                  <Col>
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                      style={{ width: "150px", backgroundColor: "#E9ECEF" }}
                      {...register("e_password", {
                        required: "* 임시비밀번호를 발급해주세요",
                      })}
                      name="e_password"
                      type="text"
                      defaultValue={e_password}
                      readOnly={true}
                    />
                    <Error>{errors?.e_password?.message}</Error>
                  </Col>
                  <Col>
                    <MyButton type="button" onClick={passwordGenerate}>
                      임시비밀번호발급
                    </MyButton>
                  </Col>
                </Row>
              </div>
              <div className={createstyle.birth}>
                <Form.Label>생년월일</Form.Label>
                <Form.Control
                  style={{ width: "150px" }}
                  {...register("e_birth", {
                    required: "* 생년월일을 입력해주세요.",
                  })}
                  type="date"
                  autoFocus
                  maxLength={10}
                  thousandSeparator=","
                  allowNegative={false}
                />
                <Error>{errors?.e_birth?.message}</Error>
              </div>
              <div className={createstyle.phone}>
                <Form.Label>연락처</Form.Label>
                <Form.Control
                  style={{ width: "150px" }}
                  {...register("e_phone", {
                    required: "* 연락처를 입력해주세요.",
                  })}
                  type="text"
                  autoFocus
                  maxLength={13}
                  thousandSeparator=","
                  allowNegative={false}
                />
                <Error>{errors?.e_phone?.message}</Error>
              </div>
              <div className={createstyle.email}>
                <Form.Label>이메일</Form.Label>
                <Form.Control
                  style={{ width: "150px" }}
                  {...register("e_email", {
                    required: "* 이메일을 입력해주세요.",
                  })}
                  type="text"
                  autoFocus
                  maxLength={20}
                  thousandSeparator=","
                  allowNegative={false}
                />
                <Error>{errors?.e_email?.message}</Error>
              </div>
              <div className={createstyle.role}>
                <Form.Label>권한</Form.Label>
                <div>
                  <select style={{ width: "150px" }} {...register("e_auth")}>
                    <option selected value="USERA">
                      USERA
                    </option>
                    <option value="USERB">USERB</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
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

export default EmpCreateModal;

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
