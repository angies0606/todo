import classes from './AddTodoListButton.module.scss';
import {Plus} from 'react-bootstrap-icons';
import {useState} from 'react';
import TodoListDialog from '@dialogs/TodoListDialog/TodoListDialog';

function AddTodoListButton ({
  addTodoList
}){
  const [hover, setHover] = useState(false);
  const [isAddTodoListDialogVisible, setIsAddTodoListDialogVisible] = useState(false);
  // state = {
  //   hover: false,
  //   isAddTodoListDialogVisible: false
  // };
  
  const onAddTodoList = (newTodoList) => {
    return fetch('http://localhost:8000/todo-lists', {
      method: 'POST',
      body: JSON.stringify(newTodoList),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
      .then((result) => result.json())
      .then((result) => {
        addTodoList(result);
        onAddTodoListDialogClose();
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const onAddTodoListDialogClose = () => {
    setIsAddTodoListDialogVisible(false);
  }

  const onMouseClick = () => {
    setIsAddTodoListDialogVisible(true);
  }

  const onMouseEnter = () => {
    setHover(true);
  }

  const onMouseLeave = () => {
    setHover(false);
  }

  // const addTodoListOnConfirm = (data) => {
  //   onAddTodoListDialogClose();
  //   addTodoList(data);
  // }

  return (
    <>
      <button
        className={classes.AddTodoListButton}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onMouseClick}
      >
        <Plus
          className={classes.AddTodoListButton__icon}
          size={35}
          color={hover ? 'white' : 'coral'}
        />
      </button>

      <TodoListDialog
        show={isAddTodoListDialogVisible}
        onClose={onAddTodoListDialogClose}
        onConfirm={onAddTodoList}
        title={'Add new list'}
        confirmText={'Add'}
      />
    </>
  )
}

export default AddTodoListButton;