import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';

const Print = ({componentRef}) => {
    const handlePrint = useReactToPrint({
        content: useCallback(() => componentRef.current, [componentRef]),
        documentTitle: "파일 다운로드 시 저장되는 이름 작성" ,
        onAfterPrint: () => alert("파일 다운로드 후 알림창 생성 가능")
    });
    // 1. 출력버튼 넣고 싶은 위치에 <Print componentRef={componentRef} />
    // 2. 상단에 const componentRef = useRef(); 및 import하기  
    // 3. 출력 영역 시작되는 div 영역에 <div ref={componentRef}> 로 설정하기!! 
    // 4. 해당 컴포넌트 모듈.css에 추가내용 print.module.css 확인하기!(가로/세로출력 설정)
    return (
        <div>
            <button className="btn btn-outline-primary" onClick={handlePrint}>
            <FontAwesomeIcon icon={faPrint} />
                출력
            </button>
            <br />
            <br />
        </div>
    );
};

export default Print;