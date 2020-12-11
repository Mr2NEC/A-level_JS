import React from 'react';
import { connect } from 'react-redux';

const defaultGood = {
    _id: '5dc4a8665df9d670df48cc78',
    name: 'Xiaomi Mi TV UHD 4S 43" International Edition',
    createdAt: '1573169254000',
    description:
        'Диагональ экрана: 43"; Тип телевизора: LED; Разрешение экрана: 4K (3840x2160); Smart TV: Есть; Wi-Fi: Есть; USB 2.0: 2 шт;',
    price: 500,
};

function GoodCard({ good = defaultGood }) {
    return (
        <ul>
            <li>{good.name}</li>
            <li>{good.description}</li>
            <li>{good.price}</li>
        </ul>
    );
}

const CGoodCard = connect((state) => ({
    good:
        state.promiseReducer.GoodFindOne &&
        state.promiseReducer.GoodFindOne.payload,
}))(GoodCard);

export default CGoodCard;
