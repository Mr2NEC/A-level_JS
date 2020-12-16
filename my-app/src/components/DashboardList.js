import React from 'react';
import DashboardCard from './DashboardCard';
import { connect } from 'react-redux';

const defaultDashboardGoods = [
    {
        _id: 'нет ID',
        total: 0,
        orderGoods: [
            {
                total: 0,
                count: 0,
                good: {
                    name: 'нет товара',
                    price: 0,
                    _id: '1',
                },
            },
        ],
    },
];

function DashboardList({ orders = defaultDashboardGoods }) {
    return (
        <>
            <div>
                {orders &&
                    orders.map((order) => (
                        <DashboardCard key={order._id} {...order} />
                    ))}
            </div>
        </>
    );
}

const CDashboardList = connect((state) => ({
    orders: state.promiseReducer.Orders && state.promiseReducer.Orders.payload,
}))(DashboardList);

export default CDashboardList;
