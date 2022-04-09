import axios from './axios'

export function getTodoLists() {
  return axios.get('todo-lists');
}

export function getTodoList(todoListId) {
  return axios.get(`todo-lists/${todoListId}`);
}

export async function deleteTodoList(todoList) {
  try {
    await axios.delete(`todo-lists/${todoList.id}`);

    const requestPromises = todoList.todos.map(todoId => axios.delete(`todos/${todoId}`));

    await Promise.all(requestPromises);
  } catch (e) {}

  // fetch(`${apiUrl}/todo-lists/` + todoList.id, {
  //   method: 'DELETE',
  //   headers: {
  //     'Content-Type': 'application/json;charset=utf-8'
  //   }
  // })
  // .then(response => response.json())
  //   .then(() => {
  //     const requestPromises = todoList.todos.map(todoId => {
  //       return fetch('http://localhost:8000/todos/' + todoId, {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json;charset=utf-8'
  //         }
  //       })
  //     });
  //     return Promise.all(requestPromises);
  //   })
}

export function editTodoList(todoListId, todoList) {
  return axios.patch(`todo-lists/${todoListId}`, todoList);
}

export function getTodos(todoListId, page, pageSize) {
  return axios.get(`todo-lists/${todoListId}/todos?todoListId=${todoListId}&_page=${page}&_limit=${pageSize}`);
}

export function addTodo(payload) {
  return axios.post('todos', payload);
}

export function addTodoInTodoList(todoListId, data) {
  return axios.patch(`todo-lists/${todoListId}`, data);
}

export function deleteTodo(todoId) {
  return axios.delete(`todos/${todoId}`);
}

export function deleteTodoInTodoList(todoListId, data) {
  return axios.patch(`todo-lists/${todoListId}`, data);
}

export function editTodo(todoId, data) {
  return axios.patch(`todos/${todoId}`, data);
}

export function checkTodo(todoId, data) {
  return axios.patch(`todos/${todoId}`, data);
}

export function addTodoList(data) {
  return axios.post('todo-lists', data);
}

