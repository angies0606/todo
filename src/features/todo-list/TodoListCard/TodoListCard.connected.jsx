import {connect} from 'react-redux';
import TodoListCard from './TodoListCard';
import { addTodosActionCreator,addTodoActionCreator } from '@store/actions';

const mapStateToProps = (state, ownProps) => {
  const {todoListId} = ownProps;
  return {
    todoList: state.entities.todoLists[todoListId]
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTodos: todos => {
      dispatch(addTodosActionCreator(todos));
    },
     addTodo: todoData => {
      dispatch(addTodoActionCreator(todoData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListCard);