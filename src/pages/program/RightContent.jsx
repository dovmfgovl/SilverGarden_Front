import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ProgramInsert from "./ProgramInsert";
import ProgramDetail from './ProgramDetail';
import { useDispatch, useSelector } from 'react-redux';
import { setDetail } from '../../redux/programSlice';


const RightContent = ({getProgramList}) => {
    const dispatch = useDispatch();
    const programDetail = useSelector((state) => state.programSlice.value);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "파일 다운로드 시 저장되는 이름 작성",
        onAfterPrint: () => alert("파일 다운로드 후 알림창 생성 가능")
    });
    
    const handleOutput = () => {
        if (programDetail === null || programDetail === undefined) {
            const confirmOutput = window.confirm('출력값이 비어있습니다. 정말 출력하시겠습니까?');
            if (confirmOutput) {
                handlePrint();
            }
        } else {
            handlePrint();
        }
    };
    const handleReset = () => {
        console.log('초기화 버튼이 클릭되었습니다.');
        dispatch(setDetail(null));
        getProgramList();//초기화
        };

    const componentRef = useRef();

    return (
        <>
            {programDetail !== undefined && programDetail !== null ? (
                <ProgramDetail 
                handleOutput={handleOutput} 
                componentRef={componentRef} 
                handleReset={handleReset} 
                getProgramList={getProgramList}
                />
            ) : (
                <ProgramInsert 
                componentRef={componentRef}
                getProgramList={getProgramList}
                handleReset={handleReset} 
                />
            )}
        </>
    );
}

export default RightContent;
