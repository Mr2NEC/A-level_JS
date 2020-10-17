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

let myMessageId = 0;

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
btn.addEventListener("click", postMessage);
function postMessage() {
    jsonPost("http://students.a-level.com.ua:10012", {
        func: "addMessage",
        nick: input1Elem.value,
        message: input2Elem.value,
    }).then(() => getMessage());
}

function getMessage() {
    jsonPost("http://students.a-level.com.ua:10012", {
        func: "getMessages",
        messageId: myMessageId,
    }).then((data) => {
        for (let id in data.data) {
            cteateMessages(data.data[id]);
        }
        myMessageId = data.nextMessageId;
    });
}

setInterval(getMessage, 5 * 1000);

function cteateMessages(objElem) {
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
