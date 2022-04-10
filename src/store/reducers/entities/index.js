import {combineReducers} from "redux";
import todoListsReducer from "./entities-todo-lists.reducer";
import todosReducer from "./entities-todos.reducer";

const reducer = combineReducers({
  todoLists: todoListsReducer,
  todos: todosReducer
});

export default reducer;