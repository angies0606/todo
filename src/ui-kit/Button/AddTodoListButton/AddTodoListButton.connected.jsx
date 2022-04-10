import {connect} from "react-redux";
import {putTodoListsActionCreator} from "@store/actions";
import AddTodoListButton from "./AddTodoListButton";

const mapDispatchToProps = (dispatch) => {
  return {
    addTodoList: (todoListData) => {
      dispatch(putTodoListsActionCreator([todoListData]));
    }
  }
}

const AddTodoListButtonConnected = connect(null, mapDispatchToProps)(AddTodoListButton);

export default AddTodoListButtonConnected;