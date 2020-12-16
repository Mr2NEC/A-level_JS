import React, { useState } from 'react';
import { CLogin, CRegister } from './LoginForm';
import CLogoutButton from './LogoutButton';

export default function LoginOrRegister() {
    const [logReg, setLogReg] = useState(<CLogin textBtn="Sign in" />);
    return (
        <div>
            <CLogoutButton />
            <button
                className="LoginFormButton"
                onClick={() => setLogReg(<CLogin textBtn="Sign in" />)}
            >
                Login
            </button>
            <button
                className="LoginFormButton"
                onClick={() => setLogReg(<CRegister textBtn="Sign up" />)}
            >
                Register
            </button>
            {logReg}
        </div>
    );
}
