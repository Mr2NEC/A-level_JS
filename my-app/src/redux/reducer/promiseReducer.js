import { LOGIN, LOGOUT, PROMISE, PENDING } from '../type';

export default function promiseReducer(state = {}, action) {
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
