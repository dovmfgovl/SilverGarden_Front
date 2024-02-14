import React, { useRef } from 'react'
import ChartComponent from './ChartComponent';
import DonutChartComponent from './DonutChartComponent';
import styles from './programboard.module.css'
import CustomShapeChartComponent from './CustomShapeChartComponent';
import Print from '../../components/print/Print';

const ProgramDashboard = ({programList, getProgramList}) => {
    const componentRef = useRef();
    return (
        <>
            <Print componentRef={componentRef}/>
            <div ref={componentRef} className="d-flex justify-content-center align-items-top vh-100">
                <div className={styles.chartWrap}>
                    <div className={styles.chartName}>
                        <h4>Bar Chart</h4>
                        <ChartComponent programList={programList} getProgramList={getProgramList} />
                    </div>
                </div>
                <div className={styles.chartWrap}>
                    <div className={styles.chartName}>
                        <h4>Donut Chart</h4>
                        <DonutChartComponent />
                    </div>
                </div>
                <div className={styles.chartWrap}>
                    <div className={styles.chartName}>
                        <h4>Custom Shape Chart</h4>
                        <CustomShapeChartComponent />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProgramDashboard;