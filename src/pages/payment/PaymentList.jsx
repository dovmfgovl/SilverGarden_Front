import React, { useEffect, useState } from "react";
import styles from "./paymentInfo.module.css";
import SmsModal from "./SmsModal";
import { Button, Form, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setPaymentDetail } from "../../redux/paymentSlice";
import { Col, Row } from "antd";

const PaymentList = ({ handleRefresh, payList, payment }) => {
  const dispatch = useDispatch();

  const handleRowClick = (data) => {
    console.log(data);
    dispatch(setPaymentDetail(data));
  };

  //검색기능
  const { handleSubmit, register, reset } = useForm({ mode: "onChange" });

  const handleSearch = (value) => {
    console.log(value);
    reset();
    handleRefresh(value);
  };

  const handleReset = () => {
    handleRefresh();
  };

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    const gubun = {
      gubun: event.target.value,
    };
    handleRefresh(gubun);
  };

  return (
    <>
      <div
        className={styles.container}
        style={{ padding: "0px 20px 0px 0px", borderLeft: "none" }}
      >
        <div className={styles.pageHeader}>
          <h5>결제목록</h5>
          <hr />
        </div>
        <Row gutter={30}>
          <Col>
            <Form onSubmit={handleSubmit(handleSearch)}>
              <div className={styles.search}>
                <div className="col-3">
                  <select
                    style={{ fontSize: "13px" }}
                    id="gubun"
                    className="form-select"
                    aria-label="분류"
                    {...register("gubun")}
                  >
                    <option defaultValue value="name">
                      회원명
                    </option>
                    <option value="phone">연락처</option>
                  </select>
                </div>
                <div className="col-7">
                  <input
                    style={{ fontSize: "13px" }}
                    {...register("keyword")}
                    type="text"
                    id="keyword"
                    className="form-control"
                    placeholder="검색어를 입력하세요"
                    aria-label="검색어를 입력하세요"
                    aria-describedby="btn_search"
                  />
                </div>
                <div className="col-1" style={{ marginRight: "5px" }}>
                  <Button
                    variant="outline-success"
                    size="sm"
                    type="submit"
                    style={{ fontSize: "13px", width: "40px" }}
                  >
                    검색
                  </Button>
                </div>
                <div className="col-2">
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={handleReset}
                  >
                    전체조회
                  </Button>
                </div>
                <div className="col-2">
                  <select
                    style={{ fontSize: "13px" }}
                    id="gubun"
                    value=""
                    className="form-select"
                    aria-label="분류"
                    {...register("gubun")}
                    onChange={handleOptionChange}
                  >
                    <option defaultValue value="">
                      결제유형
                    </option>
                    <option value="pay">매입</option>
                    <option value="refund">환불</option>
                  </select>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
        <div className={styles.paymentList}>
          <Table responsive>
            <thead>
              <tr>
                <th>결제번호</th>
                <th>회원ID</th>
                <th>회원명</th>
                <th>연락처</th>
                <th>결제금액</th>
                <th>결제유형</th>
                <th>결제상태</th>
              </tr>
            </thead>
            <tbody>
              {payment &&
                payment.map((item, index) => (
                  <tr key={index} onClick={() => handleRowClick(item)}>
                    <td>{item.PAY_NO}</td>
                    <td>{item.CLIENT_ID}</td>
                    <td>{item.CLIENT_NAME}</td>
                    <td>{item.CLIENT_TEL}</td>
                    <td>{item.PAY_PRICE}</td>
                    <td>{item.PAY_CATEGORY}</td>
                    <td>{item.STATUS}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <hr />
        <span className={`${styles.paymentListFooter} row`}>
          <span className="col-12">
            <SmsModal handleRefresh={handleRefresh} />
          </span>
        </span>
      </div>
    </>
  );
};

export default PaymentList;
