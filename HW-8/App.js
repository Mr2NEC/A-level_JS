import React, {useState} from 'react';
import './App.css';
import DivComponent from './components/DivComponent'
import InputComponent from './components/InputComponent'
import ButtonComponent from './components/ButtonComponent'

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
    ).then((data) => data);

function App() {
const [login, setLogin] = useState('login');
const [password, setPassword] = useState('password');
let inputsArr = [
    {id:1, type:'text', value:login, onChange:(e)=> setLogin(e.target.value)},
    {id:2, type:'password', value:password, onChange:(e)=> setPassword(e.target.value)}]
  return (
      <>
        <DivComponent>
        {inputsArr.map(inputObj => {
                return <InputComponent inputObj={inputObj} key={inputObj.id}/>})
                }
        <ButtonComponent onClick={() => loginQuery(login,password).then((res)=>console.log(res))}/>
        </DivComponent>
      </>
  );
}

export default App;
