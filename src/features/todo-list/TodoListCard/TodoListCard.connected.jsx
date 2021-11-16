import {connect} from 'react-redux';
import TodoListCard from './TodoListCard';

const mapStateToProps = (state, ownProps) => {
  const {todoListId} = ownProps;
  return {
    todoList: state.entities.todoLists[todoListId]
  };
};

export default connect(mapStateToProps)(TodoListCard);