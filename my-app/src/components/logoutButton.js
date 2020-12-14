import React from 'react';

export default function logoutButton({ onClick, children }) {
    return (
        <button className="LoginFormButton" onClick={() => onClick()}>
            {children}
        </button>
    );
}
