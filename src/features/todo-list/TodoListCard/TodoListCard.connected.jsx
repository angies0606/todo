import {connect} from 'react-redux';
import TodoListCard from './TodoListCard';
import { addTodosActionCreator } from '@store/actions';

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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListCard);