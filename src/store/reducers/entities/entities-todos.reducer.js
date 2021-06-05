import { ADD_TODO, CHECK_TODO, DELETE_TODO } from '@store/actions';
import initialState from '@store/initial-state';

function reducer(state = initialState.entities.todos, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        [action.data.todo.id]: action.data.todo
      };
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
    default:
      return state;
  }
}

export default reducer;