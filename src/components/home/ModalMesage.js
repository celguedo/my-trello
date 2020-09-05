import React from "react";
import Modal from 'emerald-ui/lib/Modal';
import Button from "emerald-ui/lib/Button";

export default function ModalMessage({ text, show, closeModal }) {
  return (
    <Modal
          show={show}
        >
          <Modal.Header closeButton={false}>
            <Modal.Title>My Trello Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {text}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>closeModal()} color="success">Accept</Button>
          </Modal.Footer>
        </Modal>
  );
}
