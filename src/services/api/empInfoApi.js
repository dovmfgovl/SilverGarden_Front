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
            console.log(response);

        } catch (error) {
            reject(error); 
        }
    });
};
export const empExpListDB = (emp) => {
    return new Promise((resolve, reject) => {
        try {
            console.log(emp);
            const response = axios({
                method: "get",
                url: process.env.REACT_APP_SPRING_IP + "emp/experienceList",
                params: emp,
            });
            resolve(response);
            console.log(response);

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

export const empUpdateDB = (emp) => {
    console.log(emp);
    return new Promise((resolve, reject) => {
        try {
        const response = axios({
            method: "put", //@RequestBody
            url: process.env.REACT_APP_SPRING_IP + "emp/empUpdate",
            data: emp, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
        });
        console.log(response);
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

export const empEduUpdateDB = (emp) => {
    console.log(emp);
    return new Promise((resolve, reject) => {
        try {
        const response = axios({
            method: "put", //@RequestBody
            url: process.env.REACT_APP_SPRING_IP + "emp/empEduUpdate",
            data: emp, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
        });
        console.log(response);
        resolve(response);
        } catch (error) {
        reject(error);
        }
    });
};

export const empExpInsertDB = (emp) => {
    console.log(emp);
    return new Promise((resolve, reject) => {
        try {
        const response = axios({
            method: "post",
            url: process.env.REACT_APP_SPRING_IP + "emp/experienceInsert",
            data: emp,
        });
        console.log(response);
        resolve(response);
        } catch (error) {
        reject(error);
        }
    });
};
export const empExpDeleteDB = (expNo) => {
    return new Promise((resolve, reject) => {
        try {
            const response = axios({
                method: "delete",
                url: process.env.REACT_APP_SPRING_IP + "emp/experienceDelete",
                params: {exp_no: expNo},
            });
            resolve(response);
            console.log(response);

        } catch (error) {
            reject(error); 
        }
    });
};

export const empCertiInsertDB = (emp) => {
    console.log(emp);
    return new Promise((resolve, reject) => {
        try {
        const response = axios({
            method: "post",
            url: process.env.REACT_APP_SPRING_IP + "emp/certiInsert",
            data: emp,
        });
        console.log(response);
        resolve(response);
        } catch (error) {
        reject(error);
        }
    });
};