import { combineReducers } from 'redux';
import {
    LOGIN,
    REGISTER,
    LOGOUT,
    PROMISE,
    PENDING,
    CART_ADD,
    CART_DELETE,
    CART_SET,
    CART_CLEAR,
} from './type';
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
function cartReducer(state = {}, action) {
    console.log(action.type);
    if (action.type === CART_ADD && action._id !== undefined) {
        if (state[action._id] !== undefined) {
            state[action._id]++;
            return state;
        }
        return {
            ...state,
            [action._id]: 1,
        };
    }
    if (action.type === CART_DELETE) {
        delete state[action._id];
        return state;
    }
    if (action.type === CART_SET) {
        if (state[action._id] !== undefined) {
            for (let keyId in state) {
                if (keyId === action._id) {
                    state[keyId] = state[keyId] + action.count;
                }
            }
            return state;
        }
        return {
            ...state,
            [action._id]: action.count,
        };
    }
    if (action.type === CART_CLEAR) {
        return {};
    }

    return state;
}

export const rootReducer = combineReducers({
    promiseReducer: promiseReducer,
    authReducer: authReducer,
    cartReducer: cartReducer,
});
