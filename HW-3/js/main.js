function jsonPost(url, data) {
    return new Promise((resolve, reject) => {
        var x = new XMLHttpRequest();
        x.onerror = () => reject(new Error("jsonPost failed"));
        //x.setRequestHeader('Content-Type', 'application/json');
        x.open("POST", url, true);
        x.send(JSON.stringify(data));

        x.onreadystatechange = () => {
            if (x.readyState == XMLHttpRequest.DONE && x.status == 200) {
                resolve(JSON.parse(x.responseText));
            } else if (x.status != 200) {
                reject(new Error("status is not 200"));
            }
        };
    });
}

function* async1() {
    let { data, nextMessageId } = yield jsonPost(
        "http://students.a-level.com.ua:10012",
        {
            func: "getMessages",
        }
    );
    console.log(data);
    console.log(nextMessageId);
}

let iter = async1();
iter.next()
    .value.then((res) => iter.next(res))
    .catch((e) => console.log(e));

function* genCreator() {
    const response = yield jsonPost("http://students.a-level.com.ua:10012", {
        func: "getMessages",
    });
    console.log(response.data);
    console.log(response.nextMessageId);
}

async2 = () => {
    const generator = genCreator();

    function next(value) {
        const nextResult = generator.next(value);
        if (nextResult.done) return nextResult.value;
        nextResult.value.then(next);
    }

    next();
};

async2();
