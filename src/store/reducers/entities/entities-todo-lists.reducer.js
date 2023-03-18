import initialState from "@store/initial-state";
import {
  PUT_TODO_LISTS,
  DELETE_TODO_LIST
} from "@store/actions";

function reducer(state = initialState.entities.todoLists, action) {
  switch (action.type) {
    case PUT_TODO_LISTS: {
      const newState = {
        ...state
      };
      action.data.forEach(todoList => {
        newState[todoList.id] = todoList;
      });
      return newState;
    }

    case DELETE_TODO_LIST: {
      const {todoListId} = action.data;
      const newState = {...state};
      delete newState[todoListId];
      return newState;
    }
    
    default:
      return state;
  }
}

export default reducer;