import { Card } from "react-bootstrap";
import classes from './HomePage.module.scss';
import { Button } from "react-bootstrap";
import TodoListDialog from "@dialogs/TodoListDialog/TodoListDialog";
import { useState } from "react";
import {useTodoListDialogContext} from '@dialogs/TodoListDialog/todoListDialog.context'

function HomePage () {
  // const [isAddTodoListDialogVisible, setIsAddTodoListDialogVisible] = useState(false);
  const {openAddTodoListDialog} = useTodoListDialogContext();

  const onButtonClick = () => {
    openAddTodoListDialog();
    // setIsAddTodoListDialogVisible(true);
  }
  // const onAddTodoListDialogClose = () => {
  //   setIsAddTodoListDialogVisible(false);
  // }

  return (
    <>
      <div className={classes.HomePage__Box}>
        <h1>
          Welcome! 
        </h1>
        <h2>
          Plan everything with <span>WhatToDo</span> 
        </h2>
        <h3>
          What we will do today?
        </h3>
        <Button
          variant="primary"
          className={classes.HomePage__Button}
          onClick={onButtonClick}
        >
          Add new list
        </Button>
      </div>
      {/* < TodoListDialog
        show={isAddTodoListDialogVisible}
        onClose={onAddTodoListDialogClose}
        // onConfirm={onAddTodoList}
        title={'Add new list'}
        confirmText={'Add'}
      /> */}
    </>
  )
}

export default HomePage;