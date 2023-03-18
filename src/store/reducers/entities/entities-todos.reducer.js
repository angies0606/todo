import { 
  PUT_TODOS, 
  CHECK_TODO, 
  DELETE_TODOS, 
  EDIT_TODO
} from "@store/actions";
import initialState from "@store/initial-state";

function reducer(state = initialState.entities.todos, action) {
  switch (action.type) {
    case PUT_TODOS: {
      const newState = {
        ...state
      }
      action.data.forEach(todo => {
        newState[todo.id] = todo;
      })
      return newState; 
    }

    case CHECK_TODO: {
      const {todoId, isChecked} = action.data;
      return {
        ...state,
        [todoId]: {
          ...state[todoId],
          isChecked
        }
      };
    }

    case DELETE_TODOS: {
      const newState = {...state};
      action.data.forEach(todoId => {
        delete newState[todoId];
      });
      return newState;
    }
    case EDIT_TODO: {
      const {title, todoId} = action.data;
      return {
        ...state,
        [todoId]: {
          ...state[todoId],
          title
        }
      };
    }
    
    default:
      return state;
  }
}

export default reducer;