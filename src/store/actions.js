export const ADD_TODO_LISTS = 'ADD_TODO_LISTS';
export function addTodoListsActionCreator(todoLists) {
  return {
    type: ADD_TODO_LISTS,
    data: todoLists
  };
}

export const ADD_TODOS = 'ADD_TODOS';
export function addTodosActionCreator(todos) {
  return {
    type: ADD_TODOS,
    data: todos
  }
}

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
export const DELETE_TODO_LIST = 'DELETE_TODO_LIST';
export function deleteTodoListActionCreator(todoListId) {
  return {
    type: DELETE_TODO_LIST,
    data: {
      todoListId
    }
  }
}
export const EDIT_TODO = 'EDIT_TODO'
export function editTodoActionCreator(title, todoId) {
  return {
    type: EDIT_TODO,
    data: {
      title,
      todoId
    }
  }
}

export const EDIT_TODO_LIST = 'EDIT_TODO_LIST';
export function editTodoListActionCreator(todoListData, todoListId) {
  return {
    type: EDIT_TODO_LIST,
    data: {
      todoListData,
      todoListId
    }
  }
}