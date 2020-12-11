import React, { useEffect } from 'react';
import СGoodCard from '../components/GoodCard';

export default function PageGood({
    match: {
        params: { _id },
    },
    getData,
}) {
    useEffect(() => (getData(_id), undefined), [_id]);
    return (
        <>
            <h1>Товар {_id}</h1>
            <СGoodCard />
        </>
    );
}
