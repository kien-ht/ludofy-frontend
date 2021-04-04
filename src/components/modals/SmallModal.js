import React from "react";
import { Modal } from "react-bootstrap";

export default function SmallModal({ title, content, isShown, setModal }) {
  return (
    <>
      <Modal
        size="sm"
        show={isShown}
        onHide={() => setModal({ isShown: false, title: "", content: "" })}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
      </Modal>
    </>
  );
}
