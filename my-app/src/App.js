import React, { useState } from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import {
    actionLogin,
    actionRegister,
    actionLogout,
    actionCategoryFind,
    actionCategoryFindOne,
    actionGoodFindOne,
    actionOrders,
} from './redux/actions';

import CategoryMenu from './components/CategoryMenu';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import DashboardButton from './components/DashboardButton';
import store from './store';

import PageMain from './page/PageMain';
import PageCategory from './page/PageCategory';
import PageGood from './page/PageGood';
import PageDashboard from './page/PageDashboard';

import createHistory from 'history/createBrowserHistory';
import './App.css';

const history = createHistory();

const CLogin = connect(null, { onLogin: actionLogin })(LoginForm);
const CRegister = connect(null, { onLogin: actionRegister })(LoginForm);

const LoginOrRegister = () => {
    const [logReg, setLogReg] = useState(<CLogin />);
    return (
        <div>
            <CLogoutButton />
            <button
                className="LoginFormButton"
                onClick={() => setLogReg(<CLogin />)}
            >
                Login
            </button>
            <button
                className="LoginFormButton"
                onClick={() => setLogReg(<CRegister />)}
            >
                Register
            </button>
            {logReg}
        </div>
    );
};
const CLogoutButton = connect(
    (state) => ({
        children:
            state.authReducer.payload && state.authReducer.payload.sub.login,
    }),
    { onClick: actionLogout }
)(LogoutButton);

store.dispatch(actionCategoryFind());
store.dispatch(actionOrders());

const CCategoryMenu = connect((state) => ({
    categories:
        state.promiseReducer.categories &&
        state.promiseReducer.categories.payload,
}))(CategoryMenu);

const CPageCategory = connect(null, { getData: actionCategoryFindOne })(
    PageCategory
);

const СPageGood = connect(null, { getData: actionGoodFindOne })(PageGood);

const CDashboardButton = connect(
    (state) => ({
        children:
            state.promiseReducer.orders &&
            state.promiseReducer.orders.payload &&
            (state.promiseReducer.orders.payload.length === 0
                ? 0
                : state.promiseReducer.orders.payload[0] &&
                  state.promiseReducer.orders.payload[0].orderGoods.length),
    }),
    null
)(DashboardButton);

function App() {
    return (
        <Provider store={store}>
            <>
                <div className="authorizationForm">
                    <LoginOrRegister />
                </div>

                <Router history={history}>
                    <CCategoryMenu />
                    <main>
                        <Route path="/" component={PageMain} exact />
                        <Route
                            path="/category/:_id"
                            component={CPageCategory}
                            exact
                        />
                        <Route path="/good/:_id" component={СPageGood} exact />
                        <CDashboardButton />
                        <Route
                            path="/Dashboar/"
                            component={PageDashboard}
                            exact
                        />
                    </main>
                </Router>
            </>
        </Provider>
    );
}

export default App;
