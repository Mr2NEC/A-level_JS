import { CART_DELETE } from '../type';

export default function actionCartDelete(_id) {
    return { type: CART_DELETE, _id: _id };
}
