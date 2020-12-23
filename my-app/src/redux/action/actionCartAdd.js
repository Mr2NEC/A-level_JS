import { CART_ADD } from '../type';

export default function actionCartAdd(param) {
    let storage = JSON.parse(localStorage.cart);

    const i = storage.findIndex((n) => n._id === param._id);

    i !== -1
        ? (storage[i].count = storage[i].count + param.count)
        : storage.push({ ...param });

    localStorage.cart = JSON.stringify(storage);

    return { type: CART_ADD, _id: param._id, count: param.count };
}
