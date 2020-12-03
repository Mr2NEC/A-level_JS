import { combineReducers } from 'redux';
import { LOGIN, LOGOUT, PROMISE, PENDING } from './type';
import jwt_decode from "jwt-decode";

function promiseReducer(state={}, action){
    if ([LOGOUT, LOGIN].includes(action.type)) return {}
    if (action.type === PROMISE){
        const { name="default", status, payload, error} = action
        if (status){
            return {
                ...state, [name]: {status, payload: (status === PENDING && state[name] && state[name].payload) || payload, error}
            }
        }
    }
    return state;
}

function authReducer(state , action) {
    if (state === undefined){
        if(localStorage.getItem('token') !== null){
           return authReducer({},{ type: LOGIN, payload: {login:localStorage.getItem('token')}});
        }

        return {}
    }
    if (action.type === LOGIN) {
        if (action.payload.login !== null) {
            localStorage.setItem('token', action.payload.login);
            return {
                ...state,

                token: action.payload.login,
                payload:jwt_decode(action.payload.login)
            };
        }
    }
    if(action.type === LOGOUT){
        localStorage.removeItem('token')
        return {}
    }

    return state;
}

export const rootReducer = combineReducers({
    promiseReducer: promiseReducer,
    authReducer:authReducer
});
