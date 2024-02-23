import React, { useState }from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import CounselUpdate from './CounselUpdate';
import { counselDelete } from '../../../services/api/memberApi';

const CounselDetail = ({counsel}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(counsel.COUNSEL_NO);
    
    const handleDelete= async()=>{
      if(window.confirm("이 상담일지를 삭제하시겠습니까?")){
        const res = await counselDelete(counsel.COUNSEL_NO);
        console.log(res.data);
        alert("삭제되었습니다");
        handleClose();
        window.location.reload(); 
      }

    }
  
  return (
    <>
    <div className='d-grid'>
      <Button gap={2}  variant="outline-primary" onClick={handleShow}>
        상세보기
      </Button>
    </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>상담 상세</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table  >
                <tbody>
                  <tr>
                    <th><strong>날짜</strong></th>
                     <td className='px-2'>{counsel.COUNSEL_DATE}</td>
                    <th><strong>상담방법</strong></th>
                     <td  style={{width: '23%'}}>{counsel.COUNSEL_HOW}</td>
                  </tr>
                  <tr>
                    <th><strong>상담시간</strong></th>
                     <td  className='px-2'>{counsel.COUNSEL_TIME}</td>
                     <th><strong>상담자</strong></th>
                     <td  style={{width: '23%'}}>{counsel.COUNSEL_MANAGER}</td>
                  </tr>
                  <tr>
                    <th style={{width: '23%'}}><strong>내용</strong></th>
                     <td  className='px-2' style={{overflow:'auto'}}>{counsel.COUNSEL_CONTENT}</td>
                  </tr>
              </tbody>
              </Table>
        </Modal.Body>
        <Modal.Footer>
        <CounselUpdate onClick={handleClose} counsel={counsel}/>
          <Button variant="danger" onClick={handleDelete} >
            삭제
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
}

export default CounselDetail