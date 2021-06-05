import initialState from '@store/initial-state';
import {
  ADD_TODO_LIST,
  ADD_TODO,
  DELETE_TODO
} from '@store/actions';

function reducer(state = initialState.entities.todoLists, action) {
  switch (action.type) {
    case ADD_TODO_LIST: {
      return {
        ...state,
        [action.data.id]: action.data
      };
    }
    case ADD_TODO: {
      return {
        ...state,
        [action.data.todoListId]: {
          ...state[action.data.todoListId],
          todos: [
            ...state[action.data.todoListId].todos,
            action.data.todo.id
          ]
        }
      };
    }
    case DELETE_TODO: {
      const {todoId, todoListId} = action.data;
      const todos = [...state[todoListId].todos];
      todos.splice(todos.indexOf(todoId), 1);
      return {
        ...state,
        [todoListId]: {
          ...state[todoListId],
          todos
        }
      };
    }
    default:
      return state;
  }
}

export default reducer;