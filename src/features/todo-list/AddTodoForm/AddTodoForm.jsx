import classes from "./AddTodoForm.module.scss";
import { useProgressContext } from "@features/progress/progress.context";
import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spacer from "@ui-kit/Spacer/Spacer";

const MIN_TODO_SYMBOLS = 3;

function AddTodoForm ({
  onAddTodo
}) {
  const [title, setTitle] = useState({
    value: '',
    isValid: false
  })
  const {isProgress} = useProgressContext();

  const onTitleChange = (e) => {
    setTitle({
      value: e.target.value,
      isValid: e.target.value?.length >= 3
    });
  }
  
  const onKeyPress = e => {
    if (e.which === 13) {
      if (isDisabled()) {
        return;
      }
      addTodoOnServer();
    }
  }

  const addTodoOnServer = () => {
    const newTodo = {
      title: title.value,
      isChecked: false
    };

    onAddTodo(newTodo)
      .then(() => {
        setTitle({
          value:'',
          isValid: false
        });
      })
      .finally(() => {
      });
  }

  const isDisabled = () => {
    return !title.isValid || isProgress;
  }

  return (
   <>
      <Form className={classes.AddTodoForm__Box} as='div'>
        <Form.Group controlId='title' className={classes.AddTodoForm__TitleField}>
          <Form.Control
            autoComplete='off'
            placeholder='What needs to be done?'
            value={title.value}
            onChange={onTitleChange}
            onKeyPress={onKeyPress}
          />
        </Form.Group>
        <Spacer mode='horizontal'/>

        <Button
          variant='primary'
          disabled={isDisabled()}
          onClick={addTodoOnServer}
        >
          Add Todo
        </Button>
      </Form>
      <Form.Text className={classes.AddTodoForm__HelperText}>
        Enter at least {MIN_TODO_SYMBOLS} symbols
      </Form.Text>
   </> 
  );
}

export default AddTodoForm;
