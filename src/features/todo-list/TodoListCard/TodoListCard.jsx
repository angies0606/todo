import Card from 'react-bootstrap/Card';
import Spacer from '@ui-kit/Spacer/Spacer';
import AddTodoFormConnected from '@features/todo-list/AddTodoForm/AddTodoForm.connected';
import { Redirect } from 'react-router-dom';
import TodosCollectionConnected from '@features/todo-list/TodosCollection/TodosCollection.connected';
import classes from './TodoListCard.module.scss';
import {useEffect, useCallback} from 'react';
import * as api from '@api/api';
import useSnackbar from '@hooks/useSnackbar';
import DateBar from '@ui-kit/DateBar/DateBar';
// import { propTypes } from 'react-bootstrap/esm/Image';
import { Scrollbar } from "react-scrollbars-custom";
import classNames from 'classnames';

const pageSize = 5;

function TodoListCard({
  todoList,
  addTodos,
  addTodo,
  deleteTodo,
  editTodo
}) {
  const {enqueueSnackbar} = useSnackbar();

  const getTodos = useCallback((page) => {
    if (!todoList) {
      return
    }

    return api.getTodos(todoList.id, page, pageSize)
      .then(todos => {
        addTodos(todos);
      });
  }, [todoList?.id, addTodos])

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
      enqueueSnackbar('Todo was edited successfully','success');
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
    return <Redirect from='*' to='/'></Redirect>;
  }

  return (
    <Card className={classes.Card}>
      <Card.Header className={classNames(classes.TodoListCard__Header, "text-center")}>
        <Card.Title>
          {todoList.title}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {todoList.description}
        </Card.Subtitle>
        <Card.Subtitle className={classNames(classes.TodoListCard__Subtitle, "text-muted")}>
          <DateBar creationDate={todoList.createdAt}/>
        </Card.Subtitle>
      </Card.Header>
      <Card.Body className={classes.TodoListCard__CardBody}>

        <Spacer />

        <AddTodoFormConnected
          todoListId={todoList.id}
          onAddTodo={onAddTodo}
        />

        <Spacer />

        
        <Scrollbar
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
          scrollerProps={{
            renderer: props => {
              const {elementRef, ...restProps} = props;
              console.log(classes.TodoListCard__ScrollTarget)
              return <div
                {...restProps}
                ref={elementRef}
                id={classes.TodoListCard__ScrollTarget}
              ></div>;
            }
          }}
          className={classes.TodoListCard__Scrollbar}
        >
          <TodosCollectionConnected
            className={classes.TodoListCard__TodosCollection}
            todoListId={todoList.id}
            onDeleteTodo={onDeleteTodo}
            onEditTodo={onEditTodo}
            onCheckTodo={onCheckTodo}
            getTodos={getTodos}
            scrollableId={classes.TodoListCard__ScrollTarget}
          />
        </Scrollbar>

        <Spacer />

      </Card.Body>
      <Card.Footer className={classes.TodoListCard__Footer} />

    </Card>
  );
}

export default TodoListCard;
