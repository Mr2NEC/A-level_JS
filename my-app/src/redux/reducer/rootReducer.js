import { combineReducers } from 'redux';
import promiseReducer from './promiseReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';

export const rootReducer = combineReducers({
    promiseReducer: promiseReducer,
    authReducer: authReducer,
    cartReducer: cartReducer,
});
