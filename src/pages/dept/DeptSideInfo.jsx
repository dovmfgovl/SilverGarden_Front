import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Tab, Table, Tabs } from "react-bootstrap";
import styles from "./dept.module.css";
import { Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  EmpListDB,
  JobDeleteDB,
  JobInsertDB,
  JobListDB,
} from "../../services/api/deptApi";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const DeptSideInfo = ({ handleRefresh }) => {
  const data = useSelector((state) => state.deptDetail.value);
  const empData = useSelector((state) => state.userInfoSlice);
  const [job, setJob] = useState([]);
  const [emp, setEmp] = useState([]);
  console.log(data);
  console.log(data.CD);

  const jobList = async () => {
    console.log("jobList 호출");

    const response = await JobListDB(data);
    console.log(response.data);
    setJob(response.data);
  };

  useEffect(() => {
    if (data !== 0) {
      jobList();
      empList();
      console.log(emp);
    }
  }, [data]);

  const [selectedRow, setSelectedRow] = useState(null); // 선택된 행 상태

  const handleCheckboxChange = (item) => {
    console.log("item" + item.CD_VALUE);
    console.log("item" + item.CD);
    if (selectedRow === item) {
      setSelectedRow(null); // 이미 선택된 행이면 선택 해제
    } else {
      setSelectedRow(item); // 선택되지 않은 행이면 선택
    }
  };

  const handleDelete = async () => {
    console.log("handleDelete");
    console.log(selectedRow.CD);
    if (selectedRow) {
      const value = {
        CD: selectedRow.CD,
        MOD_ID: empData.e_no,
      };
      console.log(value);
      const response = await JobDeleteDB(value);
      alert("직종이 삭제되었습니다.");
      jobList();
      handleRefresh();
    } else {
      alert("삭제할 직종을 선택해주세요.");
    }
  };

  ///모달
  const {
    setValue,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    reset();
  };
  const handleShow = () => {
    console.log("handleShow클릭");
    setShow(true);
  };

  const onSubmit = async (values) => {
    console.log(values);
    console.log(values.CD_VALUE);
    const value = {
      CD: data.CD,
      CD_VALUE: values.CD_VALUE,
      REG_ID: empData.e_no,
      MOD_ID: empData.e_no,
    };
    console.log(value);
    const res = await JobInsertDB(value);
    handleClose();
    jobList();
    handleRefresh();
  };

  const empList = async () => {
    console.log("empList 호출");
    const datas = {
      CD_VALUE: data.CD_VALUE,
    };
    console.log(datas);
    const resp = await EmpListDB(datas);
    console.log(resp);
    setEmp(resp.data);
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="job"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="job" title="직종목록">
          <div className={styles.job}>
            <div className={styles.jobtable}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>선택</th>
                    <th>직종명</th>
                  </tr>
                </thead>
                <tbody>
                  {job &&
                    job.map((item, index) => (
                      <tr key={index}>
                        <input
                          type="checkbox"
                          checked={selectedRow === item}
                          onChange={() => handleCheckboxChange(item)}
                        />
                        <td>{item.CD_VALUE}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
            <div className={styles.jobbtn}>
              <div>
                <Button
                  variant="outline-secondary"
                  className={styles.btn}
                  onClick={handleShow}
                >
                  추가
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>직종추가팝업</Modal.Title>
                  </Modal.Header>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Body>
                      <div>
                        <div>
                          <Row style={{ columnGap: "10px" }}>
                            <Col>
                              <Form.Label>직종명</Form.Label>
                              <Form.Control
                                style={{ width: "150px" }}
                                {...register("CD_VALUE", {
                                  required: "* 직종명을 입력해주세요.",
                                })}
                                name="CD_VALUE"
                                type="text"
                              />
                              <Error>{errors?.CD_VALUE?.message}</Error>
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
                        추가
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal>
              </div>
              <div>
                <Button
                  variant="outline-secondary"
                  className={styles.btn}
                  onClick={handleDelete}
                >
                  삭제
                </Button>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="emp" title="직원목록">
          <div className={styles.emptable}>
            <p>총 직원수 : {emp.length}명</p>
            <Table responsive>
              <thead>
                <tr>
                  <th>사원번호</th>
                  <th>이름</th>
                  <th>휴대전화</th>
                  <th>이메일</th>
                  <th>권한</th>
                </tr>
              </thead>
              <tbody>
                {emp &&
                  emp.map((item, index) => (
                    <tr key={index}>
                      <td>{item.E_NO}</td>
                      <td>{item.E_NAME}</td>
                      <td>{item.E_PHONE}</td>
                      <td>{item.E_EMAIL}</td>
                      <td>{item.E_AUTH}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default DeptSideInfo;

const Error = styled.p`
  color: red;
  font-size: 12px;
`;
