import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spacer from '@ui-kit/Spacer/Spacer';
import classes from './AddTodoForm.module.scss';

function AddTodoForm ({
  onAddTodo
}) {
  const [title, setTitle] = useState({
    value: '',
    isValid: false
  })
  const [isProgress, setIsProgress] = useState(false);
  
  const onTitleChange = (e) => {
    // const value = e.target.value;
    // const isValid = value?.length >= 3;
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
    setIsProgress(true);

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
        setIsProgress(false)
      });
  }

  const isDisabled = () => {
    return !title.isValid || isProgress;
  }

  return (
    <Form className={classes.AddTodo__Form} as="div">
      <Form.Group controlId="title" className={classes.AddTodo__TitleField}>
        <Form.Control
          autoComplete="off"
          placeholder="What needs to be done?"
          value={title.value}
          onChange={onTitleChange}
          onKeyPress={onKeyPress}
        />
      </Form.Group>

      <Spacer mode="horizontal"/>

      <Button
        variant="primary"
        disabled={isDisabled()}
        onClick={addTodoOnServer}
      >
        Add Todo
      </Button>
      {isProgress && <div>Working...</div>}
    </Form>
  );
}

export default AddTodoForm;
