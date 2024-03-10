import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PaymentRefundApi } from "../../services/api/paymentApi";
import { setPaymentDetail } from "../../redux/paymentSlice";

const RefundModal = ({ handleRefresh }) => {
  const data = useSelector((state) => state.paymentDetail.value);
  const empData = useSelector((state) => state.userInfoSlice);
  const dispatch = useDispatch();
  console.log(data);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {}, empData);

  const onSubmit = async (values) => {
    console.log(values);
    const value = {
      merchant_uid: data.MERCHANT_UID,
      refundmemo: values.memo,
      e_no: empData.e_no,
    };
    console.log(value);
    const response = await PaymentRefundApi(value);
    console.log(response);
    alert("환불이 완료되었습니다.");
    dispatch(setPaymentDetail(""));
    handleClose();
    handleRefresh();
  };

  //모달
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    reset();
  };
  const handleShow = () => {
    console.log("handleShow클릭");
    setShow(true);
  };
  return (
    <>
      {data.PAY_CATEGORY === "매입" && data.STATUS === "결제완료" ? (
        <>
          <Button variant="outline-danger" size="sm" onClick={handleShow}>
            환불
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body>
                <h5 style={{ textAlign: "center" }}>
                  환불을 진행하시겠습니까?
                </h5>
                <br></br>
                <Row>
                  <Col md={2}>
                    <Form.Label>환불사유</Form.Label>
                  </Col>
                  <Col md={22}>
                    <Form.Control
                      style={{ width: "320px", fontSize: "13px" }}
                      {...register("memo", {
                        required: "* 환불사유를 입력해주세요.",
                      })}
                      name="memo"
                      type="text"
                    />
                    <Error>{errors?.memo?.message}</Error>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} size="sm">
                  취소
                </Button>
                <Button variant="primary" type="submit" size="sm">
                  환불
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default RefundModal;

const Error = styled.p`
  color: red;
  font-size: 12px;
`;
