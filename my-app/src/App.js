import React, { useState } from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger';
import { rootReducer } from './redux/rootReducer';
import { Router, Route } from 'react-router-dom';


import {
    actionLogin,
    actionRegister,
    actionLogout,
    actionCategoryFind,
    actionCategoryFindOne
} from './redux/actions';

import CategoryMenu from './components/CategoryMenu'
import LoginForm from './components/LoginForm'
import logoutButton from './components/logoutButton'
import PageMain from './page/PageMain'
import PageCategory from './page/PageCategory'

import createHistory from 'history/createBrowserHistory';
import './App.css';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
const history = createHistory();

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

const CCategoryMenu = connect((state) => ({
    categories:
        state.promiseReducer.categories &&
        state.promiseReducer.categories.payload &&
        state.promiseReducer.categories.payload.data &&
        state.promiseReducer.categories.payload.data.CategoryFind,
}))(CategoryMenu);

const CPageCategory =connect(null, {getData:actionCategoryFindOne})(PageCategory)

function App() {
    return (
        <Provider store={store}>
            <>
                <div className="authorizationForm">
                    <LoginOrRegister />
                </div>
                
                <Router history={history}>
                    <CCategoryMenu />
                    <main>
                        <Route path='/' component={PageMain} exact />
                        <Route path='/category/:_id' component={CPageCategory} exact />
                    </main> 
                </Router>
            </>
        </Provider>
    );
}

export default App;
