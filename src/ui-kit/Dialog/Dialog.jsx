import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';

/**
 * Props:
 * - show: boolean
 * - title: string
 * - body: jsx
 * - cancelText: string
 * - confirmText: string
 * - disableConfirm: boolean
 * - onClose: () => void
 * - onConfirm: (result) => void
 */
function Dialog({
  onClose,
  onConfirm,
  show,
  title,
  body,
  cancelText = 'Cancel',
  confirmText = 'Ok',
  disableConfirm
}) {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton={true}>
        <ModalTitle>
          {title}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        {body}
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          {cancelText}
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={disableConfirm}
        >
          {confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default Dialog;