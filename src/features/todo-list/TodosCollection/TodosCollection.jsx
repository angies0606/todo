import Todo from '@features/todo-list/Todo/Todo';


/**
 * Props:
 * - todos: object[]
 */
function TodosCollection ({
  todos,
  checkTodo,
  deleteTodo,
  editTodo
}) {
  return (
    todos.map((todo, index) => {
      return <Todo
        key={index}
        todo={todo}
        onCheck={isChecked => {
          checkTodo(todo.id, isChecked);
        }}
        deleteTodo={() => deleteTodo(todo.id)}
        editTodo={title => editTodo(title, todo.id)}
      />
    })
  );
}

export default TodosCollection;
