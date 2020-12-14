import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
