import Todo from '@features/todo-list/Todo/Todo';


/**
 * Props:
 * - todos: object[]
 */
function TodosCollection ({
  todos,
  onCheckTodo,
  onDeleteTodo,
  onEditTodo
}) {
  return (
    todos.map((todo, index) => {
      return <Todo
        key={index}
        todo={todo}
        onCheck={onCheckTodo}
        deleteTodo={() => onDeleteTodo(todo.id)}
        editTodo={onEditTodo}
      />
    })
  );
}

export default TodosCollection;
