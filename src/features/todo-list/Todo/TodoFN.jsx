import {useState, useEffect} from 'react';

function abortableFetch(request, opts) {
  const controller = new AbortController();
  const signal = controller.signal;

  return {
    abort: () => controller.abort(),
    ready: fetch(request, { ...opts, signal })
  };
}

function useFetch(url) {
  const [result, setResult] = useState();

  useEffect(() => {
    const {abort, ready} = abortableFetch(url);
    ready.then((response) => {
      setResult(response);
    });
  
    return () => {
      abort()
    }
  }, [url])

  return result;
}

export function Todo({todoId}) {
  const todo = useFetch(`http://server.com/todo/${todoId}`);

  return (
    <>
      <div>{todo.name}</div>
    </>
  );
}