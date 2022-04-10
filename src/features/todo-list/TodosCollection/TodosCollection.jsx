import {useEffect, useState} from "react";
import Todo from "@features/todo-list/Todo/Todo";
import InfiniteScroll from "react-infinite-scroll-component";

/**
 * Props:
 * - todos: object[]
 */
function TodosCollection ({
  todoListId,
  todos,
  onCheckTodo,
  onDeleteTodo,
  onEditTodo,
  getTodos,
  scrollableId
}) {
  const [page, setPage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!page) return;

    getTodos(page).then(() => {
      setHasMore(true);
    });
  }, [page, getTodos]);

  useEffect(() => {
    setPage(null);
  }, [todoListId]);

  useEffect(() => {
    if (!page) {
      setPage(1);
    }
  }, [page]);

  function fetchMoreTodos () {
    setPage(page + 1);
  }

  return (
    <InfiniteScroll
      dataLength={todos.length}
      next={fetchMoreTodos}
      hasMore={hasMore}
      loader={<></>}
      scrollableTarget={scrollableId}
    >
      {todos.map((todo, index) => {
        return <Todo
          key={index}
          todo={todo}
          onCheck={onCheckTodo}
          deleteTodo={() => onDeleteTodo(todo.id)}
          editTodo={onEditTodo}
        />
      })}
    </InfiniteScroll>
  );
}

export default TodosCollection;