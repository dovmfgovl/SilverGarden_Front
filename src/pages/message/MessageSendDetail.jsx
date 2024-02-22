import React from 'react'
import styles from './message.module.css'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { messageFileDownload } from '../../services/api/messageApi'

const MessageSendDetail = ({handleMenu, empData, messageDetail}) => {
  console.log(messageDetail);
  const handleFileDownload = (filename) =>{
    const response = messageFileDownload(filename);
    console.log(response.data);
  }
  return (
    <div className={styles.detailWrap}>
    <div className={styles.detailBtnGroup}>
      <Button className="mt-3" variant="outline-secondary" onClick={()=>handleMenu("보낸쪽지함")}>목록</Button>{' '}
      <Button className="mt-3" variant="outline-danger">삭제</Button>{' '}
    </div>
    <div className={styles.detailHeader}>
      <InputGroup className="mb-1">
        <InputGroup.Text id="basic-addon1" style={{width: "100px"}}>보낸사람</InputGroup.Text>
        <Form.Control
            value={messageDetail.recipient.map((element) => element.r_name+" "
            )}
            readOnly
          />
      </InputGroup>   
      <InputGroup className="mb-1">
        <InputGroup.Text id="basic-addon1" style={{width: "100px"}} >제목</InputGroup.Text>
        <Form.Control
          value={messageDetail.me_title}
          readOnly
        />
      </InputGroup>
      <InputGroup className="mb-1">
        <InputGroup.Text id="basic-addon1" style={{width: "100px"}}>보낸날짜</InputGroup.Text>
        <Form.Control
          value={messageDetail.reg_date}
        />
      </InputGroup>
      <InputGroup className="mb-1" style={{width: "100%"}}>
        <InputGroup.Text  Text id="basic-addon1" style={{width: "100px", height: "100px"}}><FontAwesomeIcon icon={faPaperclip}/>첨부파일</InputGroup.Text>
        <InputGroup.Text  Text id="basic-addon1" style={{width: "calc(100% - 100px)", backgroundColor: "white", display:"flex", flexDirection:"column", alignItems:"flex-start"}}> 
        {messageDetail.file && messageDetail.file.length > 0 && messageDetail.file.map(file =>
        <div key={file.me_file_no}>
          {file.me_filename}
          <button style={{border: "none",backgroundColor: "white"}} onClick={()=>handleFileDownload(file.me_filename)}>
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>
      )}
      </InputGroup.Text>
      </InputGroup>
    </div>
    <div className={styles.detailContent}>
    <InputGroup style={{height:"100%"}}>
    <InputGroup.Text id="basic-addon1" style={{width: "100px"}}>내용</InputGroup.Text>
      <Form.Control as="textarea" aria-label="With textarea" style={{height:"100%"}} value={messageDetail.me_title} readOnly/>
    </InputGroup>
    </div>
  </div>
  )
}

export default MessageSendDetail