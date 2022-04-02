import {createContext, useContext} from 'react';

export const TodoListDialogContext = createContext(null);

export function useTodoListDialogContext() {
  return useContext(TodoListDialogContext);
}