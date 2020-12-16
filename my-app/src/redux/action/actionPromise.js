import { PROMISE, RESOLVED, REJECTED, PENDING } from '../type';

const actionPromise = function (name, p) {
    const actionPending = () => ({ type: PROMISE, status: PENDING, name });
    const actionResolved = (payload) => ({
        type: PROMISE,
        status: RESOLVED,
        payload,
        name,
    });
    const actionRejected = (error) => ({
        type: PROMISE,
        status: REJECTED,
        error,
        name,
    });

    return async (dispatch) => {
        try {
            dispatch(actionPending());
            let result = await p;
            dispatch(actionResolved(result));
            return result;
        } catch (e) {
            dispatch(actionRejected(e));
        }
    };
};

export default actionPromise;
