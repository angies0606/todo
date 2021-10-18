import {connect} from 'react-redux';
import {addTodoListActionCreator} from '@store/actions';
import AddTodoListButton from './AddTodoListButton';


const mapDispatchToProps = (dispatch) => {
  return {
    addTodoList: (todoListData) => {
      dispatch(addTodoListActionCreator(todoListData));
    }
  }
}

const AddTodoListButtonConnected = connect(null, mapDispatchToProps)(AddTodoListButton);

export default AddTodoListButtonConnected;