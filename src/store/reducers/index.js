import {combineReducers} from 'redux';
import todoListsReducer from './todo-lists.reducer';
import entitiesReducer from './entities';

const reducer = combineReducers({
  todoLists: todoListsReducer,
  entities: entitiesReducer
});

export default reducer;