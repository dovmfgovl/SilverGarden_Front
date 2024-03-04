import React, { useState } from "react";

import styles from "./paymentInfo.module.css";
import { Col, Row } from "antd";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import RefundModal from "./RefundModal";

const PaymentDetail = ({ handleRefresh }) => {
  const data = useSelector((state) => state.paymentDetail.value);

  return (
    <div className={styles.detailContainer}>
      <div className={styles.pageHeader}>
        <Row>
          <Col md={22}>
            <h5>결제상세</h5>
          </Col>
          <Col md={2}>
            <RefundModal handleRefresh={handleRefresh}></RefundModal>
          </Col>
        </Row>
        <hr />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.payno}>
          <Row gutter={10}>
            <Col>
              <Form.Label>결제번호</Form.Label>
            </Col>
            <Col>
              <Form.Control
                style={{
                  width: "200px",
                  marginBottom: "10px",
                  fontSize: "13px",
                }}
                name="d_cd"
                type="text"
                value={data.PAY_NO}
                disabled
              />
            </Col>
          </Row>
        </div>
        <div className={styles.clientid}>
          <Row gutter={10}>
            <Col style={{ marginRight: "10px" }}>
              <Form.Label>회원ID</Form.Label>
            </Col>
            <Col>
              <Form.Control
                style={{
                  width: "200px",
                  marginBottom: "10px",
                  fontSize: "13px",
                }}
                name="d_name"
                type="text"
                value={data.CLIENT_ID}
                disabled
              />
            </Col>
          </Row>
        </div>
        <div className={styles.clientname}>
          <Row gutter={10}>
            <Col style={{ marginRight: "11px" }}>
              <Form.Label>회원명</Form.Label>
            </Col>
            <Col>
              <Form.Control
                style={{ width: "200px", fontSize: "13px" }}
                name="d_ext"
                type="text"
                value={data.CLIENT_NAME}
                disabled
              />
            </Col>
          </Row>
        </div>
        <div className={styles.clienttel}>
          <Row gutter={10}>
            <Col style={{ marginRight: "11px" }}>
              <Form.Label>연락처</Form.Label>
            </Col>
            <Col>
              <Form.Control
                style={{ width: "200px", fontSize: "13px" }}
                name="d_ext"
                type="text"
                value={data.CLIENT_TEL}
                disabled
              />
            </Col>
          </Row>
        </div>
        <div className={styles.clientbirth}>
          <Row gutter={10}>
            <Col>
              <Form.Label>생년월일</Form.Label>
            </Col>
            <Col>
              <Form.Control
                style={{ width: "200px", fontSize: "13px" }}
                name="d_ext"
                type="text"
                value={data.CLIENT_BIRTH}
                disabled
              />
            </Col>
          </Row>
        </div>
        <div className={styles.payprice}>
          <Row gutter={10}>
            <Col>
              <Form.Label>결제금액</Form.Label>
            </Col>
            <Col>
              <Form.Control
                style={{ width: "200px", fontSize: "13px" }}
                name="d_ext"
                type="text"
                value={data.PAY_PRICE}
                disabled
              />
            </Col>
          </Row>
        </div>
        <div className={styles.paycategory}>
          <Row gutter={10}>
            <Col>
              <Form.Label>결제유형</Form.Label>
            </Col>
            <Col>
              <Form.Control
                style={{ width: "200px", fontSize: "13px" }}
                name="d_ext"
                type="text"
                value={data.PAY_CATEGORY}
                disabled
              />
            </Col>
          </Row>
        </div>
        <div className={styles.status}>
          <Row gutter={10}>
            <Col>
              <Form.Label>결제상태</Form.Label>
            </Col>
            <Col>
              <Form.Control
                style={{ width: "200px", fontSize: "13px" }}
                name="d_ext"
                type="text"
                value={data.STATUS}
                disabled
              />
            </Col>
          </Row>
        </div>
        <div className={styles.paydate}>
          <Row gutter={10}>
            <Col>
              <Form.Label>청구일시</Form.Label>
            </Col>
            <Col>
              <Form.Control
                style={{ width: "200px", fontSize: "13px" }}
                name="d_ext"
                type="text"
                value={data.PAY_DATE}
                disabled
              />
            </Col>
          </Row>
        </div>
        <div className={styles.successdate}>
          <Row gutter={10}>
            <Col>
              <Form.Label>결제일시</Form.Label>
            </Col>
            <Col>
              <Form.Control
                style={{ width: "200px", fontSize: "13px" }}
                name="d_ext"
                type="text"
                value={data.SUCCESS_DATE}
                disabled
              />
            </Col>
          </Row>
        </div>
        <div className={styles.memo}>
          <Row gutter={10}>
            <Col>
              <Form.Label>요청사유</Form.Label>
            </Col>
            <Col>
              <Form.Control
                style={{ width: "200px", fontSize: "13px" }}
                name="d_ext"
                type="text"
                value={data.MEMO}
                disabled
              />
            </Col>
          </Row>
        </div>
        <div className={styles.refunddate}>
          <Row gutter={10}>
            <Col>
              <Form.Label>환불일시</Form.Label>
            </Col>
            <Col>
              <Form.Control
                style={{ width: "200px", fontSize: "13px" }}
                name="d_ext"
                type="text"
                value={data.REFUND_DATE}
                disabled
              />
            </Col>
          </Row>
        </div>
        <div className={styles.refundmemo}>
          <Row gutter={10}>
            <Col>
              <Form.Label>환불사유</Form.Label>
            </Col>
            <Col>
              <Form.Control
                style={{ width: "200px", fontSize: "13px" }}
                name="d_ext"
                type="text"
                value={data.REFUDNMEMO}
                disabled
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
