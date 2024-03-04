import React, { useRef, useState } from 'react'
import styles from './message.module.css'
import { Button, Form, InputGroup } from 'react-bootstrap'
import MessageAddressBook from './MessageAddressBook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark } from '@fortawesome/free-solid-svg-icons'
import { messageSend } from '../../services/api/messageApi'

const MessageWrite = ({empData, handleMenu}) => {
  const [modalShow, setModalShow] = useState(false);
  const [fileList, setFileList] = useState([])//파일리스트를 관리할 state
  const [receiverList, setReceiverList] = useState([])

  const handleFile = (e) =>{//파일리스트를 업데이트할 함수선언
    const selectedFiles = Array.from(e.target.files);
    // 파일 배열 상태 업데이트
    setFileList([...selectedFiles]);
  }
  const addReceiverList = (receiverData) =>{
    const exists = receiverList.some(receiver => receiver.r_id === receiverData.e_no);
      // 존재하지 않는 경우에만 receiverList에 추가
    if (!exists) {
      setReceiverList(receiverList => [
        ...receiverList,
        {r_id: receiverData.e_no, r_name: receiverData.e_name}
      ]);
    } else {
      // 여기서 사용자에게 동일한 id가 이미 존재한다는 것을 알릴 수 있습니다.
      alert("이미 추가된 사용자입니다.")
    }
  }

   const titleRef = useRef(null);//input값을 참조할 ref 선언
   const contentRef = useRef(null);//input값을 참조할 ref 선언

  const handleSubmit = async () =>{//서브밋이 요청되었을 때 일하는 함수
    const title = titleRef.current.value;
    const content = contentRef.current.value
    if(receiverList.length === 0){
      alert("받는사람을 설정해주세요")
      return
    }

    if("" !== title && "" !== content){
      const formDataToSend = new FormData();
      formDataToSend.append('me_title', title)
      formDataToSend.append('me_content', content)
      formDataToSend.append('send_id', empData.e_no)
      formDataToSend.append('receiverList', JSON.stringify(receiverList))
  
      if(fileList.length !== 0){//파일이 있는 경우에만
        for(let i = 0; i < fileList.length; i++){
          formDataToSend.append('files', fileList[i]);
        }
      }

      const response = await messageSend(formDataToSend)
      if(response.data === "ok"){
        alert("쪽지를 성공적으로 보냈습니다.")
        handleMenu("보낸쪽지함")
      }
    }else{
      alert("제목과 내용을 작성해주세요")
    }
  }

  return (
    <div className={styles.writeWrap}>
      <div className={styles.writeBtnGroup}>
        <Button variant="primary" onClick={handleSubmit}>보내기</Button>{' '}
        <Button variant="danger" onClick={()=>handleMenu("받은쪽지함")}>취소</Button>{' '}
      </div>
      <div className={styles.writeHeader}>
        <InputGroup className="mb-1">
              <InputGroup.Text id="basic-addon1" style={{width: "100px"}}>받는사람</InputGroup.Text>
              <InputGroup.Text id="basic-addon1" style={{width: "calc(100% - 180px)", backgroundColor:"white"}}>
                {receiverList.map((receiver)=>
                <div key={receiver.r_id} style={{backgroundColor:'lightgrey', borderRadius:"8%", cursor:"pointer", margin: "0 5px"}} onClick={()=>{
                  const newList = receiverList.filter((element)=> element.r_id !== receiver.r_id)
                  setReceiverList([...newList])
                }}>
                  {receiver.r_name}
                  <FontAwesomeIcon icon={faXmark}/>
                </div>
                )}
              </InputGroup.Text>
              <Button variant="primary" onClick={() => setModalShow(true)}>주소록</Button>{' '}
          </InputGroup>   
          <InputGroup className="mb-1">
            <InputGroup.Text id="basic-addon1" style={{width: "100px"}} >제목</InputGroup.Text>
            <Form.Control
              placeholder="제목"
              ref={titleRef}
            />
          </InputGroup>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label >파일첨부</Form.Label>
            <Form.Control type="file" multiple onChange={handleFile}/>
          </Form.Group>
          <MessageAddressBook show={modalShow} addReceiverList={addReceiverList} onHide={() => setModalShow(false)}/>
      </div>
      <div className={styles.writeContent}>
      <InputGroup style={{height:"100%"}}>
        <Form.Control as="textarea" aria-label="With textarea" style={{height:"100%"}} ref={contentRef}/>
      </InputGroup>
      </div>
    </div>
  )
}
export default MessageWrite