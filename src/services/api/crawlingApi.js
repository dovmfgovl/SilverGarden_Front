import axios from "axios";

export const crawlingListDB = (param) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("crawlingListDB");
            console.log(param);
            const response = await axios.get(process.env.REACT_APP_SPRING_IP + "crawling/dataList", {
                params: param
            });
            console.log(response); //{data: 'noData', status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}
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
