import { combineReducers } from 'redux';
import { LOGIN, REGISTER, LOGOUT, PROMISE, PENDING } from './type';
import jwt_decode from 'jwt-decode';

function promiseReducer(state = {}, action) {
    if ([LOGOUT, LOGIN].includes(action.type)) return {};
    if (action.type === PROMISE) {
        const { name = 'default', status, payload, error } = action;
        if (status) {
            return {
                ...state,
                [name]: {
                    status,
                    payload:
                        (status === PENDING &&
                            state[name] &&
                            state[name].payload) ||
                        payload,
                    error,
                },
            };
        }
    }
    return state;
}

function authReducer(state, action) {
    if (state === undefined) {
        if (localStorage.getItem('token') !== null) {
            return authReducer(
                {},
                {
                    type: LOGIN,
                    payload: localStorage.getItem('token'),
                }
            );
        }

        return {};
    }
    if (action.type === LOGIN) {
        console.log(action);
        if (action.payload !== null && action.payload !== undefined) {
            localStorage.setItem('token', action.payload);
            return {
                ...state,

                token: action.payload,
                payload: jwt_decode(action.payload),
            };
        }
    }
    if (action.type === REGISTER) {
        console.log(action);
        return state;
    }
    if (action.type === LOGOUT) {
        localStorage.removeItem('token');
        return {};
    }

    return state;
}

export const rootReducer = combineReducers({
    promiseReducer: promiseReducer,
    authReducer: authReducer,
});
