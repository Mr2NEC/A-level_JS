import React from 'react';
import '../App.css';

export default function InputComponent({ inputObj }) {
    return (
        <input
            className="InputStyle"
            type={inputObj.type}
            id={'input' + inputObj.id}
            value={inputObj.value}
            onChange={inputObj.onChange}
        />
    );
}
