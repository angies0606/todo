import classes from "./Dialog.module.scss";
import Modal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";
import Button from "@ui-kit/Button/Button/Button";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import CloseButton from "react-bootstrap/CloseButton";

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
      <ModalHeader closeButton={false} className={classes.Dialog__Header}>
        <ModalTitle className={classes.Dialog__Title}>
          {title}
        </ModalTitle>
        <CloseButton
          onClick={handleClose}
          className={classes.Dialog__HeaderCloseButton}
        />
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
        <BootstrapButton
          variant='primary'
          onClick={handleConfirm}
          disabled={disableConfirm}
        >
          {confirmText}
        </BootstrapButton>
      </ModalFooter>
    </Modal>
  );
}

export default Dialog;