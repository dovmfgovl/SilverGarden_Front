import axios from "axios";

export const empListDB = (emp) => {
    return new Promise((resolve, reject) => {
        try {
            console.log(emp);
            const response = axios({
                method: "get",
                url: process.env.REACT_APP_SPRING_IP + "emp/empList",
                params: emp,
            });
            resolve(response);
        } catch (error) {
            reject(error); 
        }
    });
};
export const empDetailDB = (emp) => {
    return new Promise((resolve, reject) => {
        try {
            console.log(emp);
            const response = axios({
                method: "get",
                url: process.env.REACT_APP_SPRING_IP + "emp/empDetail",
                params: emp,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};
export const excelDownDB = (emp) => {
    return new Promise((resolve, reject) => {
        try {
            console.log(emp);
            const response = axios({
                method: "get",
                url: process.env.REACT_APP_SPRING_IP + "emp/excelDown",
                params: emp,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};