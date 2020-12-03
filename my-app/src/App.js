import React, { useState } from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger';
import { actionLogin,actionLogout } from './redux/actions';
import { rootReducer } from './redux/rootReducer';
import './App.css';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

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
const CLogoutButton = connect((state)=>({children:state.authReducer.payload && state.authReducer.payload.sub.login}),{onClick:actionLogout})('button')

function App() {
    return (
        <Provider store={store}>
            <>
                <CLogoutButton />
                <CLogin />
            </>
        </Provider>
    );
}

export default App;
