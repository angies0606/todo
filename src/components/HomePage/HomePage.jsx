import classes from "./HomePage.module.scss";
import {useTodoListDialogContext} from "@dialogs/TodoListDialog/todoListDialog.context";
import { Button } from "react-bootstrap";

function HomePage () {
  const {openAddTodoListDialog} = useTodoListDialogContext();

  const onButtonClick = () => {
    openAddTodoListDialog();
  }

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
          variant='primary'
          className={classes.HomePage__Button}
          onClick={onButtonClick}
        >
          Add new list
        </Button>
      </div>
    </>
  )
}

export default HomePage;