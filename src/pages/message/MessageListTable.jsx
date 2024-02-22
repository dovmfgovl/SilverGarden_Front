import React from 'react'
import { Form, Table } from 'react-bootstrap'

const MessageListTable = ({messageList, handleMenu, messagePage}) => {
  return (
    <>
    <Table bordered hover style={{textAlign: "center", margin:0}}>
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
          <th style={{ width: '150px'}}>받은날짜</th>
        </>
        }
        {messagePage === "보낸쪽지함" &&
        <>
          <th style={{ width: '150px'}}>받은사람</th>
          <th style={{ width: '100px'}}>첨부</th>
          <th style={{ width: '150px'}}>보낸날짜</th>
        </>
        }
      </tr>
    </thead>
    <tbody>
      {messageList && messageList.map((message)=>(
        <tr key={message.me_no}>
          <td><Form.Check aria-label="option 1"/></td>
          <td onClick={()=>handleMenu(messagePage, message.me_no)}>{message.me_read}</td>
          <td onClick={()=>handleMenu(messagePage, message.me_no)}>{message.me_no}</td>
          <td onClick={()=>handleMenu(messagePage, message.me_no)}>{message.me_title}</td>
          <td onClick={()=>handleMenu(messagePage, message.me_no)}>{message.me_writer}</td>
          <td onClick={()=>handleMenu(messagePage, message.me_no)}>{message.me_file}</td>
          <td onClick={()=>handleMenu(messagePage, message.me_no)}>{message.reg_date}</td>
        </tr>
      ))}
    </tbody>
  </Table>
    </>
  )
}

export default MessageListTable