import {connect} from 'react-redux';
import {addTodoListActionCreator} from '@store/actions';
import AddTodoListButton from './AddTodoListButton';

const mapDispatchToProps = (dispatch) => {
  return {
    addTodoList: (todoListData) => {
      // имитация данных с бэка
      todoListData.id = Date.now().toString();
      dispatch(addTodoListActionCreator(todoListData));
    }
  }
}

const AddTodoListButtonConnected = connect(null, mapDispatchToProps)(AddTodoListButton);

export default AddTodoListButtonConnected;