import classes from './AddTodoListButton.module.scss';
import {Plus} from 'react-bootstrap-icons';
import {useState} from 'react';
import TodoListDialog from '@dialogs/TodoListDialog/TodoListDialog';
import Tooltip from '@ui-kit/Tooltip/Tooltip';
import * as api from '@api/api';

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
    return api.addTodoList({
      ...newTodoList,
      todos: []
    }).then((result) => {
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
      <Tooltip title='Add todo list'>
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
      </Tooltip>

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