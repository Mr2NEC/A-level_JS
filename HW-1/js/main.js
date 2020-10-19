let wrapperElem = document.querySelector("#wrapper");
let input1Elem = document.createElement("input");
input1Elem.type = "name";
input1Elem.style = "padding: 10px; margin: 10px;";
input1Elem.placeholder = "Name";
wrapperElem.appendChild(input1Elem);
let input2Elem = document.createElement("input");
input2Elem.type = "text";
input2Elem.style = "padding: 10px; margin: 10px;";
input2Elem.placeholder = "Some Massege";
wrapperElem.appendChild(input2Elem);
let btn = document.createElement("button");
btn.type = "submit";
btn.style = "padding: 10px; margin: 10px;";
btn.innerText = "Submit";
wrapperElem.appendChild(btn);
let divElem = document.createElement("div");
divElem.style = "border:2px solid black;";
divElem.id = "divBodyChat";
wrapperElem.appendChild(divElem);

const URL = "http://students.a-level.com.ua:10012";
let myMessageId = 0;
const delay = (ms) => new Promise((ok) => setTimeout(() => ok(ms), ms));

function jsonPost(url, data) {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }

        return response.json().then((error) => {
            let e = new Error("Error");
            e.data = error;
            throw e;
        });
    });
}

async function getMessages() {
    jsonPost(URL, {
        func: "getMessages",
        messageId: myMessageId,
    })
        .then((data) => {
            for (let id in data.data) {
                createMessages(data.data[id]);
            }
            myMessageId = data.nextMessageId;
        })
        .catch((e) => console.log(e));
}

function createMessages(objElem) {
    let divMessage = document.createElement("div");
    divMessage.style =
        "border: 1px solid black; padding: 10px; background: #00FFFF; display: flex; align-items: center; flex-direction: column;";
    divMessage.innerHTML = `<div style = 'color: red;'>Nick: ${
        objElem.nick
    }</div><div style = 'color: green;'>Message: ${
        objElem.message
    }</div><div style = 'color: black;'>Timestamp: ${timeConverter(
        objElem.timestamp
    )}</div>`;
    let firstElem = divElem.firstChild;
    divElem.insertBefore(divMessage, firstElem);
}

function timeConverter(timestamp) {
    var a = new Date(timestamp);
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
        date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
}

async function checkLoop() {
    let endlessCycle = false;
    while (!endlessCycle) {
        await delay(5000);
        getMessages();
    }
}

async function sendMessage(nick, message) {
    jsonPost(URL, {
        func: "addMessage",
        nick: nick,
        message: message,
    }).catch((e) => console.log(e.message));
}

async function sendAndCheck() {
    await sendMessage(input1Elem.value, input2Elem.value);
    getMessages();
}

btn.addEventListener("click", sendAndCheck);
getMessages();
checkLoop();