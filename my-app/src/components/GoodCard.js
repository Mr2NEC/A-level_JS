import React, { useState } from 'react';
import { connect } from 'react-redux';
import CardButton from './CardButton';
import { actionCART_ADD, actionCART_DELETE } from '../redux/actions';

const defaultGood = {
    _id: '5dc4a8665df9d670df48cc78',
    name: 'Xiaomi Mi TV UHD 4S 43" International Edition',
    createdAt: '1573169254000',
    description:
        'Диагональ экрана: 43"; Тип телевизора: LED; Разрешение экрана: 4K (3840x2160); Smart TV: Есть; Wi-Fi: Есть; USB 2.0: 2 шт;',
    price: 500,
};

const CCardButtonAdd = connect(null, { onClick: actionCART_ADD })(CardButton);
const CCardButtonDel = connect(null, { onClick: actionCART_DELETE })(
    CardButton
);

function GoodCard({ good = defaultGood }) {
    return (
        <>
            <ul>
                <li>{good.name}</li>
                <li>{good.description}</li>
                <li>{good.price}</li>
            </ul>
            <CCardButtonAdd
                children="Добавить в корзину"
                param={{ _id: good._id, count: 1 }}
            />
            <CCardButtonDel
                children="Удалить из корзины"
                param={{ _id: good._id }}
            />
        </>
    );
}
const CGoodCard = connect((state) => ({
    good:
        state.promiseReducer.GoodFindOne &&
        state.promiseReducer.GoodFindOne.payload,
}))(GoodCard);

export default CGoodCard;
