import React, { useState } from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger';
import {
    actionLogin,
    actionRegister,
    actionLogout,
    actionPosts,
} from './redux/actions';
import { rootReducer } from './redux/rootReducer';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import './App.css';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
const history = createHistory();

const Post = ({ post }) => (
    <div>
        <h2>{post.title}</h2>
        <p>{post.text}</p>
    </div>
);

const PostFeed = ({ posts = [] }) => (
    <div>{posts && posts.map((p) => <Post post={p} />)}</div>
);

const CPostFeed = connect((s) => ({
    posts:
        s.promise.posts &&
        s.promise.posts.payload &&
        s.promise.posts.payload.getPosts,
}))(PostFeed);

const PageMain = () => (
    <>
        <CPostFeed />
    </>
);

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
const logoutButton = () => {
    return <button className="LoginFormButton" />;
};

const CLogin = connect(null, { onLogin: actionLogin })(LoginForm);
const CRegister = connect(null, { onLogin: actionRegister })(LoginForm);
const CLogoutButton = connect(
    (state) => ({
        children:
            state.authReducer.payload && state.authReducer.payload.sub.login,
    }),
    { onClick: actionLogout }
)(logoutButton);

store.dispatch(actionPosts());

function App() {
    return (
        <Provider store={store}>
            <>
                <div className="authorizationForm">
                    <CLogoutButton />
                    <span>Login</span>
                    <CLogin />
                    <span>Register</span>
                    <CRegister />
                </div>
                <Router history={history}>
                    <Route path="/" component={PageMain} />
                </Router>
            </>
        </Provider>
    );
}

export default App;
