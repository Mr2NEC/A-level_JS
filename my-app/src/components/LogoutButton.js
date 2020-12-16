import React from 'react';
import { connect } from 'react-redux';
import actionLogout from '../redux/action/actionLogout';

function LogoutButton({ onClick, children }) {
    return (
        <button className="LoginFormButton" onClick={() => onClick()}>
            {children}
        </button>
    );
}

const CLogoutButton = connect(
    (state) => ({
        children:
            state.authReducer.payload && state.authReducer.payload.sub.login,
    }),
    { onClick: actionLogout }
)(LogoutButton);

export default CLogoutButton;
