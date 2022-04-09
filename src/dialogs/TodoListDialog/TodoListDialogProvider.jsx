// @ts-nocheck
import {useState, useMemo, useCallback} from 'react';
import {TodoListDialogContext} from './todoListDialog.context';
import TodoListDialog from './TodoListDialog';
import * as api from '@api/api';
import useSnackbar from '@hooks/useSnackbar';

const DIALOG_MODE = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  CLOSED: 'CLOSED'
}

function TodoListDialogProvider({
  children,
  addTodoList,
  editTodoList
}) {
  const [mode, setMode] = useState(DIALOG_MODE.CLOSED);
  const [dialogProps, setDialogProps] = useState({});
  const {enqueueSnackbar} = useSnackbar();

  const closeTodoListDialog = useCallback(() => {
    setMode(DIALOG_MODE.CLOSED);
    setDialogProps({});
  }, []);

  const onAddTodoList = useCallback((newTodoList) => {
    return api.addTodoList({
      ...newTodoList,
      todos: []
    }).then((result) => {
      addTodoList(result);
      closeTodoListDialog();
      enqueueSnackbar('New todo list was added successfully', 'success');
    })
    .catch((e) => {
      if(e?.response?.status >= 400 && e?.response?.status < 500) {
        enqueueSnackbar('Error! Adding todo list failed', 'error');
      }
    });
  }, [addTodoList, closeTodoListDialog, enqueueSnackbar]);

  const onEditTodoList = useCallback(editedData => {

    return api.editTodoList(dialogProps.todoList.id, editedData)
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
  }, [editTodoList, closeTodoListDialog, enqueueSnackbar, dialogProps]);

  const openAddTodoListDialog = useCallback(() => {
    setMode(DIALOG_MODE.ADD);
  }, [setDialogProps, closeTodoListDialog, onAddTodoList]);

  const openEditTodoListDialog = useCallback(todoListInEditing => {
    if (!todoListInEditing) return;

    setMode(DIALOG_MODE.EDIT);
    setDialogProps({
      todoList: todoListInEditing
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

      <TodoListDialog
        show={mode === DIALOG_MODE.ADD}
        onClose={closeTodoListDialog}
        onConfirm={onAddTodoList}
        title='Add new list'
        confirmText='Add'
        {...dialogProps}
      ></TodoListDialog>

      <TodoListDialog
        show={mode === DIALOG_MODE.EDIT}
        onClose={closeTodoListDialog}
        onConfirm={onEditTodoList}
        title='Edit list'
        confirmText='Edit'
        {...dialogProps}
      ></TodoListDialog>
    </>
  );
}

export default TodoListDialogProvider;