import initialState from '@store/initial-state';
import {
  ADD_TODO_LIST,
  ADD_TODO_LISTS,
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

    case ADD_TODO_LISTS: {
      return [
        ...state,
        ...action.data.map(todoList => todoList.id).filter(todoListId => !state.includes(todoListId))
      ]
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