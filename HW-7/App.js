import React, { useState } from 'react';
import eyeicon from './eye-icon.png';
import './App.css';

const Spoiler = ({ header = '+', open, children }) => {
    open = open ? true : false;
    const [openStat, setSpoiler] = useState(open);
    return (
        <>
            <div onClick={() => setSpoiler(!openStat)}>{header}</div>

            <div style={{ display: openStat ? 'block' : 'none' }}>
                {children}
            </div>
        </>
    );
};

const RangeInput = ({ min, max }) => {
    const [text, setText] = useState('my text');
    return (
        <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
                backgroundColor:
                    text.length >= min && text.length <= max ? '' : '#FAA',
            }}
        />
    );
};
const PasswordConfirm = ({ min }) => {
    const [password1, setText1] = useState('password');
    const [password2, setText2] = useState('password');
    const [eye1, setEye1] = useState(true);
    const [eye2, setEye2] = useState('password');

    return (
        <>
            <div>
                <h5>Password</h5>
                <input
                    type={eye1 ? 'password' : 'text'}
                    value={password1}
                    onChange={(e) => setText1(e.target.value)}
                    style={{
                        backgroundColor: password1.length >= min ? '' : '#FAA',
                        paddingRight: '20px',
                    }}
                />
                <img
                    onClick={() => setEye1(!eye1)}
                    src={eyeicon}
                    alt="eyeicon"
                    style={{ width: '20px', height: '20px' }}
                />
            </div>
            <div>
                <h5>Confirm Password</h5>
                <input
                    type={eye2 ? 'password' : 'text'}
                    value={password2}
                    onChange={(e) => setText2(e.target.value)}
                    style={{
                        backgroundColor:
                            password1.toLowerCase() === password2.toLowerCase()
                                ? ''
                                : '#FAA',
                        paddingRight: '20px',
                    }}
                />

                <img
                    onClick={() => setEye2(!eye2)}
                    src={eyeicon}
                    alt="eyeicon"
                    style={{
                        width: '20px',
                        height: '20px',
                    }}
                />
            </div>
        </>
    );
};

function App() {
    return (
        <>
            <h2>Spoiler</h2>
            <Spoiler header={<h1>Заголовок</h1>} open>
                Контент 1<p>лорем ипсум траливали и тп.</p>
            </Spoiler>
            <Spoiler>
                <h2>Контент 2</h2>
                <p>лорем ипсум траливали и тп.</p>
            </Spoiler>
            <h2>RangeInput</h2>
            <RangeInput min={2} max={10} />
            <h2>PasswordConfirm</h2>
            <PasswordConfirm min={2} />
        </>
    );
}

export default App;
