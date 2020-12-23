import React from 'react';

export default function CardButton({ onClick, children, param }) {
    return (
        <button
            className="LoginFormButton"
            onClick={() => onClick({ ...param })}
        >
            {children}
        </button>
    );
}
