import React, { useEffect, useState } from "react";
import styles from "./paymentInfo.module.css";
import SmsModal from "./SmsModal";
import { Button, Form, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setPaymentDetail } from "../../redux/paymentSlice";
import { Col, Row } from "antd";
import PaymentPagination from "./PaymentPagination";

const PaymentList = ({ handleRefresh, payList, payment }) => {
  const [selectType, setSelectType] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
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
    setSelectType("");
    setSelectStatus("");
    reset();
    handleRefresh();
  };

  const handleTypeChange = (e) => {
    console.log(e.target.value);
    setSelectStatus("");
    setSelectType(e.target.value);
    const gubun = {
      gubun: e.target.value,
    };
    handleRefresh(gubun);
  };

  const handleStatusChange = (e) => {
    console.log(e.target.value);
    setSelectType("");
    setSelectStatus(e.target.value);
    const gubun = {
      gubun: e.target.value,
    };
    handleRefresh(gubun);
  };

  const handleKeyword = (e) => {
    console.log(e);
    setSelectType("");
    setSelectStatus("");
  };

  //pagination
  const totalPosts = payment.length;
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const selectedlist = [...payment.slice(indexOfFirstPost, indexOfLastPost)];
  console.log(selectedlist);

  const handleSetCurentPage = (pageNo) => {
    setCurrentPage(pageNo);
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
        <Form onSubmit={handleSubmit(handleSearch)}>
          <div className={styles.search}>
            <div className="col-2">
              <select
                style={{ fontSize: "13px" }}
                id="gubun"
                className="form-select"
                aria-label="분류"
                {...register("gubun")}
              >
                <option defaultValue value="name" selected>
                  회원명
                </option>
                <option value="phone">연락처</option>
              </select>
            </div>
            <div className="col-7">
              <input
                style={{ fontSize: "13px" }}
                {...register("keyword", {
                  onChange: (e) => handleKeyword(e.target.value),
                })}
                type="text"
                id="keyword"
                className="form-control"
                placeholder="검색어를 입력하세요"
                aria-label="검색어를 입력하세요"
                aria-describedby="btn_search"
              />
            </div>
            <div className="col-auto">
              <Button
                variant="outline-success"
                size="sm"
                type="submit"
                style={{ fontSize: "13px" }}
              >
                검색
              </Button>
            </div>
            <div className="col-2">
              <Button variant="outline-warning" size="sm" onClick={handleReset}>
                전체조회
              </Button>
            </div>
          </div>
        </Form>
        <Row gutter={10}>
          <Col>
            <div className="col-2">
              <select
                style={{ fontSize: "13px", width: "150px" }}
                id="gubun1"
                value={selectType}
                className="form-select"
                aria-label="분류"
                {...register("gubun1")}
                onChange={handleTypeChange}
              >
                <option value="" selected>
                  결제유형
                </option>
                <option value="pay">매입</option>
                <option value="refund">환불</option>
              </select>
            </div>
          </Col>
          <Col>
            <div className="col-2">
              <select
                style={{ fontSize: "13px", width: "150px" }}
                id="gubun2"
                value={selectStatus}
                className="form-select"
                aria-label="분류"
                {...register("gubun2")}
                onChange={handleStatusChange}
              >
                <option value="" selected>
                  결제상태
                </option>
                <option value="pending">결제대기</option>
                <option value="completed">결제완료</option>
                <option value="refundcom">환불완료</option>
              </select>
            </div>
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
              {selectedlist &&
                selectedlist.map((item, index) => (
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
          <div className={styles.paymentPagination}>
            <PaymentPagination
              currentPage={currentPage}
              totalPosts={totalPosts}
              postPerPage={postPerPage}
              handleSetCurentPage={handleSetCurentPage}
            ></PaymentPagination>
          </div>
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
