import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import styles from './approval.module.css'

const ApprovalLineModal = (props) => {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        결재선 관리
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className={styles.lineSelectorWrap}>
        <div className={styles.lineTree}>tree</div>
        <div className={styles.selectBar}>selectbar</div>
        <div className={styles.selectedApprovalLine}>approval</div>
        <div className={styles.selectedAgreeLine}>agreement</div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ApprovalLineModal