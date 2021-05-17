import React from 'react';
import Form from 'react-bootstrap/Form';
import Dialog from '@ui-kit/Dialog/Dialog';
import Spacer from '@ui-kit/Spacer/Spacer';

function getStateFromProps(props, state) {
  return {
    show: props.show,
    prevProps: {
      show: props.show
    },
    title: state?.title,
    description: state?.description
  };
}

class AddTodoListDialog extends React.Component {
  state = getStateFromProps(this.props);

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
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                placeholder="Enter title"
                onChange={this.onTitleChange}
              />
            </Form.Group>

            <Spacer />

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                onChange={this.onDescriptionChange}
              />
            </Form.Group>
          </Form>
        }
        confirmText='Add'
        onClose={this.onClose}
        onConfirm={this.onConfirm}
      />
    );
  }

  onTitleChange = (e) => {
    this.setState({
      ...this.state,
      title: e.target.value
    });
  }

  onDescriptionChange = (e) => {
    this.setState({
      ...this.state,
      description: e.target.value
    });
  }

  resetFormState() {
    this.setState({
      ...this.state,
      title: null,
      description: null
    });
  }

  onClose = () => {
    this.props.onClose();
    this.resetFormState();
  }

  onConfirm = () => {
    this.props.onConfirm({
      title: this.state.title,
      description: this.state.description
    });
    this.resetFormState();
  }
}

export default AddTodoListDialog;