import axios from "axios";

export const crawlingListDB = (param) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("crawlingListDB");
            const response = await axios.get(process.env.REACT_APP_SPRING_IP + "crawling/dataList", {
                params: param
            });
            resolve(response.data);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};

export const crawlingInsertDB = async (data) => {
    try {
        const response = await axios.post(process.env.REACT_APP_SPRING_IP + "crawling/dataInsert", data);
        console.log(response);

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
