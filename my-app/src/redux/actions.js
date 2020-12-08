import {
    LOGIN,
    REGISTER,
    LOGOUT,
    PROMISE,
    RESOLVED,
    REJECTED,
    PENDING,
} from "./type";

const actionPromise = function (name, p) {
    //прикрутить имя промиса строковое
    const actionPending = () => ({ type: PROMISE, status: PENDING, name }); //имя должно попадать в объект action
    const actionResolved = (payload) => ({
        type: PROMISE, //поэтому имя параметр или имя name берется из замыкания
        status: RESOLVED,
        payload,
        name,
    });
    const actionRejected = (error) => ({
        type: PROMISE,
        status: REJECTED,
        error,
        name,
    });

    return async (dispatch) => {
        try {
            dispatch(actionPending());
            let result = await p;
            dispatch(actionResolved(result));
            return result;
        } catch (e) {
            dispatch(actionRejected(e));
        }
    };
};

const gql = (
    url = "http://shop-roles.asmer.fs.a-level.com.ua/graphql",
    query,
    variables
) =>
    fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());

export function actionLogin(login, password) {
    return async function (dispatch) {
        let result = await dispatch(
            actionPromise(
                "gql",
                gql(
                    undefined,
                    `query log($login:String, $password:String){
  login(login :$login, password:$password)
}`,
                    {
                        login: login,
                        password: password,
                    }
                )
            )
        );

        return dispatch(actionAuthLogin(result));
    };
}

function actionAuthLogin(data) {
    console.log(data);
    return { type: LOGIN, payload: data.data };
}

export function actionRegister(login, password) {
    return async function (dispatch) {
        let result = await dispatch(
            actionPromise(
                "gql",
                gql(
                    undefined,
                    `mutation reg($login:String, $password:String){
  UserUpsert (user:{login:$login, password:$password}){
    _id,login  
  }
}`,
                    {
                        login: `${login}`,
                        password: `${password}`,
                    }
                )
            )
        );
        let ok = await dispatch(actionAuthRegister(result));

        return dispatch(actionLogin(login, password));
    };
}

function actionAuthRegister(data) {
    return { type: REGISTER, payload: data };
}

export function actionLogout() {
    return { type: LOGOUT };
}
