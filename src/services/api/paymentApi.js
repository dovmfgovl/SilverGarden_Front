import axios from "axios";

export const PaymentListDB = (data) => {

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "payment/paylist",
        params : data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export const PaymentClientListDB = (data) => {

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "payment/payclientlist",
        params : data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export const SmsRequestApi = (data) => {
console.log(data)
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "sms/request",
        params : data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export const PaymentRefundApi = (data) => {

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "payment/refund",
        params : data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}