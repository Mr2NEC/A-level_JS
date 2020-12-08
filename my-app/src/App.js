import React, { useState } from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import logger from "redux-logger";
import { actionLogin, actionRegister, actionLogout } from "./redux/actions";
import { rootReducer } from "./redux/rootReducer";
import "./App.css";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const LoginForm = ({ onLogin, btnText = "Submit" }) => {
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
            </>
        </Provider>
    );
}

export default App;
