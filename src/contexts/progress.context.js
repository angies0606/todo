import {createContext, useContext} from 'react';

export const ProgressContext = createContext(null);

export function useProgressContext() {
  return useContext(ProgressContext);
}