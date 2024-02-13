import React, { useState }from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import CounselUpdate from './CounselUpdate';

const CounselCreate = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <>
      <Button gap={2} variant="primary" onClick={handleShow}>
        상담일지 작성 
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>상담일지 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table  >
                <tbody>
                  <tr>
                    <th><strong>날짜</strong></th>
                     <td className='px-2'></td>
                    <th><strong>상담방법</strong></th>
                     <td  style={{width: '23%'}}></td>
                  </tr>
                  <tr>
                    <th><strong>상담시간</strong></th>
                     <td  className='px-2'> </td>
                     <th><strong>상담자</strong></th>
                     <td  style={{width: '23%'}}> </td>
                  </tr>
                  <tr>
                    <th style={{width: '23%'}}><strong></strong></th>
                     <td  className='px-2' style={{overflow:'auto'}}>

                     </td>
                  </tr>
              </tbody>
              </Table>
        </Modal.Body>
        <Modal.Footer>
        <CounselUpdate onClick={handleClose}/>
          <Button variant="danger" >
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

export default CounselCreate