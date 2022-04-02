import React from 'react';
import Modal from 'react-bootstrap/Modal';
import MuiButton from 'react-bootstrap/Button';
import Button from '@ui-kit/Button/Button/Button';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import classes from './Dialog.module.scss';

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
      <ModalHeader closeButton className= {classes.Dialog__Header}>
        <ModalTitle className= {classes.Dialog__Title}>
          {title}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        {body}
      </ModalBody>
      <ModalFooter>
        <Button 
          onClick={handleClose}
          className={classes.Dialog__CloseButton}
        >
          {cancelText}
        </Button>
        <MuiButton
          variant="primary"
          onClick={handleConfirm}
          disabled={disableConfirm}
        >
          {confirmText}
        </MuiButton>
      </ModalFooter>
    </Modal>
  );
}

export default Dialog;