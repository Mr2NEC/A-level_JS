import React from "react";

export default function DashboardCard({ _id, orderGoods, total }) {
    return (
        <>
            <h3>Заказ {_id}</h3>
            <div>
                {orderGoods.map((orderGood) => (
                    <ol>
                        <li>{orderGood.good.name}</li>
                        <li>{orderGood.good.price}</li>
                        <li>{orderGood.count}</li>
                        <li>{orderGood.total}</li>
                    </ol>
                ))}
                <span>{total}</span>
            </div>
        </>
    );
}
