import { gql } from './gql';
import actionPromise from './actionPromise';

export default function actionCategoryFindOne(_id) {
    const name = 'CategoryFindOne';
    const query = `query CategoryOne($query:String){CategoryFindOne(query:$query){_id,name,goods{_id,name}}}`;
    const variables = { query: JSON.stringify([{ _id }]) };

    return actionPromise(name, gql(query, variables));
}
