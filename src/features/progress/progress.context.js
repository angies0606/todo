import {createContext, useContext} from "react";

// Создаем контекст для выявления состояния прогресса компонетов при отправке запросов или подписок
export const ProgressContext = createContext(null); // null - значение по умолчанию контекста

export function useProgressContext() {
  return useContext(ProgressContext);
}