import Todo from '@features/todo-list/Todo/Todo';
import React from 'react';

/**
 * Props:
 * - todos: object[]
 */
class TodosCollection extends React.Component {
  render() {
    return (
      this.props.todos.map((todo, index) => {
        return <Todo
          key={index}
          todo={todo}
          onCheck={isChecked => {
            this.props.checkTodo(todo.id, isChecked);
          }}
          deleteTodo={() => this.props.deleteTodo(todo.id)}
        />
      })
    );
  }
}

export default TodosCollection;
