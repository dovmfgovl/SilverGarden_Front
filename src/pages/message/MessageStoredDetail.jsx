import React from 'react'
import styles from './message.module.css'
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { messageDelete, messageFileDownload } from '../../services/api/messageApi';

const MessageStoredDetail = ({handleMenu, empData, messageDetail}) => {

  const handleFileDownload = (filename) =>{
    const response = messageFileDownload(filename);
  }
  
  const handleDeleteBtn = async () =>{
    const response = await messageDelete({r_id:empData.e_no, me_no:messageDetail.me_no})
    if(response.data === "ok"){
      alert("쪽지가 삭제되었습니다.")
      handleMenu("받은쪽지함")
    }
  }

  return (
    <div className={styles.detailWrap}>
      <div className={styles.detailBtnGroup}>
        <Button className="mt-3" variant="outline-secondary" onClick={()=>handleMenu("받은쪽지함")}>목록</Button>{' '}
        <Button className="mt-3" variant="outline-primary">답장</Button>{' '}
        <Button className="mt-3" variant="outline-danger" onClick={handleDeleteBtn}>삭제</Button>{' '}
      </div>
      <div className={styles.detailHeader}>
        <InputGroup className="mb-1">
          <InputGroup.Text id="basic-addon1" style={{width: "100px"}}>보낸사람</InputGroup.Text>
          <Form.Control
              placeholder="보낸사람"
              value={messageDetail.writer_name}
              readOnly
            />
        </InputGroup>   
        <InputGroup className="mb-1">
          <InputGroup.Text id="basic-addon1" style={{width: "100px"}} >제목</InputGroup.Text>
          <Form.Control
            placeholder="제목"
            value={messageDetail.me_title}
            readOnly
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
        <Form.Control 
          as="textarea" 
          aria-label="With textarea" 
          style={{height:"100%"}}
          value={messageDetail.me_content}
          readOnly/>
      </InputGroup>
      </div>
    </div>
  )
}

export default MessageStoredDetail