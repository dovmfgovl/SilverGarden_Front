// export const PaymentListDB = (data) => {

import apiInterceptor from "../auth/apiInterceptor";

//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "payment/paylist",
//         params : data
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export const PaymentListDB = async (params) => {
  try {
    const response = await apiInterceptor.get("payment/paylist", {params});
    return response;
  } catch (error) {
    throw error;
  }
};

// export const PaymentClientListDB = (data) => {

//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "payment/payclientlist",
//         params : data
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export const PaymentClientListDB = async (params) => {
  try {
    const response = await apiInterceptor.get("payment/payclientlist", {params});
    return response;
  } catch (error) {
    throw error;
  }
};

// export const SmsRequestApi = (data) => {
// console.log(data)
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "post",
//         url: process.env.REACT_APP_SPRING_IP + "sms/request",
//         params : data
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export const SmsRequestApi = async (data) => {
  try {
    const response = await apiInterceptor.post("sms/request", data);
    return response;
  } catch (error) {
    throw error;
  }
};

// export const PaymentRefundApi = (data) => {

//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "post",
//         url: process.env.REACT_APP_SPRING_IP + "payment/refund",
//         params : data
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

export const PaymentRefundApi = async (data) => {
  try {
    const response = await apiInterceptor.post("payment/refund", data);
    return response;
  } catch (error) {
    throw error;
  }
};