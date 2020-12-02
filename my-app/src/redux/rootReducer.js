import { combineReducers } from 'redux';
import { LOGIN,LOGOUT } from './type';
import jwt_decode from "jwt-decode";

function promiseReducer(state , action) {
    if (state === undefined){
        return {}
    }
    if (action.type === LOGIN) {
        if (action.data.login !== null) {
            localStorage.setItem('token', action.data.login);
            return {
                ...state,

                token: action.data.login,
                payload:jwt_decode(action.data.login)
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
});
