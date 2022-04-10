import classes from "./Modal.module.scss";
import BootstrapModal from "react-bootstrap/Modal"; 
import BootstrapButton from "react-bootstrap/Button";
import Button from "@ui-kit/Button/Button/Button";

function Modal ({
  show,
  onConfirm,
  onClose,
  title
}) {
  return (
    <BootstrapModal 
      show={show} 
      onHide={onClose} 
      aria-labelledby='contained-modal-title-vcenter'
      centered 
    >
      <BootstrapModal.Header closeButton className={classes.Modal__Header} >
        <BootstrapModal.Title></BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body className='text-center'>{title}</BootstrapModal.Body>
      <BootstrapModal.Footer className={classes.Modal__Footer}>
        <Button onClick={onClose} className={classes.Modal__CloseButton}>
          Close
        </Button>
        <BootstrapButton variant='primary' onClick={onConfirm}>
          Confirm
        </BootstrapButton>
      </BootstrapModal.Footer>
    </BootstrapModal>
  )
}

export default Modal;