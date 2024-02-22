import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({ show, handleClose, handleDelete }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <h5 style={{ textAlign: "center" }}>해당 부서를 삭제하시겠습니까?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} size="sm">
            취소
          </Button>
          <Button
            variant="primary"
            type="submit"
            size="sm"
            onClick={handleDelete}
          >
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
