import { 
  ADD_TODO,
  ADD_TODOS, 
  CHECK_TODO, 
  DELETE_TODO, 
  EDIT_TODO } from '@store/actions';
import initialState from '@store/initial-state';

function reducer(state = initialState.entities.todos, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        [action.data.todo.id]: action.data.todo
      };
    }
    case ADD_TODOS: {
      const newState = {
        ...state
      }
      action.data.forEach(todo => {
        newState[todo.id] = todo;
      })
      return newState; 
    }
    case CHECK_TODO: {
      // const todoId = action.data.todoId
      // const isChecked = action.data.isChecked
      const {todoId, isChecked} = action.data;
      return {
        ...state,
        [todoId]: {
          ...state[todoId],
          isChecked
        }
      };
    }
    case DELETE_TODO: {
      const {todoId} = action.data;
      const newState = {...state};
      delete newState[todoId];
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