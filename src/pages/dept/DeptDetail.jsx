import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./dept.module.css";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeptDeleteDB } from "../../services/api/deptApi";
import { setDeptDetail } from "../../redux/deptSlice";
import DeleteModal from "./DeleteModal";

const DeptDetail = ({ handlepage, handleRefresh }) => {
  const data = useSelector((state) => state.deptDetail.value);
  const dispatch = useDispatch();
  console.log(data);
  const handleDelete = async () => {
    const response = await DeptDeleteDB(data);
    alert("삭제되었습니다");
    dispatch(
      setDeptDetail({
        CD: "",
        CD_VALUE: "",
        EXT: "",
        EXT_VALUE: "",
      })
    );
    handleRefresh();
  };

  //모달
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    console.log("handleShow클릭");
    setShow(true);
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.pageHeader}>
        <Row>
          <Col md={20}>
            <h5>부서상세</h5>
          </Col>
          <Col md={2}>
            <Button variant="outline-danger" size="sm" onClick={handleShow}>
              삭제
            </Button>
            <DeleteModal
              handleClose={handleClose}
              show={show}
              handleDelete={handleDelete}
            />
          </Col>
          <Col md={2}>
            <Button variant="outline-dark" size="sm" onClick={handlepage}>
              수정
            </Button>
          </Col>
        </Row>
        <hr />
      </div>
      <div>
        <Form.Label>부서코드</Form.Label>
        <Form.Control
          style={{ width: "150px", marginBottom: "10px" }}
          name="d_cd"
          type="text"
          value={data.CD}
          disabled
        />
        <Form.Label>부서명</Form.Label>
        <Form.Control
          style={{ width: "150px", marginBottom: "10px" }}
          name="d_name"
          type="text"
          value={data.CD_VALUE}
          disabled
        />
        <Form.Label>내선번호</Form.Label>
        <Form.Control
          style={{ width: "150px" }}
          name="d_ext"
          type="text"
          value={data.EXT_VALUE}
          disabled
        />
      </div>
    </div>
  );
};

export default DeptDetail;
