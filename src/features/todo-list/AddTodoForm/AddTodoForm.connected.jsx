//TODO: Если компонент не понадобится - упразднить
import {connect} from "react-redux";
import AddTodoForm from "./AddTodoForm";

// const mapStateToProps = (state, ownProps) => {
//   return {
//     todoList: state.entities.todoLists[ownProps.todoListId]
//   };
// };

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     addTodo: todoData => {
//       dispatch(addTodoActionCreator(todoData, ownProps.todoListId));
//     }
//   }
// }

const AddTodoFormConnected = connect()(AddTodoForm);

export default AddTodoFormConnected;