import {connect} from 'react-redux';
import TodoListCard from './TodoListCard';
import { putTodosActionCreator, putTodoListsActionCreator,deleteTodosActionCreator } from '@store/actions';

const mapStateToProps = (state, ownProps) => {
  const {todoListId} = ownProps;
  return {
    todoList: state.entities.todoLists[todoListId]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    putTodoList: todoList => {
      dispatch(putTodoListsActionCreator([todoList]));
    },
    addTodos: todos => {
      dispatch(putTodosActionCreator(todos));
    },
    addTodo: (todo, todoList) => {
      dispatch(putTodosActionCreator([todo]));
      dispatch(putTodoListsActionCreator([todoList]));
    },
    deleteTodo: (todoId, todoList) => {
      dispatch(deleteTodosActionCreator([todoId]));
      dispatch(putTodoListsActionCreator([todoList]));
    },
    editTodo: (todo) => {
      dispatch(putTodosActionCreator([todo]));
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListCard);