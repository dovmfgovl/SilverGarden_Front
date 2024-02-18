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
        console.log(event); //{PS_NAME: '일정 수정 성공123123', PS_START: Thu Feb 01 2024 02:52:00 GMT+0900 (한국 표준시), PS_END: Thu Feb 01 2024 23:52:00 GMT+0900 (한국 표준시), PS_NO2: 1}
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios({
                    method: 'put',
                    url: process.env.REACT_APP_SPRING_IP + url,
                    data: event,
                });
                console.log(url); //calendar/update
                console.log(event); //안나옴
                console.log(response);
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