const delay = (ms) => new Promise((ok) => setTimeout(() => ok(ms), ms));

function trafficLightTask() {
    let redCircle = document.querySelector('#red');
    let yellowCircle = document.querySelector('#yellow');
    let greenCircle = document.querySelector('#green');
    let btn = document.querySelector('#btn');

    function domEventPromise() {
        return new Promise(function (resolve, reject) {
            function removeListener(event) {
                btn.removeEventListener('click', removeListener);
                resolve(event);
            }
            btn.addEventListener('click', removeListener);
            awaitButton();
        });
    }

    async function trafficLightForCars() {
        while (true) {
            greenCircle.style = 'background: green;';
            await Promise.race([domEventPromise(), delay(7 * 1000)]);
            btn.disabled = true;
            greenCircle.style = 'background: white;';
            yellowCircle.style = 'background: yellow;';
            await delay(1 * 1000);
            yellowCircle.style = 'background: white;';
            redCircle.style = 'background: red;';
            await delay(7 * 1000);
            redCircle.style = 'background: white;';
        }
    }
    trafficLightForCars();

    let redCircle2 = document.querySelector('#red2');
    let greenCircle2 = document.querySelector('#green2');

    async function trafficLightForPeople() {
        while (true) {
            redCircle2.style = 'background: red;';
            await Promise.race([domEventPromise(), delay(7 * 1000)]);
            await delay(1000);
            redCircle2.style = 'background: white;';
            greenCircle2.style = 'background: green;';
            await delay(7 * 1000);
            greenCircle2.style = 'background: white;';
        }
    }
    trafficLightForPeople();

    async function awaitButton() {
        await delay(3 * 1000);
        btn.disabled = false;
    }
}

trafficLightTask();

function speedTestTask() {
    async function speedtest(getPromise, count, parallel = 1) {
        let duration = 0;

        async function testPromise() {
            let time = performance.now();
            let arrPromise = [];
            for (let i = 0; i < parallel; i++) {
                arrPromise.push(getPromise());
            }
            let data = await Promise.all(arrPromise);
            console.log(data);
            time = performance.now() - time;
            return time;
        }

        for (let i = 0; i < count; i++) {
            duration += await testPromise();
            console.log(duration);
        }

        return {
            duration: duration,
            querySpeed: 1 / (duration / count),
            queryDuration: duration / count,
            parallelSpeed: duration / count / parallel / 10000,
            parallelDuration: 10000 / (duration / count / parallel),
        };
    }
    speedtest(
        () => fetch('http://swapi.dev/api/people/1').then((res) => res.json()),
        10,
        5
    ).then((result) => console.log(result));
}

speedTestTask();
