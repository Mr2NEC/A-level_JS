import React, { useState } from 'react';

export default function  LoginForm ({ onLogin, btnText = 'Submit' }) {
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