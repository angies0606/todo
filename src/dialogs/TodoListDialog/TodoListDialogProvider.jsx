// @ts-nocheck
import * as api from "@api/api";
import {useState, useMemo, useCallback} from "react";
import { useHistory } from "react-router-dom";
import useSnackbar from "@components/SnackBarProvider/useSnackbar";
import {TodoListDialogContext} from "./todoListDialog.context";
import TodoListDialog from "./TodoListDialog";

function TodoListDialogProvider({
  children,
  addTodoList,
  editTodoList
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [dialogProps, setDialogProps] = useState({});
  const {enqueueSnackbar} = useSnackbar();

  const history = useHistory();

  const closeTodoListDialog = useCallback(() => {
    setIsVisible(false);
    setDialogProps({});
  }, []);

  const onAddTodoList = useCallback(newTodoList => {
    return api.addTodoList({
      ...newTodoList,
      todos: []
    }).then((result) => {
      addTodoList(result);
      closeTodoListDialog();
      history.push(`/todo-list/${result.id}`);
      enqueueSnackbar('New todo list was added successfully', 'success');
    })
    .catch((e) => {
      if(e?.response?.status >= 400 && e?.response?.status < 500) {
        enqueueSnackbar('Error! Adding todo list failed', 'error');
      } else {
        console.error(e);
      }
    });
  }, [addTodoList, closeTodoListDialog, enqueueSnackbar, history]);

  const onEditTodoList = useCallback((editedData, todoList) => {
    return api.editTodoList(todoList.id, editedData)
      .then(result => {
        editTodoList(result);
        closeTodoListDialog();
        enqueueSnackbar('Todo list was edited successfully', 'success');
      })
      .catch((e) => {
        if(e?.response?.status >= 400 && e?.response?.status < 500) {
          enqueueSnackbar('Error! Editing todo list failed', 'error'); 
        }
      });
  }, [editTodoList, closeTodoListDialog, enqueueSnackbar]);

  const openAddTodoListDialog = useCallback(() => {
    setIsVisible(true);
    setDialogProps({
      todoList: null,
      onConfirm: onAddTodoList,
      title:'Add new list',
      confirmText:'Add'
    })
  }, [setDialogProps, closeTodoListDialog, onAddTodoList]);

  const openEditTodoListDialog = useCallback(todoListInEditing => {
    if (!todoListInEditing) return;

    setIsVisible(true);
    setDialogProps({
      todoList: todoListInEditing,
      onConfirm: onEditTodoList,
      title:'Edit list',
      confirmText:'Edit'
    })
  },[setDialogProps, closeTodoListDialog, onEditTodoList]);

  const value = useMemo(() => {
    return {
      openAddTodoListDialog,
      openEditTodoListDialog
    }
  }, [openAddTodoListDialog, openEditTodoListDialog]);

  return (
    <>
      <TodoListDialogContext.Provider value={value}>
        {children}
      </TodoListDialogContext.Provider>

      {
        isVisible &&
        <TodoListDialog
          show={isVisible}
          onClose={closeTodoListDialog}
          {...dialogProps}
        />
      }
    </>
  );
}

export default TodoListDialogProvider;