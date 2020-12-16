import { CART_ADD } from '../type';

export default function actionCartAdd(_id, count) {
    return { type: CART_ADD, _id: _id, count: count };
}
