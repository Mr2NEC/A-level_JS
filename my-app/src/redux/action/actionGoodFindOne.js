import { gql } from './gql';
import actionPromise from './actionPromise';

export default function actionGoodFindOne(_id) {
    const name = 'GoodFindOne';
    const query = `query good($good:String){GoodFindOne(query:$good){_id, name, createdAt, description, price}}`;
    const variables = { good: JSON.stringify([{ _id }]) };

    return actionPromise(name, gql(query, variables));
}
