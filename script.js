let timerInterval;
let elapsedTime = 0;
let startTime = 0;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    document.getElementById('start').disabled = true;
    document.getElementById('pause').disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    document.getElementById('start').disabled = false;
    document.getElementById('pause').disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = "00:00:00.00";
    laps.innerHTML = "";
    document.getElementById('start').disabled = false;
    document.getElementById('pause').disabled = true;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    let time = new Date(elapsedTime);
    display.textContent =
        `${String(time.getUTCHours()).padStart(2, '0')}:` +
        `${String(time.getUTCMinutes()).padStart(2, '0')}:` +
        `${String(time.getUTCSeconds()).padStart(2, '0')}.` +
        `${String(time.getUTCMilliseconds()).padStart(3, '0').slice(0, 2)}`;
}

function recordLap() {
    let lapTime = document.createElement('li');
    lapTime.textContent = display.textContent;
    laps.appendChild(lapTime);
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

// Initially disable the pause button
document.getElementById('pause').disabled = true;
