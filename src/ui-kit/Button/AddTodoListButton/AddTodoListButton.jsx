import classes from "./AddTodoListButton.module.scss";
import {useTodoListDialogContext} from "@dialogs/TodoListDialog/todoListDialog.context";
import Tooltip from "@ui-kit/Tooltip/Tooltip";
import {Plus} from "react-bootstrap-icons";

function AddTodoListButton (){
  const {openAddTodoListDialog} = useTodoListDialogContext();

  const onMouseClick = () => {
    openAddTodoListDialog();
  }

  return (
    <>
      <Tooltip title='Add todo list' enterDelay={500}>
        <button
          className={classes.AddTodoListButton}
          onClick={onMouseClick}
        >
          <Plus
            className={classes.AddTodoListButton__Icon}
            size={35}
            color={'white'}
          />
        </button>
      </Tooltip>
    </>
  )
}

export default AddTodoListButton;