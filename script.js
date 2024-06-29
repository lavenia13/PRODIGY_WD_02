let timer;
let startTime;
let elapsedTime = 0;
let laps = [];

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');

function formatTime(milliseconds) {
    let date = new Date(milliseconds);
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let ms = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${ms}`;
}

function updateTime() {
    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startPause() {
    if (!timer) {
        startPauseButton.textContent = 'Pause';
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
    } else {
        startPauseButton.textContent = 'Start';
        clearInterval(timer);
        timer = null;
    }
}

function reset() {
    clearInterval(timer);
    timer = null;
    startPauseButton.textContent = 'Start';
    elapsedTime = 0;
    display.textContent = formatTime(elapsedTime);
    laps = [];
    lapsList.innerHTML = '';
}

function lap() {
    if (timer) {
        laps.push(elapsedTime);
        let lapTime = laps[laps.length - 1];
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapItem);
    }
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
