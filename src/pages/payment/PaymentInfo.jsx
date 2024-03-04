import React, { useEffect, useState } from "react";
import styles from "./paymentInfo.module.css";
import PaymentList from "./PaymentList";
import PaymentDetail from "./PaymentDetail";
import { PaymentListDB } from "../../services/api/paymentApi";

const PaymentInfo = () => {
  const [payment, setPayment] = useState([]);

  const payList = async (value) => {
    console.log("paylist호출");
    const response = await PaymentListDB(value);
    console.log(response.data);
    setPayment(response.data);
  };

  useEffect(() => {
    payList();
  }, []);

  const handleRefresh = async (value) => {
    const response = await PaymentListDB(value);
    setPayment(response.data);
  };

  return (
    <>
      <div className={styles.innerPaymentInfoWrap}>
        <div className={styles.paymentListContentWrap}>
          <PaymentList
            handleRefresh={handleRefresh}
            payList={payList}
            payment={payment}
          ></PaymentList>
        </div>
        <div className={styles.paymentDetailWrap}>
          <PaymentDetail handleRefresh={handleRefresh}></PaymentDetail>
        </div>
        <div className={styles.paymentBaseInfoWrap}></div>
      </div>
    </>
  );
};

export default PaymentInfo;
