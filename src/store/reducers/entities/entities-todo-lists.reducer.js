import initialState from '@store/initial-state';
import {
  ADD_TODO_LIST,
  ADD_TODO_LISTS,
  ADD_TODO,
  DELETE_TODO,
  DELETE_TODO_LIST,
  EDIT_TODO_LIST
} from '@store/actions';

function reducer(state = initialState.entities.todoLists, action) {
  switch (action.type) {
    case ADD_TODO_LIST: {
      return {
        ...state,
        [action.data.id]: action.data
      };
    }
    case ADD_TODO_LISTS: {
      const newState = {
        ...state
      };
      action.data.forEach(todoList => {
        newState[todoList.id] = todoList;
      });
      return newState;
    }
    case ADD_TODO: {
      return {
        ...state,
        [action.data.todoListId]: {
          ...state[action.data.todoListId],
          todos: [
            ...state[action.data.todoListId].todos,
            action.data.id
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
    case DELETE_TODO_LIST: {
      const {todoListId} = action.data;
      const newState = {...state};
      delete newState[todoListId];
      return newState;
    }
    case EDIT_TODO_LIST: {
      const {todoListData, todoListId} = action.data;
      return {
        ...state,
        [todoListId]: {
          ...state[todoListId],
          title: todoListData.title,
          description: todoListData.description
        }
      }
    }
    
    default:
      return state;
  }
}

export default reducer;