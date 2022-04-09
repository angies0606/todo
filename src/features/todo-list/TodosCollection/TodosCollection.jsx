import Todo from '@features/todo-list/Todo/Todo';
import {useEffect} from 'react';
import classNames from "classnames";
import classes from './TodosCollection.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useState} from 'react';


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
  className,
  scrollableId
}) {
  const [page, setPage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!page) return;

    getTodos(page).then(() => {
      setHasMore(true);
    });
  }, [page]);

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
      // className={classNames(className, classes.TodosCollection)}
      dataLength={todos.length}
      next={fetchMoreTodos}
      hasMore={hasMore}
      loader={<></>}
      // style={{display: 'flex', flexDirection: 'column', flex: '1'}}
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
