let timer;
let isRunning = false;
let elapsedTime = 0;
let lapNumber = 1;

const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function updateDisplay() {
    const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(elapsedTime % 1000).padStart(3, '0').substring(0, 2);

    timeDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startTimer() {
    timer = setInterval(() => {
        elapsedTime += 100;
        updateDisplay();
    }, 100);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
    lapList.innerHTML = '';
    lapNumber = 1;
}

function recordLap() {
    const lapTime = document.createElement('li');
    const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(elapsedTime % 1000).padStart(3, '0').substring(0, 2);

    lapTime.textContent = `Lap ${lapNumber}: ${hours}:${minutes}:${seconds}.${milliseconds}`;
    lapList.appendChild(lapTime);
    lapNumber++;
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
        startStopBtn.textContent = 'Start';
    } else {
        startTimer();
        startStopBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    resetTimer();
    startStopBtn.textContent = 'Start';
    isRunning = false;
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        recordLap();
    }
});
