import React, { useState } from 'react';
import './App.css';

const gql = (
    url = 'http://shop-roles.asmer.fs.a-level.com.ua/graphql',
    query = '',
    variables = {}
) =>
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());

const loginQuery = (login, password) =>
    gql(
        undefined,
        `query log($login:String, $password:String){
  login(login:$login, password:$password)
}`,
        {
            login: `${login}`,
            password: `${password}`,
        }
    ).then((data) => console.log(data));

const LoginForm = ({ onLogin, btnText = 'Login...' }) => {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    return (
        <div className="LoginForm">
            <input onChange={(event) => setLogin(event.target.value)} />
            <input onChange={(event) => setPassword(event.target.value)} />
            <button onClick={() => onLogin(login, password)}>{btnText}</button>
        </div>
    );
};

function App() {
    return (
        <>
            <LoginForm onLogin={(l, p) => loginQuery(l, p)} />
        </>
    );
}

export default App;
