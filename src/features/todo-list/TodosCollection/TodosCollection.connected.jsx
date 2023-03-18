import {connect} from "react-redux";
import TodosCollection from "./TodosCollection";

const mapStateToProps = (state, ownProps) => {
  const {todoListId} = ownProps;
  return {
    todos: state.entities.todoLists[todoListId].todos.map(todoId => {
      return state.entities.todos[todoId]
    }).filter(todo => todo !== undefined)
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   const {todoListId} = ownProps;
//   return {

//   };
// };

const TodosCollectionConnected = connect(mapStateToProps)(TodosCollection);

export default TodosCollectionConnected;