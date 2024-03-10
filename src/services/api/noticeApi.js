import apiInterceptor from "../auth/apiInterceptor";

export const getNoticeList = async (params) => {
  try {
    const response = await apiInterceptor.get("notice/noticeList", { params });
    return response;
  } catch (error) {
    throw error;
  }
};

// export const getNoticeDetail = (n_no) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "notice/noticeDetail",
//         params: {'n_no': n_no},

//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const noticeTotalCount = async (params) => {
  try {
    const response = await apiInterceptor.get("notice/noticeTotalCount", { params });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getNoticeDetail = async (n_no) => {
  try {
    const response = await apiInterceptor.get("notice/noticeDetail", { 
      params: {'n_no': n_no} 
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// export const noticeInsert = (data) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "post",
//         url: process.env.REACT_APP_SPRING_IP + "notice/noticeInsert",
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         processData: false,
//         contentType: false,
//         data: data,
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const noticeInsert = async (data) => {
  try {
    const response = await apiInterceptor.post("notice/noticeInsert",data, { 
      headers: {
        "Content-Type": "multipart/form-data",
      }, 
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// export const noticeDelete = (n_no) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "notice/noticeDelete",
//         params: {'n_no': n_no},
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const noticeDelete = async (n_no) => {
  try {
    const response = await apiInterceptor.get("notice/noticeDelete", { 
      params: {'n_no': n_no}, 
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// export const noticeUpdate = (params) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "get",
//         url: process.env.REACT_APP_SPRING_IP + "notice/noticeUpdate",
//         params: {
//                 'n_no': params.n_no,
//                 'n_title': params.n_title,
//                 'n_content': params.n_content,
//                 'e_no':params.e_no
//                 },
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const noticeUpdate = async (params) => {
  try {
    const response = await apiInterceptor.get("notice/noticeUpdate", { params});
    return response;
  } catch (error) {
    throw error;
  }
};


// export const noticeFileDownload = (filename) => {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: "get",
//       url: `${process.env.REACT_APP_SPRING_IP}notice/fileDownload`,
//       params: {'filename': filename},
//       responseType: 'blob', // 파일 다운로드를 위해 responseType을 blob으로 설정
//     })
//     .then(response => {
//       // 파일 다운로드 처리
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', filename);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//       resolve(response);
//     })
//     .catch(error => {
//       reject(error);
//     });
//   });
// };

export const noticeFileDownload = async (filename) => {
  try {
    const response = await apiInterceptor.get("notice/fileDownload", {
      params: {'filename': filename},
      responseType: 'blob'
    },
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    return response;
  } catch (error) {
    throw error;
  }
};

// export const noticeImageUpload = (file) =>{
//   return new Promise((resolve, reject) => {
//     try {
//       const response = axios({
//         method: "post",
//         url: process.env.REACT_APP_SPRING_IP+"notice/imageUpload",
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         processData: false,
//         contentType: false,
//         data: file,
//       })
//       resolve(response)
//     } catch (error) {
//       reject(error)
//     }
//   })
// }

export const noticeImageUpload = async (data) => {
  try {
    const response = await apiInterceptor.post("notice/imageUpload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};