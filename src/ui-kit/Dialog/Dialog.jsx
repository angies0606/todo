import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';

function getStateFromProps(props) {
  return {
    show: props.show,
    prevProps: {
      show: props.show
    }
  };
}

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
class Dialog extends React.Component {
  state = getStateFromProps(this.props);

  static getDerivedStateFromProps(props, state) {
    if (state.prevProps.show !== props.show) {
      return getStateFromProps(props);
    }
    return null;
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <ModalHeader closeButton={true}>
          <ModalTitle>
            {this.props.title}
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          {this.props.body}
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={this.handleClose}>
            {this.props.cancelText || 'Cancel'}
          </Button>
          <Button
            variant="primary"
            onClick={this.handleConfirm}
            disabled={this.props.disableConfirm}
          >
            {this.props.confirmText || 'Ok'}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  handleClose = () => {
    this.setState({
      show: false
    });

    this.props.onClose();
  }

  handleConfirm = () => {
    this.setState({
      show: false
    });

    this.props.onConfirm();
  }
}

export default Dialog;