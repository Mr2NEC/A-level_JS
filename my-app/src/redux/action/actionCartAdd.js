import { CART_ADD } from '../type';

export default function actionCartAdd(_id, count) {
    let storage = JSON.parse(localStorage.cart);

    const i = storage.findIndex((n) => n._id === _id);

    i !== -1
        ? (storage[i].count = storage[i].count + count)
        : storage.push({ _id: _id, count, count });

    localStorage.cart = JSON.stringify(storage);

    return { type: CART_ADD, _id: _id, count: count };
}
