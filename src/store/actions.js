export const PUT_TODO_LISTS = 'PUT_TODO_LISTS';
export function putTodoListsActionCreator(todoLists) {
  return {
    type: PUT_TODO_LISTS,
    data: todoLists
  };
}

export const PUT_TODOS = 'ADD_TODOS';
export function putTodosActionCreator(todos) {
  return {
    type: PUT_TODOS,
    data: todos
  };
}

// export const ADD_TODO = 'ADD_TODO';
// export function addTodoActionCreator(todoData) {
//   return {
//     type: ADD_TODO,
//     data: todoData
//   };
// }

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

export const DELETE_TODOS = 'DELETE_TODOS';
export function deleteTodosActionCreator(todosIds) {
  return {
    type: DELETE_TODOS,
    data: todosIds
  };
}

export const DELETE_TODO_LIST = 'DELETE_TODO_LIST';
export function deleteTodoListActionCreator(todoListId) {
  return {
    type: DELETE_TODO_LIST,
    data: {
      todoListId
    }
  };
}

export const EDIT_TODO = 'EDIT_TODO'
export function editTodoActionCreator(title, todoId) {
  return {
    type: EDIT_TODO,
    data: {
      title,
      todoId
    }
  };
}

// export const EDIT_TODO_LIST = 'EDIT_TODO_LIST';
// export function editTodoListActionCreator(todoListData, todoListId) {
//   return {
//     type: EDIT_TODO_LIST,
//     data: {
//       todoListData,
//       todoListId
//     }
//   }
// }