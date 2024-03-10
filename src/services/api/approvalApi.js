import apiInterceptor from "../auth/apiInterceptor";

export const getAllApprovalList = async (params) => {
  try {
    const response = await apiInterceptor.get("approval/allApprovalList", { params });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDeptData = async (params) => {
  try {
    const response = await apiInterceptor.get("approval/getDeptData", { params });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getApprovalDetail = async (params) => {
  try {
    const response = await apiInterceptor.get("approval/getApprovalDetail", { params });
    return response;
  } catch (error) {
    throw error;
  }
};


export const approvalInsert = async (data) => {
  try {
    const response = await apiInterceptor.post("approval/approvalInsert", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};


export const approvalDelete = async (params) => {
  try {
    const response = await apiInterceptor.delete("approval/approvalDelete", { params });
    return response;
  } catch (error) {
    throw error;
  }
};


export const approvalFileDownload = async (filename) => {
  try {
    const response = await apiInterceptor.get("approval/approvalFileDownload", {
      params: {'filename': filename},
      responseType: 'blob'
    });
    console.log("파일다운로드");
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
    console.log(error);
  }
};


export const approvalWaitList = async (params) => {
  try {
    const response = await apiInterceptor.get("approval/approvalWaitList", { params });
    return response;
  } catch (error) {
    throw error;
  }
};


export const approvalProgressList = async (params) => {
  try {
    const response = await apiInterceptor.get("approval/approvalProgressList", { params });
    return response;
  } catch (error) {
    throw error;
  }
};


export const approvalDenyList = async (params) => {
  try {
    const response = await apiInterceptor.get("approval/approvalDenyList", { params });
    return response;
  } catch (error) {
    throw error;
  }
};


export const approvalCompleteList = async (params) => {
  try {
    const response = await apiInterceptor.get("approval/approvalCompleteList", { params });
    return response;
  } catch (error) {
    throw error;
  }
};


export const approvalTempList = async (params) => {
  try {
    const response = await apiInterceptor.get("approval/approvalTempList", { params });
    return response;
  } catch (error) {
    throw error;
  }
};


export const passOrDeny = async (data) => {
  try {
    const response = await apiInterceptor.put("approval/passOrDeny", data,{
      headers: { 
        'Content-Type': 'application/json'
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getApprovalDocCount = async (params) => {
  try {
    const response = await apiInterceptor.get("approval/getApprovalDocCount", { params });
    return response;
  } catch (error) {
    throw error;
  }
};

export const approvalWithdrawal = async (params) => {
  try {
    const response = await apiInterceptor.get("approval/approvalWithdrawal", { params });
    return response;
  } catch (error) {
    throw error;
  }
};