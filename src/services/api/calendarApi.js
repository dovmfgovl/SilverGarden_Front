import axios from "axios";
// ... 이전 코드

export const getCalendarEventsDB = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: 'get',
                url: process.env.REACT_APP_SPRING_IP + 'calendar/eventList',
            });
            console.log(response);
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const addEventDB = (event) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: 'get',
                url: process.env.REACT_APP_SPRING_IP + 'calendar/eventAdd',
                data: event,
            });
            console.log(response);
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const updateEventDB = (event) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: 'get',
                url: process.env.REACT_APP_SPRING_IP + 'calendar/eventUpdate',
                params: event,
            });
            console.log(response);
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const deleteEventDB = (event) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: 'delete',
                url: process.env.REACT_APP_SPRING_IP + 'calendar/eventDelete',
                params: event
            });
            console.log(response);
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};
