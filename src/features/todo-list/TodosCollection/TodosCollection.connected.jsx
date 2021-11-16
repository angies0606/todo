import {connect} from 'react-redux';
import {checkTodoActionCreator, editTodoActionCreator} from '@store/actions';
import TodosCollection from './TodosCollection';

const mapStateToProps = (state, ownProps) => {
  const {todoListId} = ownProps;
  return {
    todos: state.entities.todoLists[todoListId].todos.map(todoId => {
      return state.entities.todos[todoId]
    }).filter(todo => todo !== undefined)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {todoListId} = ownProps;
  return {
    // checkTodo: (todoId, isChecked) => {
    //   dispatch(checkTodoActionCreator(todoId, isChecked));
    // }
    // editTodo: (title, todoId) => {
    //   dispatch(editTodoActionCreator(title, todoId));
    // }
  };
};

const TodosCollectionConnected = connect(mapStateToProps, mapDispatchToProps)(TodosCollection);

export default TodosCollectionConnected;