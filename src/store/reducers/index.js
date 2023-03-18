import {combineReducers} from "redux";
import { connectRouter } from "connected-react-router";
import todoListsReducer from "./todo-lists.reducer";
import entitiesReducer from "./entities";
import history from "../../history";

const reducer = combineReducers({
  todoLists: todoListsReducer,
  entities: entitiesReducer,
  router: connectRouter(history)
});

export default reducer;