import axios from "axios";

export const atListDB = (at) => {
    return new Promise((resolve, reject) => {
        try {
            console.log(at);
            const response = axios({
                method: "get",
                url: process.env.REACT_APP_SPRING_IP + "at/atList",
                params: at,
            });
            resolve(response);
            console.log(response);

        } catch (error) {
            reject(error); 
        }
    });
};

export const atInsertDB = (at) => {
  console.log(at); //
  return new Promise((resolve, reject) => {
      try {
          const response = axios({
              method: "post", //@RequestBody
              url: process.env.REACT_APP_SPRING_IP + "at/atInsert",
              data: at,
          });
          resolve(response);
      } catch (error) {
          reject(error);
      }
  });
};