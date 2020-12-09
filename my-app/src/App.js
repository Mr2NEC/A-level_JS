import React, { useState } from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger';
import {
    actionLogin,
    actionRegister,
    actionLogout,
    actionCategoryFind,
} from './redux/actions';
import { rootReducer } from './redux/rootReducer';
import { Router, Route } from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory';
import './App.css';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
// const history = createHistory();

const LoginForm = ({ onLogin, btnText = 'Submit' }) => {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    return (
        <div className="LoginForm">
            <input onChange={(event) => setLogin(event.target.value)} />
            <input onChange={(event) => setPassword(event.target.value)} />
            <button
                className="LoginFormButton"
                onClick={() => onLogin(login, password)}
            >
                {btnText}
            </button>
        </div>
    );
};
const logoutButton = ({ onClick, children }) => {
    return (
        <button className="LoginFormButton" onClick={() => onClick()}>
            {children}
        </button>
    );
};

const CLogin = connect(null, { onLogin: actionLogin })(LoginForm);
const CRegister = connect(null, { onLogin: actionRegister })(LoginForm);

const LoginOrRegister = () => {
    const [logReg, setLogReg] = useState(<CLogin />);
    return (
        <div>
            <CLogoutButton />
            <button
                className="LoginFormButton"
                onClick={() => setLogReg(<CLogin />)}
            >
                Login
            </button>
            <button
                className="LoginFormButton"
                onClick={() => setLogReg(<CRegister />)}
            >
                Register
            </button>
            {logReg}
        </div>
    );
};
const CLogoutButton = connect(
    (state) => ({
        children:
            state.authReducer.payload && state.authReducer.payload.sub.login,
    }),
    { onClick: actionLogout }
)(logoutButton);

store.dispatch(actionCategoryFind());

const CategoryMenuItem = ({
    category: { _id, name } = { _id: 'NOID', name: 'NO Category' },
}) => (
    <li>
        <a href={`/category/${_id}`}>{name}</a>
    </li>
);

const CategoryMenu = ({
    categories = [
        {
            _id: '5dc45acf5df9d670df48cc48',
            name: "TV's",
        },
        {
            _id: '5dc49f4d5df9d670df48cc64',
            name: 'Airconditions',
        },
        {
            _id: '5dc458985df9d670df48cc47',
            name: 'Smartphones',
        },
    ],
}) => (
    <aside>
        <ul>
            {categories &&
                categories.map((category) => (
                    <CategoryMenuItem category={category} />
                ))}
        </ul>
    </aside>
);

const CCategoryMenu = connect((state) => ({
    categories:
        state.promiseReducer.categories &&
        state.promiseReducer.categories.payload &&
        state.promiseReducer.categories.payload.data &&
        state.promiseReducer.categories.payload.data.CategoryFind,
}))(CategoryMenu);

function App() {
    return (
        <Provider store={store}>
            <>
                <div className="authorizationForm">
                    <LoginOrRegister />
                </div>
                <CCategoryMenu />
                {/* <Router history={history}>
                    <Route path="/" component={PageMain} />
                </Router> */}
            </>
        </Provider>
    );
}

export default App;
