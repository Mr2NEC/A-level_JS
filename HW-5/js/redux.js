function createStore(reducer) {
    let state = reducer(undefined, {});
    let cbs = [];

    function dispatch(action) {
        if (typeof action === "function") {
            return action(dispatch);
        }
        let newState = reducer(state, action);
        if (state !== newState) {
            state = newState;
            for (let cb of cbs) cb();
        }
    }

    return {
        getState() {
            return state;
        },
        dispatch: dispatch,
        subscribe(cb) {
            cbs.push(cb);
            return () => {
                cbs = cbs.filter((someElement) => someElement !== cb);
            };
        },
    };
}

const store = createStore(
    (state = {}, { name, type, status, payload, error }) =>
        type === "PROMISE"
            ? (state = { ...state, [name]: { status, payload, error } })
            : state
);

console.log(store.getState());

store.subscribe(() => console.log(store.getState()));

const actionPromise = (name, p) => {
    const actionPending = () => ({ name, type: "PROMISE", status: "PENDING" });
    const actionResolved = (payload) => ({
        name,
        type: "PROMISE",
        status: "RESOLVED",
        payload,
    });
    const actionRejected = (error) => ({
        name,
        type: "PROMISE",
        status: "REJECTED",
        error,
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

const actionDefferredPromise = (ms, getPromise) => async (dispatch) => {
    await dispatch(actionPromise("delay", delay(ms))); //REGISTER
    await dispatch(actionPromise("defferred", getPromise())); //LOGIN
};

const delay = (ms) => new Promise((ok) => setTimeout(() => ok(ms), ms));
store.dispatch(
    actionDefferredPromise(2000, () =>
        fetch("https://api.exchangeratesapi.io/latest").then((res) =>
            res.json()
        )
    )
);

// const actionLogin = (login, password) =>
//     actionPromise("login", loginQuery(login, password));

// const actionRegister = (login, password) => async (dispatch) => {
//     await dispatch("register", actionPromise(registerQuery(login, password))); //REGISTER
//     await dispatch(actionLogin(login, password)); //LOGIN
// };
