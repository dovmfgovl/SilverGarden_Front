import React from 'react'
// import CrawlingDataService from './CrawlingDataService'
// import CrawlingDataInput from './CrawilngDataInput'
import CrawlingComponent from './CrawlingComponent'
import { UserAPage } from '../../services/auth/UserApi';

const CrawilngHome = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        UserAPage()
        .then((response) => {
        console.log(response); //undefined
        })
        .catch((error) => {
        console.log(error);
        });
    }
    return (
        <div>
            <CrawlingComponent />
        </div>
    )
}

export default CrawilngHome;