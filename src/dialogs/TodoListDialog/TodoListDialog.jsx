import React from 'react';
import Form from 'react-bootstrap/Form';
import Dialog from '@ui-kit/Dialog/Dialog';
import Spacer from '@ui-kit/Spacer/Spacer';

function getStateFromProps(props, state) {
  return {
    ...state,
    show: props.show,
    title: {
      value: props.todoList?.title || '',
      isValid: isTitleValid(props.todoList?.title)
    },
    description: {
      value: props.todoList?.description || ''
    },
    prevProps: {
      show: props.show
    }
  };
}

function isTitleValid (value) {
  return value?.length >= 3;
}

class TodoListDialog extends React.Component {
  state = {
    show: false,
    prevProps: {
      show: false
    },
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: ''
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
        title={this.props.title}
        body={
          <Form as="div">
            <Form.Group controlId="title">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                autoComplete="off"
                placeholder="Enter title (3+ symbols)"
                onChange={this.onTitleChange}
                value={this.state.title.value}
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
                value={this.state.description.value}
              />
            </Form.Group>
          </Form>
        }
        confirmText={this.props.confirmText}
        disableConfirm={!this.isFormValid()}
        onClose={this.onClose}
        onConfirm={this.onConfirm}
      />
    );
  }

  onTitleChange = (e) => {
    const value = e.target.value;
    const isValid = isTitleValid(value);
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
        value: '',
        isValid: false
      },
      description: {
        value: ''
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

export default TodoListDialog;