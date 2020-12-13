import React from "react";
import DashboardCard from "./DashboardCard";
import { connect } from "react-redux";

const defaultDashboardGoods = [
    {
        _id: "5fd381efb00392130cb0c9f0",
        total: 1500,
        orderGoods: [
            {
                total: 500,
                count: 1,
                good: {
                    name: 'Xiaomi Mi TV UHD 4S 43" International Edition',
                    price: 500,
                    _id: "5dc4a8665df9d670df48cc78",
                },
            },
            {
                total: 1000,
                count: 2,
                good: {
                    name: 'Xiaomi Mi TV UHD 4S 43" International Edition',
                    price: 500,
                    _id: "5dc4a8665df9d670df48cc78",
                },
            },
        ],
    },
];

function DashboardList({ orders = defaultDashboardGoods }) {
    console.log(orders);
    orders.map((order) => console.log(order));
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
    orders: state.promiseReducer.orders && state.promiseReducer.orders.payload,
}))(DashboardList);

export default CDashboardList;
