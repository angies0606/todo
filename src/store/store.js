import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initial-state';
import rootReducer from './reducers';

const store = createStore(rootReducer, initialState, composeWithDevTools());

export default store;