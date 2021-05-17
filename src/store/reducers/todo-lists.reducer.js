import initialState from '@store/initial-state';
import {
  ADD_TODO_LIST
} from '@store/actions';

function reducer(state = initialState.todoLists, action) {
  switch (action.type) {
    case ADD_TODO_LIST: {
      return [
        ...state,
        action.data.id
      ];
    }
    default:
      return state;
  }
}

export default reducer;