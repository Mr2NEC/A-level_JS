import { gql } from './gql';
import actionPromise from './actionPromise';

export default function actionCategoryFind() {
    const name = 'categories';
    const query = `query {CategoryFind(query:"[{\\"parent\\":null}]"){_id,name}}`;

    return actionPromise(name, gql(query));
}
