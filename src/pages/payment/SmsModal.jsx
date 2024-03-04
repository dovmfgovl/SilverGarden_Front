import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styles from "./smsModal.module.css";
import { Col, Row } from "antd";
import styled from "styled-components";
import ClientSearchModal from "./ClientSearchModal";
import { useDispatch, useSelector } from "react-redux";
import { setClientDetail } from "../../redux/paymentClientSlice";
import { SmsRequestApi } from "../../services/api/paymentApi";
import InputNumber from "./InputNumber";

const SmsModal = ({ handleRefresh }) => {
  const data = useSelector((state) => state.paymentClientDetail.value);
  const empData = useSelector((state) => state.userInfoSlice);
  console.log(empData);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (values) => {
    //주문번호 생성
    const date = new Date();
    const timestamp = date.getTime();
    console.log(timestamp);
    console.log(values);
    const phone = data.CLIENT_TEL.replace(/\D/g, "");
    const value = {
      id: data.CLIENT_ID,
      name: data.CLIENT_NAME,
      phone: phone,
      amount: values.amount,
      memo: values.memo,
      orderno: "order" + values.id + timestamp,
      e_no: empData.e_no,
    };
    console.log(value);
    const response = await SmsRequestApi(value);
    console.log(response);
    alert("결제 요청 메세지가 전송되었습니다.");
    handleClose();
    handleRefresh();
  };

  ///모달
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    reset();
    dispatch(setClientDetail(""));
  };
  const handleShow = () => {
    console.log("팝업 열림");
    setShow(true);
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        결제요청하기
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>결제요청하기</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <p>* 문자메시지로 결제 링크를 보낼 수 있습니다.</p>
            <div className={styles.body}>
              <div className={styles.id}>
                <Form.Label>회원ID</Form.Label>
                <Row gutter={10}>
                  <Col>
                    <Form.Control
                      style={{ width: "150px", backgroundColor: "#DFDFDF" }}
                      {...register("id", {
                        required: "* 회원ID를 입력해주세요.",
                      })}
                      type="text"
                      name="id"
                      id="id"
                      autoFocus
                      maxLength={10}
                      thousandSeparator=","
                      allowNegative={false}
                      value={data.CLIENT_ID}
                      readOnly={true}
                    />
                    <Error>{errors?.id?.message}</Error>
                  </Col>
                  <Col>
                    <ClientSearchModal />
                  </Col>
                </Row>
              </div>
              <div className={styles.name}>
                <Form.Label>회원명</Form.Label>
                <Form.Control
                  style={{ width: "150px", backgroundColor: "#DFDFDF" }}
                  {...register("name")}
                  type="text"
                  id="name"
                  name="name"
                  autoFocus
                  maxLength={10}
                  thousandSeparator=","
                  allowNegative={false}
                  value={data.CLIENT_NAME}
                  readOnly={true}
                />
              </div>
              <div className={styles.phone}>
                <Form.Label>수신번호</Form.Label>
                <Form.Control
                  style={{ width: "150px", backgroundColor: "#DFDFDF" }}
                  {...register("phone")}
                  type="text"
                  name="phone"
                  id="phone"
                  autoFocus
                  maxLength={10}
                  thousandSeparator=","
                  allowNegative={false}
                  value={data.CLIENT_TEL}
                  readOnly={true}
                />
              </div>
              <div className={styles.price}>
                <Form.Label>결제금액</Form.Label>
                <InputNumber
                  style={{
                    width: "150px",
                    WebkitAppearance: "none" /* 스피너 제거 */,
                    margin: "0",
                  }}
                  {...register("amount", {
                    required: "* 결제금액을 입력해주세요.",
                  })}
                  autoFocus
                  maxLength={10}
                  allowNegative={false}
                />
                <Error>{errors?.amount?.message}</Error>
              </div>
              <div className={styles.text}>
                <Form.Label>요청사유</Form.Label>
                <Form.Control
                  style={{ width: "390px" }}
                  {...register("memo", {
                    required: "* 요청사유를 입력해주세요.",
                  })}
                  type="text"
                  autoFocus
                  maxLength={50}
                  thousandSeparator=","
                  allowNegative={false}
                />
                <Error>{errors?.memo?.message}</Error>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              취소
            </Button>
            <Button variant="primary" type="submit">
              보내기
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default SmsModal;

const Error = styled.p`
  color: red;
  font-size: 12px;
`;
