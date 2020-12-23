import React, { useState } from 'react';
import { connect } from 'react-redux';
import CardButton from './CardButton';
import actionCartAdd from '../redux/action/actionCartAdd';
import actionCartDelete from '../redux/action/actionCartDelete';

const defaultGood = {
    _id: '5dc4a8665df9d670df48cc78',
    name: 'Xiaomi Mi TV UHD 4S 43" International Edition',
    createdAt: '1573169254000',
    description:
        'Диагональ экрана: 43"; Тип телевизора: LED; Разрешение экрана: 4K (3840x2160); Smart TV: Есть; Wi-Fi: Есть; USB 2.0: 2 шт;',
    price: 500,
};

const CCardButtonAdd = connect(null, { onClick: actionCartAdd })(CardButton);
const CCardButtonDel = connect(null, { onClick: actionCartDelete })(CardButton);

function GoodCard({ good = defaultGood }) {
    let buttonObj = {
        flag: JSON.parse(localStorage.cart).includes({ ...good }),
        buttonAdd: (
            <CCardButtonAdd children="Добавить в корзину" param={{ ...good }} />
        ),
        buttonDel: (
            <CCardButtonDel children="Добавить в корзину" param={{ ...good }} />
        ),
    };

    const [btn, setBtn] = useState();
    return (
        <>
            <ul>
                <li>{good.name}</li>
                <li>{good.description}</li>
                <li>{good.price}</li>
            </ul>
        </>
    );
}
const CGoodCard = connect((state) => ({
    good:
        state.promiseReducer.GoodFindOne &&
        state.promiseReducer.GoodFindOne.payload,
}))(GoodCard);

export default CGoodCard;
