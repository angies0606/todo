import Card from 'react-bootstrap/Card';
import Spacer from '@ui-kit/Spacer/Spacer';
import AddTodoFormConnected from '@features/todo-list/AddTodoForm/AddTodoForm.connected';
import { Redirect } from 'react-router-dom';
import TodosCollectionConnected from '@features/todo-list/TodosCollection/TodosCollection.connected';
import classes from './TodoListCard.module.scss';
import { useEffect } from 'react';
import * as api from '@api/api';
import useSnackbar from '@hooks/useSnackbar';
// import { propTypes } from 'react-bootstrap/esm/Image';

function TodoListCard({
  todoList,
  addTodos,
  addTodo,
  deleteTodo,
  editTodo
}) {
  const {enqueueSnackbar} = useSnackbar();
  useEffect(() => {
    if(!todoList) {
      return;
    }
    api.getTodos(todoList.id).then(todos => {
      addTodos(todos);
    });
  }, [todoList?.id, addTodos]);

  const onAddTodo = newTodo =>  {
    const payload = {
      ...newTodo,
      todoListId: todoList.id
    };

    return api.addTodo(payload)
      .then(todoResult => {
        return api.addTodoInTodoList(todoList.id, {
            todos: [
              ...todoList.todos,
              todoResult.id
            ]
          })
          .then((todoListResult) => [todoResult, todoListResult]);
      })
      .then(([todoResult, todoListResult]) => {
        addTodo(todoResult, todoListResult);
      })
      .then(() => {
        enqueueSnackbar("New todo was added", "success");
      })
      .catch((e) => {
        if(e?.response?.status >= 400 && e?.response?.status < 500) {
          enqueueSnackbar("Error! Adding todo failed", "error"); 
        }
      })
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
    .then(() =>{
      enqueueSnackbar('Todo was deleted successfully', 'success');
    })
    .catch((e) => {
      if(e?.response?.status >= 400 && e?.response?.status < 500) {
        enqueueSnackbar('Error! Deleting todo failed', 'error'); 
      }
    })
  }
  
  const onEditTodo = (todoData) => {
    return api.editTodo(todoData.id, {
      title: todoData.title
    })
    .then(result => {
      editTodo(result);
    })
    .then(() => {
      enqueueSnackbar('Todo was edited successfully', 'success');
    })
    .catch((e) => {
      if(e?.response?.status >= 400 && e?.response?.status < 500) {
        enqueueSnackbar('Error! Editing todo failed', 'error'); 
      }
    })
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

  if (!todoList) {
    return <>Loading...</>;
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
