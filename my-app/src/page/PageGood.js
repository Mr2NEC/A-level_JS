import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import СGoodCard from '../components/GoodCard';
import actionGoodFindOne from '../redux/action/actionGoodFindOne';

function PageGood({
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

const СPageGood = connect(null, { getData: actionGoodFindOne })(PageGood);

export default СPageGood;
