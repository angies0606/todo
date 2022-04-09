// import Card from 'react-bootstrap/Card';
import Spacer from '@ui-kit/Spacer/Spacer';
import AddTodoFormConnected from '@features/todo-list/AddTodoForm/AddTodoForm.connected';
import { Redirect, useHistory } from 'react-router-dom';
import TodosCollectionConnected from '@features/todo-list/TodosCollection/TodosCollection.connected';
import classes from './TodoListCard.module.scss';
import {useEffect, useCallback, useState, useRef} from 'react';
import * as api from '@api/api';
import useSnackbar from '@hooks/useSnackbar';
import DateBar from '@ui-kit/DateBar/DateBar';
// import { Scrollbar } from "react-scrollbars-custom";
import classNames from 'classnames';
import { useProgressContext } from '@features/progress/progress.context';
import NoData from '@ui-kit/NoData/NoData';
import Spinner from '@ui-kit/Spinner/Spinner';
import Scrollbar from '@ui-kit/Scrollbar/Scrollbar';
import Card from '@ui-kit/Card/Card';


const pageSize = 10;

function TodoListCard({
  todoListId,
  putTodoList,
  todoList,
  addTodos,
  addTodo,
  deleteTodo,
  editTodo
}) {
  const {enqueueSnackbar} = useSnackbar();
  const history = useHistory();
  const {isProgress} = useProgressContext();

  const prevTodoListRef = useRef();

  useEffect(() => {
    if(prevTodoListRef.current && !todoList){
      history.push('/');
    }
    prevTodoListRef.current = todoList;
  }, [todoList])


  const getTodos = useCallback((page) => {
    if (!todoList) {
      return
    }

    return api.getTodos(todoList.id, page, pageSize)
      .then(todos => {
        addTodos(todos);
        
      });
  }, [todoList?.id, addTodos])

  useEffect(() => {
    api.getTodoList(todoListId)
      .then(result => {
        if (!result) {
          history.push('/');
          return;
        }
        putTodoList(result);
      })
      .catch(() => {
        history.push('/');
      });
  }, [todoListId]);

  const isEmpty = todoList && todoList.todos.length === 0 && !isProgress;

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
    return  (
      <Spinner 
        className={classes.TodoListCard__ProgressBar}
        spinnerSize={{height: 60, width: 60}}
      />
    )
  }

  return (

    <Card todoList={todoList} DateBar={<DateBar creationDate={todoList.createdAt}/>}>
      <Spacer />

      <AddTodoFormConnected
        todoListId={todoList.id}
        onAddTodo={onAddTodo}
      />

      <Spacer />

      <Scrollbar
        className={classes.TodoListCard__Scrollbar}
        scrollerId={classes.TodoListCard__ScrollTarget}
      >
        {isEmpty &&
          <NoData 
            className={classes.TodoListCard__NoData}
            imageStyle={{height: 130, width: 80}}
            message={'No todos yet'}
          />
        }
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
    </Card>
    // <Card className={classes.Card}>
    //   <Card.Header className={classNames(classes.TodoListCard__Header, "text-center")}>
    //     <Card.Title>
    //         {todoList.title}
    //     </Card.Title>
    //     <Card.Subtitle className="mb-2 text-muted">
    //       {todoList.description}
    //     </Card.Subtitle>
    //     <Card.Subtitle className={classNames(classes.TodoListCard__Subtitle, "text-muted")}>
    //       <DateBar creationDate={todoList.createdAt}/>
    //     </Card.Subtitle>
    //   </Card.Header>
    //   <Card.Body className={classes.TodoListCard__CardBody}>

    //     <Spacer />

    //     <AddTodoFormConnected
    //       todoListId={todoList.id}
    //       onAddTodo={onAddTodo}
    //     />

    //     <Spacer />

    //     <Scrollbar
    //       className={classes.TodoListCard__Scrollbar}
    //       scrollerId={classes.TodoListCard__ScrollTarget}
    //     >
    //       {isEmpty &&
    //         <NoData 
    //           className={classes.TodoListCard__NoData}
    //           imageStyle={{height: 130, width: 80}}
    //           message={'No todos yet'}
    //         />
    //       }
    //       <TodosCollectionConnected
    //         className={classes.TodoListCard__TodosCollection}
    //         todoListId={todoList.id}
    //         onDeleteTodo={onDeleteTodo}
    //         onEditTodo={onEditTodo}
    //         onCheckTodo={onCheckTodo}
    //         getTodos={getTodos}
    //         scrollableId={classes.TodoListCard__ScrollTarget}
    //       />
    //     </Scrollbar>
        
    //     <Spacer />

    //   </Card.Body>
    //   <Card.Footer className={classes.TodoListCard__Footer} />
    // </Card>

  );
}

export default TodoListCard;
