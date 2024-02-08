import { Col, Radio, Row } from "antd";
import Input from "antd/es/input/Input";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import style from "./loginform.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SigninTokenAPI } from "../../services/auth/AutApi";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  //radio 버튼 설정
  const [value, setValue] = useState("");

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onSubmit = async (values) => {
    console.log(values);

    SigninTokenAPI(values)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem("accessToken", response.accessToken);
        console.log(response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        console.log(response.refreshToken);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className={style.container}>
      <div className={style.child}>
        <div>
          <h3 className={style.header}>SliverGarden</h3>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>ID</Row>
          <Row>
            <Form.Control
              {...register("id", { required: "* 사원번호를 입력해주세요" })}
              className={style.input}
              type="id"
              placeholder="사원번호를 입력해주세요"
            />
          </Row>
          <Row>
            <p className={style.error}>{errors?.id?.message}</p>
          </Row>
          <Row>Password</Row>
          <Row>
            <Form.Control
              {...register("password", {
                required: "* 비밀번호를 입력해주세요",
              })}
              className={style.inputbox}
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
          </Row>
          <Row>
            <p className={style.error}>{errors?.password?.message}</p>
          </Row>
          <div className={style.radio}>
            <Radio.Group
              {...register("role", { required: "* 유형을 선택해주세요" })}
              onChange={onChange}
              value={value}
            >
              <Radio value={"EMPA"}>직원</Radio>
              <Radio value={"ADMIN"}>관리자</Radio>
              <p className={style.error}>{errors?.role?.message}</p>
            </Radio.Group>
          </div>
          <div className={style.button}>
            <Button variant="success" type="submit">
              로그인
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
