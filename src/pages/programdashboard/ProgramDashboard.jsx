import React, { useRef } from 'react'
import ChartComponent from './ChartComponent';
import styles from './programboard.module.css'
import CustomShapeChartComponent from './CustomShapeChartComponent';
import Print from '../../components/print/Print';
import ProgramChart from './ProgramChart';

const ProgramDashboard = ({programList, getProgramList}) => {
    const componentRef = useRef();
    return (
        <>
            <Print componentRef={componentRef}/>
            <div ref={componentRef} className="d-flex justify-content-center align-items-top vh-100">
                <div className={styles.chartWrap}>
                        <ChartComponent programList={programList} getProgramList={getProgramList} />
                </div>
                <div className={styles.chartWrap}>
                    <ProgramChart programList={programList}/>
                </div>
                <div className={styles.chartWrap}>
                        <CustomShapeChartComponent />
                </div>
            </div>

        </>
    );
};

export default ProgramDashboard;