import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function DashboardButton({ children }) {
    return (
        <Link to={`/Dashboar/`}>
            <button>{children}</button>
        </Link>
    );
}

const CDashboardButton = connect(
    (state) => ({
        children:
            state.promiseReducer.Orders &&
            state.promiseReducer.Orders.payload &&
            (state.promiseReducer.Orders.payload.length === 0
                ? 0
                : state.promiseReducer.Orders.payload[0] &&
                  state.promiseReducer.Orders.payload[0].orderGoods.length),
    }),
    null
)(DashboardButton);

export default CDashboardButton;
