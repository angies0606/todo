import classes from "./TodoListDialog.module.scss";
import {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import Dialog from "@ui-kit/Dialog/Dialog";
import Spacer from "@ui-kit/Spacer/Spacer";
import LinearProgress from "@mui/material/LinearProgress";

const MAX_TITLE_SYMBOLS = 50;
const MIN_TITLE_SYMBOLS = 3;
const MAX_DESCRIPTION_SYMBOLS = 350;

function isTitleValid (value) {
  return value?.length >= MIN_TITLE_SYMBOLS && value?.length <= MAX_TITLE_SYMBOLS;
}

function isDescriptionValid (value) {
  return value?.length <= MAX_DESCRIPTION_SYMBOLS;
}

function TodoListDialog(props) {
  const [title, setTitle] = useState({
    value: '',
    isValid: false
  });
  const [description, setDescription] = useState({
    value: '',
    isValid: true
  });
  const [timeCreation, setTimeCreation] = useState({
    createdAt: null
  });
  const [isProgress, setIsProgress] = useState(false);

  useEffect(() => {
    if (props.todoList) {
      setTitle({
        value: props.todoList.title,
        isValid: isTitleValid(props.todoList.title)
      });
      setDescription({
        value: props.todoList.description,
        isValid: isDescriptionValid(props.todoList.description)
      });
      setTimeCreation({
        createdAt: props.todoList.createdAt
      })
    }
  }, [props.todoList]);
 
  const onConfirmTodoList = () => {
    setIsProgress(true);

    const todoListData = {
      title: title.value,
      description: description.value,
      createdAt: timeCreation.createdAt || Date.now() 
    }

    props.onConfirm(todoListData)
      .then(() => {
        resetFormState();
      })
      .finally(() => {
        setIsProgress(false);
      });  
  }

  const onTitleChange = e => {
    setTitle({
      value: e.target.value,
      isValid: isTitleValid(e.target.value)
    });
  };

  const onDescriptionChange = e => {
    setDescription({
      value: e.target.value,
      isValid: isDescriptionValid(e.target.value)
    });
  };

  const resetFormState = () => {
    setTitle({
      value: '',
      isValid: false
    });
    setDescription({
      value: '',
      isValid: true
    });
  }

  const onClose = () => {
    props.onClose();
    resetFormState();
  }

  const isFormValid = () => {
    return title?.isValid && description?.isValid;
  }

  return (
    <Dialog
      show={props.show}
      title={props.title}
      body={
        <>
          {
            isProgress &&
            <LinearProgress className={classes.TodoListDialog__ProgressBar} variant='indeterminate' color='warning' />
          }
          <Form as='div'>
            <Form.Group controlId='title'>
              <Form.Label className={classes.TodoListDialog__Label}>Title <span>*</span></Form.Label>
              <Form.Control
                autoComplete='off'
                placeholder='Enter title'
                onChange={onTitleChange}
                maxLength={MAX_TITLE_SYMBOLS}
                value={title.value}
              />
              <Form.Text className={classes.TodoListDialog__HelperText}>
                Enter at least {MIN_TITLE_SYMBOLS} up to {MAX_TITLE_SYMBOLS} symbols
              </Form.Text>
            </Form.Group>

            <Spacer />

            <Form.Group controlId='description'>
              <Form.Label className={classes.TodoListDialog__Label}>Description</Form.Label>
              <Form.Control
                autoComplete='off'
                as='textarea'
                rows={4}
                maxLength={MAX_DESCRIPTION_SYMBOLS}
                placeholder='Enter description'
                onChange={onDescriptionChange}
                value={description.value}
                style={{maxHeight: 150, minHeight: 70}}
              />
              <Form.Text className={classes.TodoListDialog__HelperText}>
                 Maximum {MAX_DESCRIPTION_SYMBOLS} symbols
              </Form.Text>
            </Form.Group>
          </Form>
        </>
      }
      confirmText={props.confirmText}
      disableConfirm={!isFormValid() || isProgress}
      onClose={onClose}
      onConfirm={onConfirmTodoList}
    />
  );
}

export default TodoListDialog;