import { LOGIN } from '../type';
import { gql } from './gql';
import actionPromise from './actionPromise';

function actionAuthLogin(data) {
    return { type: LOGIN, payload: data };
}

export default function actionLogin(login, password) {
    const name = 'Login';
    const query = `query log($login:String, $password:String){login(login :$login, password:$password)}`;
    const variables = { login: login, password: password };

    return async function (dispatch) {
        let result = await dispatch(actionPromise(name, gql(query, variables)));

        return dispatch(actionAuthLogin(result));
    };
}
