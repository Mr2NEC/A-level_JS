import React, { useState } from 'react';
import { connect } from 'react-redux';
import actionLogin from '../redux/action/actionLogin';
import actionRegister from '../redux/action/actionRegister';

function LoginForm({ onLogin, textBtn = 'Submit' }) {
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
                {textBtn}
            </button>
        </div>
    );
}

export const CLogin = connect(null, { onLogin: actionLogin })(LoginForm);
export const CRegister = connect(null, { onLogin: actionRegister })(LoginForm);
