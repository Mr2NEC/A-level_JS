import React from 'react';
import '../App.css';

export default function ButtonComponent(props) {
    return (
        <button className="ButtonStyle" onClick={props.onClick}>
            {props.title}
        </button>
    );
}
