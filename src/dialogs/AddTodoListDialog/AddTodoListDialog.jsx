import React from 'react';
import Form from 'react-bootstrap/Form';
import Dialog from '@ui-kit/Dialog/Dialog';
import Spacer from '@ui-kit/Spacer/Spacer';

function getStateFromProps(props, state) {
  return {
    ...state,
    show: props.show,
    prevProps: {
      show: props.show
    }
  };
}

class AddTodoListDialog extends React.Component {
  state = {
    show: false,
    prevProps: {
      show: false
    },
    title: {
      value: null,
      isValid: false
    },
    description: {
      value: null
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (state.prevProps.show !== props.show) {
      return getStateFromProps(props, state);
    }
    return null;
  }

  handleClose = () => {
    this.setState({
      show: false
    });

    this.props.onClose();
  }

  render() {
    return (
      <Dialog
        show={this.props.show}
        title='Add new list'
        body={
          <Form as="div">
            <Form.Group controlId="title">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                autoComplete="off"
                placeholder="Enter title (3+ symbols)"
                onChange={this.onTitleChange}
              />
            </Form.Group>

            <Spacer />

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                autoComplete="off"
                as="textarea"
                rows={3}
                placeholder="Enter description"
                onChange={this.onDescriptionChange}
              />
            </Form.Group>
          </Form>
        }
        confirmText='Add'
        disableConfirm={!this.isFormValid()}
        onClose={this.onClose}
        onConfirm={this.onConfirm}
      />
    );
  }

  onTitleChange = (e) => {
    const value = e.target.value;
    const isValid = value?.length >= 3;
    this.setState({
      ...this.state,
      title: {
        value,
        isValid
      }
    });
  }

  onDescriptionChange = (e) => {
    this.setState({
      ...this.state,
      description: {
        value: e.target.value
      }
    });
  }

  resetFormState() {
    this.setState({
      ...this.state,
      title: {
        value: null,
        isValid: false
      },
      description: {
        value: null
      }
    });
  }

  onClose = () => {
    this.props.onClose();
    this.resetFormState();
  }

  onConfirm = () => {
    this.props.onConfirm({
      title: this.state.title.value,
      description: this.state.description.value
    });
    this.resetFormState();
  }

  isFormValid() {
    return this.state.title?.isValid;
  }
}

export default AddTodoListDialog;