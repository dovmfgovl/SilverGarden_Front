import React, { useState }from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

const CounselUpdate = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <>
      <Button gap={2} variant="primary" onClick={handleShow}>
        수정
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>수정하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table  >
                <tbody>
                  <tr>
                    <th><strong>날짜</strong></th>
                     <td className='px-2'>2023-02-03</td>
                    <th><strong>나이</strong></th>
                     <td  style={{width: '23%'}}>전화통화</td>
                  </tr>
                  <tr>
                    <th><strong>상담시간</strong></th>
                     <td  className='px-2'> 13:00</td>
                     <th><strong>상담자</strong></th>
                     <td  style={{width: '23%'}}> 이성계</td>
                  </tr>
                  <tr>
                    <th style={{width: '23%'}}><strong>내용</strong></th>
                     <td  className='px-2' style={{overflow:'auto'}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi necessitatibus fuga asperiores cum? Placeat excepturi nisi magni odio cum aspernatur iste quidem repudiandae assumenda molestiae laboriosam aperiam, officia similique quas!</td>
                  </tr>
              </tbody>
              </Table>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" >
            수정
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
}

export default CounselUpdate