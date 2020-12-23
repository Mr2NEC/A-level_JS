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
        children: Object.keys(state.cartReducer).length,
    }),
    null
)(DashboardButton);

export default CDashboardButton;
