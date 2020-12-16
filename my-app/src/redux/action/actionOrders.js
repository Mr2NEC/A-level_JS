import { gql } from './gql';
import actionPromise from './actionPromise';

export default function actionOrders() {
    const name = 'Orders';
    const query = `query OrderFind($allQery:String){OrderFind(query:$allQery){_id total orderGoods{total count good{name, price, _id}}}}`;
    const variables = { allQery: JSON.stringify([{}]) };

    return actionPromise(
        name,
        gql(query, variables).then((data) => {
            localStorage.setItem('Order', JSON.stringify(data));
            return data;
        })
    );
}
