import {connect} from "react-redux";
import {putTodoListsActionCreator} from "@store/actions";
import TodoListDialogProvider from "./TodoListDialogProvider";

const mapDispatchToProps = dispatch => {
  return {
    addTodoList: todoList => {
      dispatch(putTodoListsActionCreator([todoList]));
    },
    editTodoList: todoList => {
      dispatch(putTodoListsActionCreator([todoList]));
    }
  }
};

const TodoListDialogProviderConnected = connect(null, mapDispatchToProps)(TodoListDialogProvider);

export default TodoListDialogProviderConnected;