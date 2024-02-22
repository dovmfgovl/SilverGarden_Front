import axios from "axios";

export const DeptListDB = (data) => {

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "dept/deptlist",
        params : data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export const DeptCheckDB = (data) => {

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "dept/deptcheck",
        params : data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}

export const DeptInsertDB = (data) => {

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "dept/deptinsert",
        params : data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}

export const DeptUpdateDB = (data) => {

  console.log("===> " + data)
  console.log(JSON.stringify(data))

  return new Promise((resolve, reject) => {
    try {
    
      const response = axios({
        method: "put",
        url: process.env.REACT_APP_SPRING_IP + "dept/deptupdate",
        params : data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}

export const DeptDeleteDB = (data) => {

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "put",
        url: process.env.REACT_APP_SPRING_IP + "dept/deptdelete",
        params : data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}

export const JobListDB = (data) => {

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "dept/joblist",
        params : data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
  
}

export const JobInsertDB = (data) => {

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "dept/jobinsert",
        params : data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}

export const JobDeleteDB = (data) => {

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "put",
        url: process.env.REACT_APP_SPRING_IP + "dept/jobdelete",
        params : data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}


export const EmpListDB = (data) => {

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "dept/emplist",
        params : data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

}