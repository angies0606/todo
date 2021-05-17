const initialState = {
  todoLists: ['todoList2', 'todoList1'],
  entities: {
    todoLists: {
      todoList1: {
        id: 'todoList1',
        title: 'List 111111',
        todos: ['todo1', 'todo3']
      },
      todoList2: {
        id: 'todoList2',
        title: 'List 222222',
        todos: ['todo2']
      }
    },
    todos: {
      todo1: {
        id: 'todo1',
        title: 'todo 111111111'
      },
      todo2: {
        id: 'todo2',
        title: 'todo 2222222'
      },
      todo3: {
        id: 'todo3',
        title: 'todo 333333333'
      }
    }
  }
};

export default initialState;