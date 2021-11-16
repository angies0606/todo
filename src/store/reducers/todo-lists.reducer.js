import initialState from '@store/initial-state';
import {
  ADD_TODO_LIST,
  DELETE_TODO_LIST
} from '@store/actions';

function reducer(state = initialState.todoLists, action) {
  switch (action.type) {
    case ADD_TODO_LIST: {
      return [
        ...state,
        action.data.id
      ];
    }

    case DELETE_TODO_LIST: {
      const {todoListId} = action.data;
      const newState = [...state];
      newState.splice(newState.indexOf(todoListId), 1);
      return newState;
    }
    
    default:
      return state;
  }
}

export default reducer;