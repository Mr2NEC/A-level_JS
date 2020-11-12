function createStore(reducer) {
    let state = reducer(undefined, {});
    let cbs = [];

    function dispatch(action) {
        if (typeof action === 'function') {
            return action(dispatch);
        }
        let newState = reducer(state, action);
        if (state !== newState) {
            state = newState;
            for (let cb of cbs) cb();
        }
    }

    return {
        getState() {
            return state;
        },
        dispatch: dispatch,
        subscribe(cb) {
            cbs.push(cb);
            return () => {
                cbs = cbs.filter((someElement) => someElement !== cb);
            };
        },
    };
}

const store = createStore(
    (state = {}, { name, type, status, payload, error }) =>
        type === 'PROMISE'
            ? (state = { ...state, [name]: { status, payload, error } })
            : state
);

store.subscribe(() => console.log(store.getState()));

const actionPromise = (name, p) => {
    const actionPending = () => ({ name, type: 'PROMISE', status: 'PENDING' });
    const actionResolved = (payload) => ({
        name,
        type: 'PROMISE',
        status: 'RESOLVED',
        payload,
    });
    const actionRejected = (error) => ({
        name,
        type: 'PROMISE',
        status: 'REJECTED',
        error,
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

//Authorization / Registration

let ARBody = document.querySelector('.authorizationRegistrationBody');
let btn = document.querySelector('#authorizationBtn');
const delay = (ms) => new Promise((ok) => setTimeout(() => ok(ms), ms));

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

const actionLogin = (login, password) =>
    store.dispatch(actionPromise('login', loginQuery(login, password))); //LOGIN

const actionRegister = (login, password) => async (dispatch) => {
    await dispatch(actionPromise('register', registerQuery(login, password))); //REGISTER
    await dispatch(actionLogin(login, password)); //LOGIN
};

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
    ).then((data) => {
        messageFu(data);
        return data;
    });

const registerQuery = (login, password) =>
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
    ).then((data) => {
        messageFu(data);
        return data;
    });

for (let node of ARBody.childNodes) {
    node.addEventListener('click', function (event) {
        changeLoginOrRegister(event.target.id);
    });
}

function changeLoginOrRegister(id) {
    let id2 = id === 'authorization' ? 'registration' : 'authorization';
    let elem = document.querySelector(`#${id}`);
    let elem2 = document.querySelector(`#${id2}`);
    if (elem.style.backgroundColor !== 'green') {
        elem.style.backgroundColor = 'green';
        elem.style.color = 'honeydew';
        elem.style.border = '1px solid honeydew';
        elem2.style.backgroundColor = 'white';
        elem2.style.color = 'black';
        elem2.style.border = '1px solid black';
    }
    id === 'authorization' ? (btn.value = 'Sign in') : (btn.value = 'Register');
}

btn.addEventListener('click', function (event) {
    let login = document.querySelector(`#login`);
    let password = document.querySelector(`#password`);

    if (event.target.value === 'Sign in') {
        actionLogin(login.value, password.value);
    }

    if (event.target.value === 'Register') {
        store.dispatch(actionRegister(login.value, password.value));
    }
});

async function createResponseDiv(color, text, ms) {
    let wrapper = document.querySelector('#wrapper');
    let responseDiv = document.createElement('div');
    responseDiv.style.color = color;
    responseDiv.style.width = '100%';
    responseDiv.style.padding = '10px';
    responseDiv.innerHTML = text;
    wrapper.appendChild(responseDiv);
    await delay(ms);
    responseDiv.remove();
}

function messageFu(data) {
    if (typeof data.data.login === 'string') {
        createResponseDiv('green', 'Successfully authorized', 5000);
    } else if (typeof data.data.UserUpsert === 'object') {
        createResponseDiv(
            'green',
            `${data.data.UserUpsert.login} successfully registered`,
            5000
        );
    }
    if (data.data.login === null) {
        createResponseDiv('red', 'Incorrect login or password', 3000);
    }

    if (data.data.UserUpsert === null) {
        data.errors.forEach((element) => {
            createResponseDiv('red', element.message, 5000);
        });
    }
}
