import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const NoticeTable = ({noticeList, handlePage}) => {
  return (
    <Table bordered hover style={{textAlign: "center"}}>
    <thead>
      <tr>
        <th>#</th>
        <th>제목</th>
        <th>작성자</th>
        <th>등록일</th>
        <th>첨부</th>
        <th>조회수</th>
      </tr>
    </thead>
    <tbody>
      {noticeList.map((notice, index)=>(
        <tr key={notice.N_NO} onClick={()=>handlePage("공지상세", notice.N_NO)}>
          <td>{notice.N_NO}</td>
          <td>{notice.N_TITLE}</td>
          <td>{notice.E_NAME}</td>
          <td>{notice.REG_DATE}</td>
          <td>{notice.N_ATT > 0 ? <FontAwesomeIcon icon={faPaperclip} /> : ""}</td>
          <td>{notice.N_HIT}</td>
        </tr>
      ))}
    </tbody>
  </Table>
  )
}

export default NoticeTable