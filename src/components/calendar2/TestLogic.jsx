import axios from 'axios';

class TestLogic {
    static listDB = (url) => {
        console.log(url); 
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios({
                    method: 'get',
                    url: process.env.REACT_APP_SPRING_IP + url,
                });
                console.log(response);
                resolve(response.data);
            } catch (error) {
                console.error('Error fetching calendar events:', error);
                reject(error);
            }
        });
    };
    
    static addDB = (url, event) => {
        console.log('addDB');//addDB
        console.log(event); //{PS_NAME: 'ㅁㄴㅇ', PS_START: '2024-02-05T00:24', PS_END: '2024-02-07T00:24'}
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios({
                    method: 'post',
                    url: process.env.REACT_APP_SPRING_IP + url,
                    data: event,
                });
                console.log(response);
                resolve(response.data);
            } catch (error) {
                console.error('Error adding calendar event:', error);
                reject(error);
            }
        });
    };
    
    static updateDB = (url, event) => {
        console.log('updateDB'); //updateDB 나옴
        console.log(event); //{PS_NAME: '일정 수정 성공123', PS_START: '2024-02-12T00:37', PS_END: '2024-02-14T09:37', PS_NO2: 1}
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios({
                    method: 'put',
                    url: process.env.REACT_APP_SPRING_IP + url,
                    data: event,
                });
                resolve(response.data);
            } catch (error) {
                console.error('Error updating calendar event:', error);
                reject(error);
            }
        });
    };
    
    static deleteDB = (url, event) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios({
                    method: 'delete',
                    url: process.env.REACT_APP_SPRING_IP + url,
                    params: event
                });
                console.log(response);
                resolve(response.data);
            } catch (error) {
                console.error('Error deleting calendar event:', error);
                reject(error);
            }
        });
    };
}

export default TestLogic;