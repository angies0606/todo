export const ADD_TODO_LIST = 'ADD_TODO_LIST';
export function addTodoListActionCreator(todoList) {
  return {
    type: ADD_TODO_LIST,
    data: todoList
  };
}

export const ADD_TODO = 'ADD_TODO';
export function addTodoActionCreator(todo, todoListId) {
  return {
    type: ADD_TODO,
    data: {
      todo,
      todoListId
    }
  }
}

export const CHECK_TODO = 'CHECK_TODO';
export function checkTodoActionCreator(todoId, isChecked) {
  return {
    type: CHECK_TODO,
    data: {
      todoId,
      isChecked
    }
  };
}
export const DELETE_TODO = 'DELETE_TODO';
export function deleteTodoActionCreator(todoId, todoListId) {
  return {
    type: DELETE_TODO,
    data: {
      todoId,
      todoListId
    }
  }
}