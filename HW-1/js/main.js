let wrapperElem = document.querySelector('#wrapper');
let input1Elem = document.createElement('input');
input1Elem.type = 'name';
input1Elem.style = 'padding: 10px; margin: 10px;';
input1Elem.placeholder = 'Enter your Nickname';
wrapperElem.appendChild(input1Elem);
let input2Elem = document.createElement('input');
input2Elem.type = 'text';
input2Elem.style = 'padding: 10px; margin: 10px;';
input2Elem.placeholder = 'Enter your Massege';
wrapperElem.appendChild(input2Elem);
let btn = document.createElement('button');
btn.type = 'submit';
btn.style = 'padding: 10px; margin: 10px;';
btn.innerText = 'Submit';
wrapperElem.appendChild(btn);
let divElem = document.createElement('div');
divElem.style = 'border:2px solid black;';
divElem.id = 'divBodyChat';
wrapperElem.appendChild(divElem);

const URL = 'http://students.a-level.com.ua:10012';
let myMessageId = 0;
const delay = (ms) => new Promise((ok) => setTimeout(() => ok(ms), ms));

async function jsonPost(url, data) {
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    });

    if (response.status == 200) {
        let json = await response.json();
        return json;
    }

    throw new Error(response.status);
}

async function getMessages() {
    try {
        let data = await jsonPost(URL, {
            func: 'getMessages',
            messageId: myMessageId,
        });
        for (let id in data.data) {
            displayMessage(data.data[id]);
        }
        myMessageId = data.nextMessageId;
    } catch (err) {
        alert(err);
    }
}

function displayMessage(objElem) {
    let divMessage = document.createElement('div');
    divMessage.style =
        'border: 1px solid black; padding: 10px; background: #00FFFF; display: flex; align-items: center; flex-direction: column;';
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
    let a = new Date(timestamp);
    let months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time =
        date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
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
    try {
        jsonPost(URL, {
            func: 'addMessage',
            nick: nick,
            message: message,
        });
    } catch (err) {
        alert(err);
    }
}

async function sendAndCheck() {
    await sendMessage(input1Elem.value, input2Elem.value);
    await getMessages();
}

btn.addEventListener('click', sendAndCheck);
getMessages();
checkLoop();
