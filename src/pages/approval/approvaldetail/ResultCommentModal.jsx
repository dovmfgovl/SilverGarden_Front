import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ResultCommentModal = ({show, onHide, result}) => {
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>결재의견</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {result.ap_comment}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ResultCommentModal