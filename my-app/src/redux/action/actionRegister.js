import { REGISTER } from '../type';
import actionLogin from './actionLogin';
import { gql } from './gql';
import actionPromise from './actionPromise';

export default function actionRegister(login, password) {
    const name = 'Regiser';
    const mutation = `mutation reg($login:String, $password:String){UserUpsert (user:{login:$login, password:$password}){_id,login}}`;
    const variables = { login: `${login}`, password: `${password}` };

    return async function (dispatch) {
        let result = await dispatch(
            actionPromise(name, gql(mutation, variables))
        );

        dispatch(actionAuthRegister(result));

        return dispatch(actionLogin(login, password));
    };
}

function actionAuthRegister(data) {
    return { type: REGISTER, payload: data };
}
