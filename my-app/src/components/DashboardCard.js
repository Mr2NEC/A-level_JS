import React from 'react';

export default function DashboardCard({ _id, orderGoods, total }) {
    return (
        <>
            <h3>Заказ {_id}</h3>
            <div>
                {orderGoods.map((orderGood) => (
                    <ol key={JSON.stringify(_id + Math.random())}>
                        <li>{orderGood.good.name}</li>
                        <li>
                            {orderGood.good.price} X {orderGood.count}
                        </li>
                        <li>{orderGood.total}</li>
                    </ol>
                ))}
                <span>{total}</span>
            </div>
        </>
    );
}
