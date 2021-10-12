import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router'
import initialState from './initial-state';
import rootReducer from './reducers';
import history from '../history';

const store = createStore(rootReducer, initialState, composeWithDevTools(
  applyMiddleware(
    routerMiddleware(history)
  )
));

export default store;