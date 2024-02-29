import React, { useEffect, useRef, useState } from 'react'
import ChartComponent from './ProgramCalChart';
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
    },[])
    
    return (
        <>
        <div className={styles.dashboardWrap}>
            <Print componentRef={componentRef}  className={styles.btn}/>
            <div ref={componentRef} className="d-flex justify-content-center">
                <div className={styles.chartWrap}>
                    <h4>분야별 프로그램 갯수</h4>
                    <ProgramChart programList={programList}/>
                </div>
                <div className={styles.chartWrap}>
                    <h4>월별 프로그램 진행 횟수</h4>
                    <CustomShapeChartComponent pgCalList={pgCalList}/>
                </div>
                <div className={styles.chartWrap}>
                    <h4>프로그램별 진행 횟수</h4>
                        <ChartComponent pgCalList={pgCalList}  />
                </div>
            </div>
        </div>
        </>
    );
};

export default ProgramDashboard;