import React, { useEffect, useRef, useState } from 'react'
import ChartComponent from './ChartComponent';
import styles from './programboard.module.css'
import CustomShapeChartComponent from './CustomShapeChartComponent';
import Print from '../../components/print/Print';
import ProgramChart from './ProgramChart';
import CommonCalendarLogic from '../../components/fullcalendar/CommonCalendarLogic';

const ProgramDashboard = ({programList}) => {
    const componentRef = useRef();
    const [pgCalList, setPgCalList] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await CommonCalendarLogic.listDB('calendar/list');
                setPgCalList(response); 
            } catch (error) {
                console.error('Error fetching member list:', error);
            }
        };
        fetchData();
        console.log(pgCalList);
    },[])
    
    return (
        <>
            <Print componentRef={componentRef}/>
            <div ref={componentRef} className="d-flex justify-content-center align-items-top vh-100">
                <div className={styles.chartWrap}>
                        <ChartComponent pgCalList={pgCalList}  />
                </div>
                <div className={styles.chartWrap}>
                    <ProgramChart programList={programList}/>
                </div>
                <div className={styles.chartWrap}>
                        <CustomShapeChartComponent pgCalList={pgCalList}/>
                </div>
            </div>

        </>
    );
};

export default ProgramDashboard;