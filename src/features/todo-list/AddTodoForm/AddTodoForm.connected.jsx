import {connect} from 'react-redux';
import {addTodoActionCreator} from '@store/actions';
import AddTodoForm from './AddTodoForm';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addTodo: todoData => {
      // имитация данных с бэка
      todoData.id = Date.now().toString();
      dispatch(addTodoActionCreator(todoData, ownProps.todoListId));
    }
  }
}

const AddTodoFormConnected = connect(null, mapDispatchToProps)(AddTodoForm);

export default AddTodoFormConnected;