import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Dialog from '@ui-kit/Dialog/Dialog';
import Spacer from '@ui-kit/Spacer/Spacer';

function isTitleValid (value) {
  return value?.length >= 3;
}

function TodoListDialog(props) {
  const [title, setTitle] = useState({
    value: '',
    isValid: false
  });
  const [description, setDescription] = useState({
    value: ''
  })

  useEffect(() => {
    if (props.todoList) {
      setTitle({
        value: props.todoList.title,
        isValid: isTitleValid(props.todoList.title)
      });
      setDescription({
        value: props.todoList.description
      });
    }
  }, [props.todoList]);

  const onTitleChange = e => {
    setTitle({
      value: e.target.value,
      isValid: isTitleValid(e.target.value)
    });
  };

  const onDescriptionChange = e => {
    setDescription({
      value: e.target.value
    });
  };

  const resetFormState = () => {
    setTitle({
      value: '',
      isValid: false
    });
    setDescription({
      value: ''
    });
  }

  const onClose = () => {
    props.onClose();
    resetFormState();
  }

  const onConfirm = () => {
    props.onConfirm({
      title: title.value,
      description: description.value
    });
    resetFormState();
  }

  const isFormValid = () => {
    return title?.isValid;
  }

  return (
    <Dialog
      show={props.show}
      title={props.title}
      body={
        <Form as="div">
          <Form.Group controlId="title">
            <Form.Label>Title *</Form.Label>
            <Form.Control
              autoComplete="off"
              placeholder="Enter title (3+ symbols)"
              onChange={onTitleChange}
              value={title.value}
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
              onChange={onDescriptionChange}
              value={description.value}
            />
          </Form.Group>
        </Form>
      }
      confirmText={props.confirmText}
      disableConfirm={!isFormValid()}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}

export default TodoListDialog;