const delay = (ms) => new Promise((ok) => setTimeout(() => ok(ms), ms));

let redCircle = document.querySelector("#red");
let yellowCircle = document.querySelector("#yellow");
let greenCircle = document.querySelector("#green");
let btn = document.querySelector("#btn");

function domEventPromise() {
    return new Promise(function (resolve, reject) {
        function removeListener(event) {
            btn.removeEventListener("click", removeListener);
            resolve(event);
        }
        btn.addEventListener("click", removeListener);
        awaitButton();
    }).then((e) => console.log(e));
}

async function trafficLight() {
    while (true) {
        greenCircle.style = "background: green;";
        await Promise.race([domEventPromise(), delay(7 * 1000)]);
        btn.disabled = true;
        greenCircle.style = "background: white;";
        yellowCircle.style = "background: yellow;";
        await delay(1 * 1000);
        yellowCircle.style = "background: white;";
        redCircle.style = "background: red;";
        await delay(7 * 1000);
        redCircle.style = "background: white;";
    }
}
trafficLight();

let redCircle2 = document.querySelector("#red2");
let greenCircle2 = document.querySelector("#green2");

async function trafficLight2() {
    while (true) {
        redCircle2.style = "background: red;";
        await Promise.race([domEventPromise(), delay(7 * 1000)]);
        await delay(1000);
        redCircle2.style = "background: white;";
        greenCircle2.style = "background: green;";
        await delay(7 * 1000);
        greenCircle2.style = "background: white;";
    }
}
trafficLight2();

async function awaitButton() {
    await delay(3 * 1000);
    btn.disabled = false;
}
