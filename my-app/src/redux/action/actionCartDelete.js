import { CART_DELETE } from '../type';

export default function actionCartDelete(_id) {
    let storage = JSON.parse(localStorage.cart);
    const i = storage.findIndex((n) => n._id === _id);
    if (i !== -1) {
        storage.splice(i, 1);
    }
    localStorage.cart = JSON.stringify(storage);
    return { type: CART_DELETE, _id: _id };
}
