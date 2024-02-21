import React, { useState } from 'react'
import styles from './message.module.css'
import { Button, Form, InputGroup } from 'react-bootstrap'
import MessageAddressBook from './MessageAddressBook'

const MessageWrite = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className={styles.writeWrap}>
      <div className={styles.writeBtnGroup}>
        <Button variant="primary" >보내기</Button>{' '}
        <Button variant="danger" >취소</Button>{' '}
      </div>
      <div className={styles.writeHeader}>
        <InputGroup className="mb-1">
              <InputGroup.Text id="basic-addon1" style={{width: "100px"}}>받는사람</InputGroup.Text>
              <Form.Control
                placeholder="받는사람"
              />
              <Button variant="primary" onClick={() => setModalShow(true)}>주소록</Button>{' '}
          </InputGroup>   
          <InputGroup className="mb-1">
            <InputGroup.Text id="basic-addon1" style={{width: "100px"}}>제목</InputGroup.Text>
            <Form.Control
              placeholder="제목"
            />
          </InputGroup>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label >파일첨부</Form.Label>
            <Form.Control type="file" multiple />
          </Form.Group>
          <MessageAddressBook show={modalShow} onHide={() => setModalShow(false)}/>
      </div>
      <div className={styles.writeContent}>
      <InputGroup style={{height:"100%"}}>
        <Form.Control as="textarea" aria-label="With textarea" style={{height:"100%"}} />
      </InputGroup>
      </div>
    </div>
  )
}
export default MessageWrite