import React from 'react';
import GoodsCard from './GoodsCard';
import { connect } from 'react-redux';

const defaultGoods = [
    {
        _id: '5dc4a6f85df9d670df48cc75',
        name: 'Samsung UE43NU7090UXUA',
    },
    {
        _id: '5dc4a7ea5df9d670df48cc77',
        name: 'Samsung UE55NU7090UXUA',
    },
    {
        _id: '5dc4a8665df9d670df48cc78',
        name: 'Xiaomi Mi TV UHD 4S 43" International Edition',
    },
];

function GoodsList({ goods = defaultGoods }) {
    return (
        <ul>
            {goods &&
                goods.map((good) => <GoodsCard key={good._id} {...good} />)}
        </ul>
    );
}

const CGoodsList = connect((state) => ({
    goods:
        state.promiseReducer.CategoryFindOne &&
        state.promiseReducer.CategoryFindOne.payload &&
        state.promiseReducer.CategoryFindOne.payload.data &&
        state.promiseReducer.CategoryFindOne.payload.data.CategoryFindOne &&
        state.promiseReducer.CategoryFindOne.payload.data.CategoryFindOne.goods,
}))(GoodsList);

export default CGoodsList;
