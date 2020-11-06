function createStore(reducer) {
    let state = reducer(undefined, {});
    let cbs = [];

    function dispatch(action) {
        if (typeof action === 'function') {
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
    (
        state = { status: '', payload: undefined, error: undefined },
        { type, status, payload, error, name }
    ) => (type === 'PROMISE' ? { status, payload, error } : state)
); //и этот name должен как-то учитываться в структуре хранилища
//было {status, error, payload}
//сделайте {имя1: {status, error, payload},
//          имя2:{status, error, payload},
//          имя3:{status, error, payload},

//          login:{status, error, payload},
//          register:{status, error, payload},

const actionPending = () => ({ type: 'PROMISE', status: 'PENDING' }); //имя должно попадать в объект action
const actionResolved = (payload) => ({
    type: 'PROMISE', //поэтому имя параметр или имя name берется из замыкания
    status: 'RESOLVED',
    payload,
});
const actionRejected = (error) => ({
    type: 'PROMISE',
    status: 'REJECTED',
    error,
});

console.log(store.getState());

store.subscribe(() => console.log(store.getState()));

const actionPromise = (
    name,
    p //прикрутить имя промиса строковое
) => async (dispatch) => {
    try {
        dispatch(actionPending());
        let result = await p;
        dispatch(actionResolved(result));
        return result;
    } catch (e) {
        dispatch(actionRejected(e));
    }
};

const actionDefferredPromise = (ms, getPromise) => async (dispatch) => {
    await dispatch(actionPromise('delay', delay(ms))); //REGISTER
    await dispatch(actionPromise('defferred', getPromise())); //LOGIN
};

const actionLogin = (login, password) =>
    actionPromise('login', loginQuery(login, password));

const actionRegister = (login, password) => async (dispatch) => {
    await dispatch('register', actionPromise(registerQuery(login, password))); //REGISTER
    await dispatch(actionLogin(login, password)); //LOGIN
};

const delay = (ms) => new Promise((ok) => setTimeout(() => ok(ms), ms));
store.dispatch(
    actionDefferredPromise(2000, () =>
        fetch('https://api.exchangeratesapi.io/latest').then((res) =>
            res.json()
        )
    )
);

store.dispatch(actionPromise(delay(1000)));

// const store = createStore((state={counter: 0}, action) => {
//     if (action.type === 'INC'){
//         return {counter: state.counter +1}
//     }
//     if (action.type === 'DEC'){
//         return {counter: state.counter -1}
//     }
//     if (action.type === 'RESET'){
//         return {counter: 0}
//     }
//     return state;
// })

// function btn(parent = document.body) {
//     let button = document.createElement('button');
//     button.onclick = () => store.dispatch({ type: 'INC' });
//     const cb = () => (button.innerText = store.getState().counter);
//     cb();
//     store.subscribe(cb);
//     parent.append(button);
// }

// [...'0123456789'].forEach(() => btn());

// function bigTablo(parent = document.body) {
//     let h1 = document.createElement('h1');
//     h1.style.fontSize = '5em';
//     h1.onclick = () => store.dispatch({ type: 'RESET' });

//     const cb = () => (h1.innerText = store.getState().counter);
//     cb();
//     store.subscribe(cb);
//     parent.append(h1);
// }

// [...'01234'].forEach(() => bigTablo());
