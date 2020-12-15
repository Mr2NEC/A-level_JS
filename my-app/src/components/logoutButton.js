import React from 'react';

export default function LogoutButton({ onClick, children }) {
    return (
        <button className="LoginFormButton" onClick={() => onClick()}>
            {children}
        </button>
    );
}
