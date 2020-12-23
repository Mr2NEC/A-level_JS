import { CART_ADD, CART_DELETE, CART_SET, CART_CLEAR } from '../type';

export default function cartReducer(state = {}, { type, _id, count }) {
    if (!localStorage.cart) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    if (JSON.parse(localStorage.cart).length !== 0) {
        JSON.parse(localStorage.cart).forEach((element) => {
            let newElem = { [element._id]: element.count };
            state = { ...state, ...newElem };
            return state;
        });
    }

    switch (type) {
        case CART_ADD:
            if (state[_id] !== undefined) {
                state[_id]++;
                return state;
            }
            return {
                ...state,
                [_id]: 1,
            };

        case CART_DELETE:
            delete state[_id];
            return state;

        case CART_SET:
            if (state[_id] !== undefined) {
                for (let keyId in state) {
                    if (keyId === _id) {
                        state[keyId] = state[keyId] + count;
                    }
                }
                return state;
            }
            return {
                ...state,
                [_id]: count,
            };

        case CART_CLEAR:
            return {};
    }
    return state;
}
