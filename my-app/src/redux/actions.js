import { LOGIN,LOGOUT } from './type';

const gql = (
    url = 'http://shop-roles.asmer.fs.a-level.com.ua/graphql',
    query,
    variables
) =>
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());

export function actionLogin(login, password) {
    return function (dispatch) {
        gql(
            undefined,
            `query log($login:String, $password:String){
  login(login :$login, password:$password)
}`,
            {
                login: login,
                password: password,
            }
        ).then((data) => {
            console.log(data);
            return dispatch({ type: LOGIN, data: data.data });
        });
    };
}

export function actionLogout(){
    return {type:LOGOUT}

}
