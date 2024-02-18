import React, { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { passOrDeny } from '../../../services/api/approvalApi';

const CommentModal = ({show, onHide, docNo, lineData, empData}) => {
  const [passDeny, setPassDeny] = useState(true);
  const commentRef = useRef(); 

  const handleSubmit = async () =>{
    const ap_comment = commentRef.current.value;
    console.log(ap_comment);
    const ap_result = passDeny ? '승인' : '반려';
    let apData = []
    apData.push(...lineData.approvalLine.filter((line) => line.ap_id === empData.e_no))//현재 접속자가 결재자인지 찾아서 배열에 넣어줌
    apData.push(...lineData.agreement.filter((line) => line.ap_id === empData.e_no))//현재 접속자가 합의자인지 찾아서 배열에 넣어줌

    if(apData.length === 1){//접속자 정보와 일치하는 사람은 한명밖에 없음
      const putData = {
        d_no: docNo,//문서번호
        ap_no: apData[0].ap_no,//결재이력번호
        ap_id: apData[0].ap_id,//결재자id
        ap_category: apData[0].ap_category,
        ap_lev: apData[0].ap_lev,
        ap_result,
        ap_comment
      }
      console.log(putData);
      const response = await passOrDeny(putData);
      if(response.data === "ok"){
        alert("결재가 완료되었습니다.")
        onHide()
        
      }
    }else if(apData.length === 0){
      alert("결재해당자가 아님")
    }else{
      alert("한 문서에 중복된 결재/합의자가 있습니다.")
    }
    
  }

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>결재의견</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Check aria-label="option 1" label='승인' checked={passDeny} onClick={()=>setPassDeny(true)}/>
            <Form.Check aria-label="option 1" label='반려' checked={!passDeny} onClick={()=>setPassDeny(false)}/>
            <br></br>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>의견입력</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="결재의견을 입력해주세요" ref={commentRef}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            결재완료
          </Button>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommentModal