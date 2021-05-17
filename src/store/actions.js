export const ADD_TODO_LIST = 'ADD_TODO_LIST';
export function addTodoListActionCreator(data) {
  return {
    type: ADD_TODO_LIST,
    data
  };
}