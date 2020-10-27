async function jsonPost(url, data) {
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    });

    if (response.status == 200) {
        let json = await response.json();
        return json;
    }
}

function* async() {
    let { data, nexMessageId } = yield jsonPost(
        'http://students.a-level.com.ua:10012',
        {
            func: 'getMessages',
        }
    );
    console.log(data);
}

let iter = async();
let tmp1 = iter.next();
tmp1.value.then((res) => iter.next(res));
