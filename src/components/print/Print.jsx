import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';

const Print = ({componentRef}) => {
    const handlePrint = useReactToPrint({
        content: useCallback(() => componentRef.current, [componentRef]),
        documentTitle: "프로그램 현황" ,
        onAfterPrint: () => alert("파일 저장 및 인쇄가 완료되었습니다.")
    });
    // 1. 출력버튼 넣고 싶은 위치에 <Print componentRef={componentRef} />
    // 2. 상단에 const componentRef = useRef(); 및 import하기  
    // 3. 출력 영역 시작되는 div 영역에 <div ref={componentRef}> 로 설정하기!! 
    // 4. 해당 컴포넌트 모듈.css에 추가내용 print.module.css 확인하기!(가로/세로출력 설정)
    return (
        <div>
            <button className="btn btn-outline-primary" onClick={handlePrint}>
            <FontAwesomeIcon icon={faPrint} style={{marginRight:'2px'}}/> 출력
            </button>
            <br />
            <br />
        </div>
    );
};

export default Print;