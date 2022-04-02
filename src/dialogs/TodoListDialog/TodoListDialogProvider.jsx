import {useState, useMemo, useCallback} from 'react';
import {TodoListDialogContext} from './todoListDialog.context';
import TodoListDialog from './TodoListDialog';
import * as api from '@api/api';
import useSnackbar from '@hooks/useSnackbar';

function TodoListDialogProvider({
  children,
  addTodoList,
  editTodoList
}) {
  const [dialogProps, setDialogProps] = useState({});
  const {enqueueSnackbar} = useSnackbar();

  const closeTodoListDialog = useCallback(() => {
    setDialogProps({show: false});
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

  const openAddTodoListDialog = useCallback(() => {
    setDialogProps({
      show: true,
      onClose: closeTodoListDialog,
      onConfirm: onAddTodoList,
      title: 'Add new list',
      confirmText: 'Add'
    });
  }, [setDialogProps]);

  const value = useMemo(() => {
    return {
      openAddTodoListDialog
    }
  }, [openAddTodoListDialog])

  return (
    <>
      <TodoListDialogContext.Provider value={value}>
        {children}
      </TodoListDialogContext.Provider>
      <TodoListDialog
        {...dialogProps}
      ></TodoListDialog>
    </>
  );
}

export default TodoListDialogProvider;