// Если компонент не понадобится - упразднить
import {connect} from 'react-redux';
import {addTodoActionCreator} from '@store/actions';
import AddTodoForm from './AddTodoForm';

const mapStateToProps = (state, ownProps) => {
  // return {
  //   // todoList: state.entities.todoLists[ownProps.todoListId]
  // };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // return {
  //   // addTodo: todoData => {
  //   //   dispatch(addTodoActionCreator(todoData, ownProps.todoListId));
  //   // }
  // }
}

const AddTodoFormConnected = connect(mapStateToProps, mapDispatchToProps)(AddTodoForm);

export default AddTodoFormConnected;