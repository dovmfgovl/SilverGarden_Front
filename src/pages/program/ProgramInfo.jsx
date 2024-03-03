import React from   'react'
import styles from './programhome.module.css'
import ProgramList from './ProgramList'
import RightContent from './RightContent';


const ProgramInfo =  ({programList,getProgramList,onRowClick}) => {
    return (
    <div className={styles.programInfoWrap}>
        <div className={styles.programContentWrap}>
            <ProgramList 
                programList={programList}
                getProgramList={getProgramList}
                onRowClick={onRowClick}
            />
        </div>
        <div className={styles.programDetailWrap}>
            <RightContent
                getProgramList={getProgramList}
            />
        </div> 
    </div>
    )
}

export default ProgramInfo