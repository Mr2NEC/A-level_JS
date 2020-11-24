import React, { useState } from 'react';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import './App.css';

const gql = (
    url = 'http://shop-roles.asmer.fs.a-level.com.ua/graphql',
    query,
    variables
) =>
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());

const promiseReducer = (state = {}, { type, status, payload, error, name }) =>
    type === 'PROMISE'
        ? { ...state, [name]: { status, payload, error } }
        : state;

const store = createStore(promiseReducer, applyMiddleware(thunk));

const actionPromise = function (name, p) {
    //прикрутить имя промиса строковое
    const actionPending = () => ({ type: 'PROMISE', status: 'PENDING', name }); //имя должно попадать в объект action
    const actionResolved = (payload) => ({
        type: 'PROMISE', //поэтому имя параметр или имя name берется из замыкания
        status: 'RESOLVED',
        payload,
        name,
    });
    const actionRejected = (error) => ({
        type: 'PROMISE',
        status: 'REJECTED',
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

const actionLogin = (login, password) =>
    actionPromise(
        'login',
        gql(
            undefined,
            `query log($login:String, $password:String){
  login(login :$login, password:$password)
}`,
            {
                login: login,
                password: password,
            }
        )
    );

const LoginForm = ({ onLogin, btnText = 'Login...' }) => {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    return (
        <div className="LoginForm">
            <input onChange={(event) => setLogin(event.target.value)} />
            <input onChange={(event) => setPassword(event.target.value)} />
            <button onClick={() => onLogin(login, password)}>{btnText}</button>
        </div>
    );
};

const CLogin = connect(null, { onLogin: actionLogin })(LoginForm);
const CTablo = connect((s) => ({ children: s.login && s.login.status }))('h1');
function App() {
    store.subscribe(() => console.log(store.getState()));
    return (
        <Provider store={store}>
            <>
                <CLogin />
                <CTablo />
            </>
        </Provider>
    );
}

export default App;
