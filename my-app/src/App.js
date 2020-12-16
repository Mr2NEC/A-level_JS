import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import './App.css';

import actionCategoryFind from './redux/action/actionCategoryFind';
import actionOrders from './redux/action/actionOrders';

import store from './redux/store';

import CCategoryMenu from './components/CategoryMenu';
import CDashboardButton from './components/DashboardButton';
import LoginOrRegister from './components/LoginOrRegister';

import PageMain from './page/PageMain';
import CPageCategory from './page/PageCategory';
import СPageGood from './page/PageGood';
import PageDashboard from './page/PageDashboard';

const history = createHistory();

store.dispatch(actionCategoryFind());
store.dispatch(actionOrders());

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
