import {useReducer, useCallback, useEffect, useMemo} from 'react';
import axios from '@api/axios';

/**
 * @param {number} state
 * @param {{ type: any; }} action
 */
function progressReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
}

const initialState = 0

export function useProgress() {
  const [progressCounter, dispatch] = useReducer(progressReducer, initialState);

  const increment = useCallback(() => {
    // debugger
    dispatch({type: 'increment'})
  }, [dispatch]);

  const decrement = useCallback(() => {
    // debugger
    dispatch({type: 'decrement'})
  }, [dispatch]);

  useProgressInAxiosInterceptors(increment, decrement);

  const state = useMemo(() => {
    return {
      increment,
      decrement,
      progressCounter,
      isProgress: progressCounter > 0
    };
  }, [increment, decrement, progressCounter]);

  return state;
}

function useProgressInAxiosInterceptors(increment, decrement) {
  useEffect(() => {
    const requestInterceptorId = axios.interceptors.request.use(function (req) {
      increment();
      return req;
    });

    const responseInterceptorId = axios.interceptors.response.use(function(res) {
      decrement();
      return res;
    }, function(err) {
      decrement();
      return Promise.reject(err);
    })

    return () => {
      axios.interceptors.request.eject(requestInterceptorId);
      axios.interceptors.response.eject(responseInterceptorId);
    }
  }, [increment, decrement]);
}