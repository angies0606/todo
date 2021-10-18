import Card from 'react-bootstrap/Card';
import Spacer from '@ui-kit/Spacer/Spacer';
import AddTodoFormConnected from '@features/todo-list/AddTodoForm/AddTodoForm.connected';
import { Redirect } from 'react-router-dom';
import TodosCollectionConnected from '@features/todo-list/TodosCollection/TodosCollection.connected';
import classes from './TodoListCard.module.scss';
import { useEffect } from 'react';
// import { propTypes } from 'react-bootstrap/esm/Image';

function TodoListCard({
  todoList, 
  addTodos,
  addTodo
  }) {
  useEffect(() => {
    if(!todoList) {
      return;
    }
    fetch('http://localhost:8000/todo-lists/' + todoList.id + '/todos?todoListId=' + todoList.id)
      .then(result => result.json())
      .then(todos => {
        addTodos(todos);
      })
  }, [todoList?.id])

  if(!todoList) {
    return <Redirect to='/'/>;
  }

  function onAddTodo(newTodo) {
    const payload = {
      ...newTodo,
      todoListId: todoList.id
    };

    return fetch('http://localhost:8000/todos', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
      .then(response => response.json())
      .then(result => {
        return fetch('http://localhost:8000/todo-lists/' + todoList.id, {
          method: 'PATCH',
          body: JSON.stringify({
            todos: [
              ...todoList.todos,
              result.id
            ]
          }),
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }).then(() => result)
      })
      .then(result => {
        addTodo(result);
      })
      .catch((e) =>
        console.log(e)
      )
  }
 
  return (
    <Card className={classes.Card}>
      <Card.Body>
        <Card.Title>
          {todoList.title}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {todoList.description}
        </Card.Subtitle>

        <Spacer />

        <AddTodoFormConnected
          todoListId={todoList.id}
          onAddTodo={onAddTodo}
        />

        <Spacer />

        <TodosCollectionConnected todoListId={todoList.id} />

        <Spacer />

      </Card.Body>
    </Card>
  );
}

export default TodoListCard;
