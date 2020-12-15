import {
    LOGIN,
    REGISTER,
    LOGOUT,
    PROMISE,
    RESOLVED,
    REJECTED,
    PENDING,
    CART_ADD,
    CART_DELETE,
    CART_SET,
    CART_CLEAR,
} from './type';
// import { GraphQLClient } from 'graphql-request';

// const gql = new GraphQLClient('/graphql');

export const actionSearch = (text) => ({ type: 'SEARCH', text });
export const actionSearchResult = (payload) => ({
    type: 'SEARCH_RESULT',
    payload,
});

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

const getGQL = (
    url = 'http://shop-roles.asmer.fs.a-level.com.ua/graphql',
    getHeaders = () =>
        localStorage.token
            ? { Authorization: `Bearer ${localStorage.token}` }
            : {}
) => (query = '', variables = {}) =>
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...getHeaders(),
        },
        body: JSON.stringify({ query, variables }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.errors) {
                throw new Error(JSON.stringify(data.errors, null, 4));
            }
            const firstKey = Object.keys(data.data)[0];
            return firstKey ? data.data[firstKey] : data.data;
        });

const gql = getGQL();

export const actionCategoryFind = () => {
    return actionPromise(
        'categories',
        gql(
            `query {
  CategoryFind(query:"[{\\"parent\\":null}]"){
    _id,name
  }
}  `
        )
    );
};
export const actionCategoryFindOne = (_id) => {
    return actionPromise(
        'CategoryFindOne',
        gql(
            `query CategoryOne($query:String){
  CategoryFindOne(query:$query){
    _id,name,goods{
        _id,name
    }
  }
}  `,
            {
                query: JSON.stringify([{ _id }]),
            }
        )
    );
};

export const actionGoodFindOne = (_id) => {
    return actionPromise(
        'GoodFindOne',
        gql(
            `query good($good:String){
  GoodFindOne(query:$good){
    _id, name, createdAt, description, price
  }
} `,
            {
                good: JSON.stringify([{ _id }]),
            }
        )
    );
};

export const actionOrders = () => {
    return actionPromise(
        'orders',
        gql(
            `query OrderFind($allQery:String){
            OrderFind(query:$allQery){_id total orderGoods{
                total count good{name, price, _id}
                }
                }
            }`,
            {
                allQery: JSON.stringify([{}]),
            }
        ).then((data) => {
            localStorage.setItem('Order', JSON.stringify(data));
            return data;
        })
    );
};

export function actionLogin(login, password) {
    return async function (dispatch) {
        let result = await dispatch(
            actionPromise(
                'log',
                gql(
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
    return { type: LOGIN, payload: data };
}

export function actionRegister(login, password) {
    return async function (dispatch) {
        let result = await dispatch(
            actionPromise(
                'reg',
                gql(
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
        await dispatch(actionAuthRegister(result));

        return dispatch(actionLogin(login, password));
    };
}

function actionAuthRegister(data) {
    return { type: REGISTER, payload: data };
}

export function actionLogout() {
    return { type: LOGOUT };
}

export function actionCART_ADD(_id, count) {
    return { type: CART_ADD, _id: _id, count: count };
}
export function actionCART_DELETE(_id) {
    return { type: CART_DELETE, _id: _id };
}
