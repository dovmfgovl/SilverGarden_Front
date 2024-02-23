import { Col, Radio, Row } from "antd";
import Input from "antd/es/input/Input";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import style from "./loginform.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SigninTokenAPI } from "../../services/auth/AutApi";
import { useDispatch, useSelector } from "react-redux";
import userInfoSlice from "../../redux/userInfoSlice";
import styled from "styled-components";
import Home from "../home/Home";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (values) => {
    console.log(values);

    SigninTokenAPI(values)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        console.log(response);
        dispatch(
          userInfoSlice.actions.setEmpInfo({
            e_no: response.e_no,
            e_name: response.e_name,
            e_profile: response.e_profile,
            dept_name: response.dept_name,
            e_rank: response.e_rank,
          })
        );
          navigate("home");
      })
      .catch((error) => {
        alert("아이디 혹은 비밀번호를 올바르게 입력해주세요.");
      });
  };

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return <Navigate to="/home" />;
  }

  return (
    <div className={style.container}>
      <div className={style.child}>
        <div>
          <h3 className={style.header}>SliverGarden</h3>
        </div>
        <div className={style.inputbox}>
          <Form onSubmit={handleSubmit(onSubmit)} className={style.loginForm}>
            <Row>ID</Row>
            <Row>
              <Form.Control
                {...register("e_no", { required: "* 사원번호를 입력해주세요" })}
                className={style.input}
                type="text"
                placeholder="사원번호를 입력해주세요"
              />
            </Row>
            <Row>
              <p className={style.error}>{errors?.e_no?.message}</p>
            </Row>
            <Row>Password</Row>
            <Row>
              <Form.Control
                {...register("e_password", {
                  required: "* 비밀번호를 입력해주세요",
                })}
                className={style.input}
                type="password"
                placeholder="비밀번호를 입력해주세요"
              />
            </Row>
            <Row>
              <p className={style.error}>{errors?.e_password?.message}</p>
            </Row>
            <button className={style.button} type="submit">
              로그인
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
