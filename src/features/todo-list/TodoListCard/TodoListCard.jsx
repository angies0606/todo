import Card from 'react-bootstrap/Card';
import Spacer from '@ui-kit/Spacer/Spacer';
import AddTodoFormConnected from '@features/todo-list/AddTodoForm/AddTodoForm.connected';
import { Redirect } from 'react-router-dom';
import TodosCollectionConnected from '@features/todo-list/TodosCollection/TodosCollection.connected';
import classes from './TodoListCard.module.scss';
import { useEffect } from 'react';
import * as api from '@api/api'
// import { propTypes } from 'react-bootstrap/esm/Image';

function TodoListCard({
  todoList, 
  addTodos,
  addTodo,
  deleteTodo,
  editTodo
}) {
  useEffect(() => {
    if(!todoList) {
      return;
    }
    api.getTodos(todoList.id).then(todos => {
      addTodos(todos);
    });
  }, [todoList?.id, addTodos]);

  if(!todoList) {
    return <Redirect to='/'/>;
  }

  const onAddTodo = newTodo =>  {
    const payload = {
      ...newTodo,
      todoListId: todoList.id
    };

    return api.addTodo(payload).then(todoResult => {
      return api.addTodoInTodoList(todoList.id, {
          todos: [
            ...todoList.todos,
            todoResult.id
          ]
        }).then((todoListResult) => [todoResult, todoListResult]);
      })
      .then(([todoResult, todoListResult]) => {
        addTodo(todoResult, todoListResult);
      })
      .catch((e) =>
        console.log(e)
      );
  }

  const onDeleteTodo = (todoId) => {
    return api.deleteTodo(todoId).then(() => {
      return api.deleteTodoInTodoList(todoList.id, {
        todos: todoList.todos.filter(t => t !== todoId)
      })
    })
    .then(result => {
      deleteTodo(todoId, result);
    })
    .catch((e) =>
      console.log(e)
    );
  }
  
  const onEditTodo = (todoData) => {
    return api.editTodo(todoData.id, {
      title: todoData.title
    }).then(result => {
      editTodo(result);
    })
    .catch((e) =>
      console.log(e)
    );
  }

  const onCheckTodo = (todoData) => {
    return api.checkTodo(todoData.id, {
      isChecked: todoData.isChecked
    }).then(result => {
      editTodo(result);
    })
    .catch((e) =>
      console.log(e)
    );
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

        <TodosCollectionConnected 
          todoListId={todoList.id} 
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
          onCheckTodo={onCheckTodo}
        />

        <Spacer />

      </Card.Body>
    </Card>
  );
}

export default TodoListCard;
