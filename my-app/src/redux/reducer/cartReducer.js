import { CART_ADD, CART_DELETE, CART_SET, CART_CLEAR } from '../type';

export default function cartReducer(state = {}, { type, _id, count }) {
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
