import React, { useState } from 'react'

const LineSelectBar = ({empData, handleLineData, lineData}) => {
  const [appMethod, setAppMethod] = useState("");

  const handleClick = () =>{
    if(appMethod === "결재" && empData.e_no !== ""){//Object.keys(array).length => 객체는 길이를 구할 수 없으나 이 방법으로 구할 수 있음
      lineData.approvalLine.forEach((element) => {
        if(element.e_no === empData.e_no){
          alert("이미 동일한 이름이 있습니다.")
          return;
        }
      })
      const approvalLineList = [...lineData.approvalLine, {e_no:empData.e_no, e_name:empData.e_name, ap_category:"결재", e_rank:empData.e_rank}]
      const updatedLineData = {...lineData, approvalLine: approvalLineList};
      console.log(updatedLineData);
      handleLineData(updatedLineData)
    }
    else if(appMethod === "합의" && empData.e_no !== ""){
      lineData.agreement.forEach((element) => {
        if(element.e_no === empData.e_no){
          alert("이미 동일한 이름이 있습니다.")
          return;
        }
      })
      const agreementList = [...lineData.agreement, {e_no:empData.e_no, e_name:empData.e_name, ap_category:"합의", e_rank:empData.e_rank}]
      const updatedAgreementData = {...lineData, agreement: agreementList};
      handleLineData(updatedAgreementData);
    }
  }

  return (
    <>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="flexRadioDefault" id="approvalBtn" value="approval" onChange={(e)=> {
          if(e.target.checked ===true){
            setAppMethod("결재");
          }
        }}/>
      <label className="form-check-label" for="flexRadioDefault1">
        결재
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name="flexRadioDefault" id="agreeBtn" value="agreement" onChange={(e)=>{
          if(e.target.checked === true){
            setAppMethod("합의");
          }
        }}/>
      <label className="form-check-label" for="flexRadioDefault2">
        합의
      </label>
    </div>
    <button type="button" className="btn btn-secondary mt-3" onClick={handleClick}>선택</button>
  </>
  )
}

export default LineSelectBar