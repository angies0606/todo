import { connect } from "react-redux";
import {
  deleteTodoListActionCreator,
  deleteTodosActionCreator,
  putTodoListsActionCreator
} from "@store/actions";
import Sidebar from "./Sidebar";

const mapStateToProps = (state) => ({
  todoLists: state.todoLists.map(todoListId => state.entities.todoLists[todoListId]),
  todoListsIds: state.todoLists
});

const mapDispatchToProps = (dispatch) => {
  return {
    editTodoList: (todoList) => {
      dispatch(putTodoListsActionCreator([todoList]));
    },

    deleteTodoList: (todoList) => {
      dispatch(deleteTodoListActionCreator(todoList.id));
      dispatch(deleteTodosActionCreator(todoList.todos));
    },

    putTodoLists: todoLists => {
      dispatch(putTodoListsActionCreator(todoLists));
    }
  };
};

const SidebarConnected = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export default SidebarConnected;