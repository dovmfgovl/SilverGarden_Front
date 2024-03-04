import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { PaymentClientListDB } from "../../services/api/paymentApi";
import styles from "./smsModal.module.css";
import { useDispatch } from "react-redux";
import { setClientDetail } from "../../redux/paymentClientSlice";

const ClientSearchModal = () => {
  const [payclient, setPayClient] = useState([]);

  const dispatch = useDispatch();

  const payClientList = async (value) => {
    console.log("paylist호출");
    const response = await PaymentClientListDB(value);
    console.log(response.data);
    setPayClient(response.data);
  };

  const handleRowClick = (item) => {
    console.log(item);
    dispatch(setClientDetail(item));
    handleClose();
  };
  ///모달
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    console.log("팝업 열림");
    payClientList();
    setShow(true);
  };

  return (
    <>
      <Button size="sm" variant="outline-secondary" onClick={handleShow}>
        찾기
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>회원목록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflowX: "auto" }}>
            <Table responsive className={styles.clienttable}>
              <thead>
                <tr>
                  <th>회원ID</th>
                  <th>회원명</th>
                  <th>성별</th>
                  <th>생년월일</th>
                  <th>연락처</th>
                </tr>
              </thead>
              <tbody>
                {payclient &&
                  payclient.map((item, index) => (
                    <tr key={index} onClick={() => handleRowClick(item)}>
                      <td>{item.CLIENT_ID}</td>
                      <td>{item.CLIENT_NAME}</td>
                      <td>{item.CLIENT_GENDER}</td>
                      <td>{item.CLIENT_BIRTH}</td>
                      <td>{item.CLIENT_TEL}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} size="sm">
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClientSearchModal;
