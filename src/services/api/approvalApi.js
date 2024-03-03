import axios from "axios";

export const getAllApprovalList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/allApprovalList",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDeptData = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/getDeptData",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getApprovalDetail = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/getApprovalDetail",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const approvalInsert = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "approval/approvalInsert",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const approvalVacationRequest = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "approval/approvalVacationRequest",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const approvalDelete = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "delete",
        url: process.env.REACT_APP_SPRING_IP + "approval/approvalDelete",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const approvalFileDownload = (filename) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SPRING_IP}approval/approvalFileDownload`,
      params: {'filename': filename},
      responseType: 'blob', // 파일 다운로드를 위해 responseType을 blob으로 설정
    })
    .then(response => {
      // 파일 다운로드 처리
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      resolve(response);
    })
    .catch(error => {
      reject(error);
    });
  });
};


export const approvalWaitList = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/approvalWaitList",
        params: params,
      });
      resolve(response);
    } catch (error) {
      console.log("여기여기");
      console.log(error.response.data);
      console.log(error.response.status);
      reject(error);
    }
  });
};

export const approvalProgressList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/approvalProgressList",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const approvalDenyList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/approvalDenyList",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const approvalCompleteList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/approvalCompleteList",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const approvalTempList = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/approvalTempList",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const passOrDeny = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "put",
        url: process.env.REACT_APP_SPRING_IP + "approval/passOrDeny",
        headers: { 
          'Content-Type': 'application/json'
        },
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getApprovalDocCount = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/getApprovalDocCount",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const approvalWithdrawal = (params) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "approval/approvalWithdrawal",
        params: params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};