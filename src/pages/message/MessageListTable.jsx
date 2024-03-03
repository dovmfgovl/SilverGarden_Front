import { faEnvelope, faEnvelopeOpen, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Form, Table } from 'react-bootstrap'
import styles from './message.module.css'
const MessageListTable = ({messageList, handleMenu, messagePage}) => {
  return (
    <>
    <Table hover className={styles.messageTable}>
    <thead>
      <tr>
        <th style={{ width: '60px'}}><Form.Check aria-label="option 1"/></th>
        <th style={{ width: '60px'}}>읽음</th>
        <th style={{ width: '60px'}}>번호</th>
        <th>제목</th>
        {messagePage !== "보낸쪽지함" &&
        <>
          <th style={{ width: '150px'}}>보낸사람</th>
          <th style={{ width: '100px'}}>첨부</th>
          <th style={{ width: '250px'}}>받은날짜</th>
        </>
        }
        {messagePage === "보낸쪽지함" &&
        <>
          <th style={{ width: '150px'}}>받은사람</th>
          <th style={{ width: '100px'}}>첨부</th>
          <th style={{ width: '250px'}}>보낸날짜</th>
        </>
        }
      </tr>
    </thead>
    <tbody>
      {
        messagePage === "받은쪽지함" &&
        messageList && messageList.map((message)=>(
          <tr key={message.me_no}>
            <td><Form.Check aria-label="option 1"/></td>
            <td onClick={()=>handleMenu("받은쪽지상세", message)}>
              {message.read_status === 'N' && <FontAwesomeIcon icon={faEnvelope} />}
              {message.read_status === 'Y' && <FontAwesomeIcon icon={faEnvelopeOpen} />}
            </td>
            <td onClick={()=>handleMenu("받은쪽지상세", message)}>{message.me_no}</td>
            <td onClick={()=>handleMenu("받은쪽지상세", message)}>{message.me_title}</td>
            <td onClick={()=>handleMenu("받은쪽지상세", message)}>{message.writer_name}</td>
            <td onClick={()=>handleMenu("받은쪽지상세", message)}>
              {message.file.length !== 0 && <FontAwesomeIcon icon={faPaperclip} />}
            </td>
            <td onClick={()=>handleMenu("받은쪽지상세", message)}>{message.reg_date}</td>
          </tr>
        ))
      }
        {
        messagePage === "보낸쪽지함" &&
        messageList && messageList.map((message)=>(
          <tr key={message.me_no}>
            <td><Form.Check aria-label="option 1"/></td>
            <td onClick={()=>handleMenu("보낸쪽지상세", message)}>
              {message.recipient.some(item => item.read_status === 'Y') === true && <FontAwesomeIcon icon={faEnvelopeOpen} />}
              {message.recipient.some(item => item.read_status === 'Y') === false && <FontAwesomeIcon icon={faEnvelope} />}
            </td>
            <td onClick={()=>handleMenu("보낸쪽지상세", message)}>{message.me_no}</td>
            <td onClick={()=>handleMenu("보낸쪽지상세", message)}>{message.me_title}</td>
            <td onClick={()=>handleMenu("보낸쪽지상세", message)}>{
            message.recipient.length > 1 ? message.recipient[0].r_name+" 외 "+(message.recipient.length-1)+"명"
            : message.recipient[0].r_name
            }</td>
            <td onClick={()=>handleMenu("보낸쪽지상세", message)}>
              {message.file.length !== 0 && <FontAwesomeIcon icon={faPaperclip} />}
            </td>
            <td onClick={()=>handleMenu("보낸쪽지상세", message)}>{message.reg_date}</td>
          </tr>
        ))
      }
      {
        messagePage === "쪽지보관함" &&
        messageList && messageList.map((message)=>(
          <tr key={message.me_no}>
            <td><Form.Check aria-label="option 1"/></td>
            <td onClick={()=>handleMenu("보관된쪽지", message)}>
              {message.read_status === 'N' && <FontAwesomeIcon icon={faEnvelope} />}
              {message.read_status === 'Y' && <FontAwesomeIcon icon={faEnvelopeOpen} />}
            </td>
            <td onClick={()=>handleMenu("보관된쪽지", message)}>{message.me_no}</td>
            <td onClick={()=>handleMenu("보관된쪽지", message)}>{message.me_title}</td>
            <td onClick={()=>handleMenu("보관된쪽지", message)}>{message.writer_name}</td>
            <td onClick={()=>handleMenu("보관된쪽지", message)}>
              {message.file.length !== 0 && <FontAwesomeIcon icon={faPaperclip} />}
            </td>
            <td onClick={()=>handleMenu("보관된쪽지", message)}>{message.reg_date}</td>
          </tr>
        ))
      }
      {
        messagePage === "휴지통" &&
        messageList && messageList.map((message)=>(
          <tr key={message.me_no}>
            <td><Form.Check aria-label="option 1"/></td>
            <td onClick={()=>handleMenu("삭제된쪽지", message)}>
              {message.read_status === 'N' && <FontAwesomeIcon icon={faEnvelope} />}
              {message.read_status === 'Y' && <FontAwesomeIcon icon={faEnvelopeOpen} />}
            </td>
            <td onClick={()=>handleMenu("삭제된쪽지", message)}>{message.me_no}</td>
            <td onClick={()=>handleMenu("삭제된쪽지", message)}>{message.me_title}</td>
            <td onClick={()=>handleMenu("삭제된쪽지", message)}>{message.writer_name}</td>
            <td onClick={()=>handleMenu("삭제된쪽지", message)}>
              {message.file.length !== 0 && <FontAwesomeIcon icon={faPaperclip} />}
            </td>
            <td onClick={()=>handleMenu("삭제된쪽지", message)}>{message.reg_date}</td>
          </tr>
        ))
      }
    </tbody>
  </Table>
    </>
  )
}

export default MessageListTable